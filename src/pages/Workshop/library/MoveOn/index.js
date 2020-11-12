import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OnlineMembers from './OnlineMembers';
import ReadyMembers from './ReadyMembers';
import Button from 'library/Button';

import * as workshopActions from 'app/workshop/actions';
import workshopSlice from 'app/workshop/slice';

import "./MoveOn.scss";

const MoveOn = ({ workshopToken, workshopDirectorId, onCompleteStep }) => {
  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [readyUp, setReadyUp] = React.useState(false);
  const [proceeding, setProceeding] = React.useState(false);
  const [confirmationDismissed, setConfirmationDismissed] = React.useState(false);

  const isLoadingSave = useSelector((state) => {
    return state.Loading.indexOf("SAVING_READY_MEMBER") >= 0;
  });

  const isLoadingGoBack = useSelector((state) => {
    return state.Loading.indexOf("DELETING_READY_MEMBER") >= 0;
  });

  const readyWorkshopMembers = useSelector((state) => {
    return state.Workshop.readyWorkshopMembers;
  });

  const currentUser = useSelector((state) => {
    return state.User.currentUser;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const handleReadyUp = () => {
    dispatch(workshopActions.saveReadyMember(workshopToken, workshopDirectorId))
    .then(() => {
      setReadyUp(true);
      setShowConfirmation(false);
    });
  }

  const handleGoBack = () => {
    dispatch(workshopActions.deleteReadyMember(workshopToken, workshopDirectorId))
    .then(() => {
      setReadyUp(false);
    });
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationDismissed(true);
  }

  React.useEffect(() => {
    dispatch(workshopActions.getReadyMembers(workshopToken, workshopDirectorId));
  }, [dispatch, workshopToken, workshopDirectorId]);

  // If user is ready when page loads for the current stage step, trigger readyup
  React.useEffect(() => {
    readyWorkshopMembers.forEach((rwm) => {
      if (rwm.ready_workshop_member && rwm.ready_workshop_member.workshop_director_id === workshopDirectorId && rwm.user_id === currentUser.id) {
        setReadyUp(true);
        setShowConfirmation(false);
      }
    });
  }, [readyWorkshopMembers, workshopDirectorId, currentUser.id]);

  // If any member ready's-up, trigger the confirmation message
  React.useEffect(() => {
    const rwm = readyWorkshopMembers.filter(m => m.ready_workshop_member);

    if (rwm.length && !readyUp && !confirmationDismissed) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  }, [readyWorkshopMembers, readyUp, confirmationDismissed]);

  React.useEffect(() => {
    if (readyWorkshopMembers.length === 0) {
      return;
    }

    for (let i = 0; i < readyWorkshopMembers.length; i++) {
      const rwm = readyWorkshopMembers[i];

      if (!rwm.ready_workshop_member || rwm.ready_workshop_member.workshop_director_id !== workshopDirectorId) {
        return;
      }
    }

    setProceeding(true);

    // Don't go any further if not the host
    if (!workshop.is_host) {
      return;
    }

    window.setTimeout(() => {
      if (onCompleteStep) {
        setReadyUp(false);
        setShowConfirmation(false);
        setProceeding(false);

        // Clear ready members
        dispatch(workshopSlice.actions.setReadyWorkshopMembers([]));

        return onCompleteStep();
      } else {
        const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

        dispatch(
          workshopActions
          .completeWorkshopStep(
            workshopToken,
            workshopStageStepId
          )
        )
        .then(() => {
          // Clear ready members
          dispatch(workshopSlice.actions.setReadyWorkshopMembers([]));
        });
      }
    }, 1000);
  }, [readyWorkshopMembers, workshop.is_host, dispatch, workshopToken, onCompleteStep, currentWorkshopStep.workshop_stage_step_id, workshopDirectorId]);

  // When the workshop director ID changes, hide all move on steps
  React.useEffect(() => {
    setReadyUp(false);
    setShowConfirmation(false);
    setProceeding(false);
  }, [workshopDirectorId]);

  return (
    <React.Fragment>
      {readyUp ?
        <div className="modal-backdrop fade show" />
      : null}

      <div className="move-on-container">
        {readyUp ?
          <div className="move-on-dialog border border-black shadow p-3 mb-2">
            {proceeding ?
              <div className="h5 mb-2">Proceeding to the next step...</div>
            :
              <div className="h5 mb-2">Waiting on the group</div>
            }

            <ReadyMembers className="mb-2" />

            {!proceeding ?
              <React.Fragment>
                <div className="h5 mb-2">Forgot you had something else to fill out?</div>

                <div>
                  <Button
                    onClick={handleGoBack}
                    className="btn btn-primary btn-square rounded px-4"
                    text="Go back"
                    loading={isLoadingGoBack}
                  />
                </div>
              </React.Fragment>
            : null}
          </div>
        : null}

        {showConfirmation ?
          <div className="move-on-dialog border border-black shadow px-3 pb-3 mb-2">
            <div className="text-right">
              <button
                onClick={handleCloseConfirmation}
                className="btn small btn-link text-danger btn-square"
              >
                Close
              </button>
            </div>

            <div className="h4 mb-2">Are you ready to move on?</div>

            <div className="mb-2">
              If you are finished before the time is up, you can click this and notify the team you are ready to move on.
            </div>

            <div>
              <Button
                onClick={handleReadyUp}
                className="btn btn-primary btn-square rounded px-4"
                text="I'm ready"
                loading={isLoadingSave}
              />
            </div>
          </div>
        : null}

        {!showConfirmation && !readyUp ?
          <button
            onClick={() => setShowConfirmation(true)}
            className="btn btn-primary px-4 btn-block mb-2"
          >
            Move On
          </button>
        : null}

        {!readyUp ?
          <OnlineMembers
            className="justify-content-end"
          />
        : null}
      </div>
    </React.Fragment>
  );
}

export default MoveOn;