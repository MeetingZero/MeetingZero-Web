import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';

const RaciModal = ({ modalOpen, toggleRaciModal, userId, task }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (assignmentText) => {
    dispatch(
      experimentsActions
      .saveTaskAssignment(params.workshop_token, task.id, userId, assignmentText)
    )
    .then(() => {
      return toggleRaciModal(false);
    });
  }

  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  const [currentWorkshopMember, setCurrentWorkshopMember] = React.useState(null);

  React.useEffect(() => {
    for (let i = 0; i < workshopMembers.length; i++) {
      if (workshopMembers[i].user_id === userId) {
        return setCurrentWorkshopMember(workshopMembers[i]);
      }
    }
  }, [workshopMembers, userId]);

  return (
    <CSSTransition
      in={modalOpen}
      timeout={500}
      classNames="raci-modal-wrapper"
      unmountOnExit
    >
      <div className="raci-modal-wrapper">
        <i
          onClick={(event) => {
            event.stopPropagation();
            toggleRaciModal(false);
          }}
          className="fa fa-close raci-modal-close text-muted"
        />

        {currentWorkshopMember && task ?
          <div className="font-weight-bold mb-3">
            Select {currentWorkshopMember.user.first_name}'s assignment for "{task.response_text}".
          </div>
        : null}

        <div className="row">
          <div className="col-3">
            <button
              onClick={() => handleSubmit("Responsible")}
              className="btn btn-block responsible-button"
            >
              Responsible
            </button>
          </div>

          <div className="col-3">
            <button
              onClick={() => handleSubmit("Accountable")}
              className="btn btn-block accountable-button"
            >
              Accountable
            </button>
          </div>

          <div className="col-3">
            <button
              onClick={() => handleSubmit("Consulted")}
              className="btn btn-block consulted-button"
            >
              Consulted
            </button>
          </div>

          <div className="col-3">
            <button
              onClick={() => handleSubmit("Informed")}
              className="btn btn-block informed-button"
            >
              Informed
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default RaciModal;
