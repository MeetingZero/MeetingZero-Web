import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';
import RingTimer from 'library/RingTimer';
import TextArea from 'library/TextArea';

import * as opportunityQuestionActions from 'app/workshop/stages/opportunity_question/actions';
import * as votingActions from 'app/voting/actions';
import * as workshopActions from 'app/workshop/actions';
import { cableConsumer } from 'config/cableConsumer';

const Response = ({ showBathroomBreak }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [responseText, setResponseText] = React.useState("");
  const [showConfirmSubmission, setShowConfirmSubmission] = React.useState(false);
  const [shouldShowBathroomBreak, setShouldShowBathroomBreak] = React.useState(false);
  const [workshopRelayChannel, setWorkshopRelayChannel] = React.useState(null);
  const [hostResponseText, setHostResponseText] = React.useState(null);
  const [showJumbotron, setShowJumbotron] = React.useState(true);

  React.useEffect(() => {
    if (showBathroomBreak === true) {
      return setShouldShowBathroomBreak(true);
    }
  }, [showBathroomBreak]);

  React.useEffect(() => {
    dispatch(votingActions.calculateVotingResults(params.workshop_token, "ReframeProblemResponse"));
  }, [dispatch, params.workshop_token]);

  // Get response on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(opportunityQuestionActions.getResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (opportunityQuestionResponse === null) {
      dispatch(
        opportunityQuestionActions
        .saveResponse(
          params.workshop_token,
          formData.response_text
        )
      )
      .then(() => {
        setResponseText("");
        setShowConfirmSubmission(true);
      });
    } else {
      dispatch(
        opportunityQuestionActions
        .updateResponse(
          params.workshop_token,
          opportunityQuestionResponse.id,
          formData.response_text
        )
      )
      .then(() => {
        setResponseText("");
        setShowConfirmSubmission(true);
      });
    }
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_OPPORTUNITY_QUESTION_RESPONSE") >= 0;
  });

  const opportunityQuestionResponse = useSelector((state) => {
    return state.OpportunityQuestion.opportunityQuestionResponse;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["ReframeProblemResponse"];
  });

  React.useEffect(() => {
    if (opportunityQuestionResponse) {
      setResponseText(opportunityQuestionResponse.response_text);
      setValue("response_text", opportunityQuestionResponse.response_text);
    } else {
      setResponseText("");
      setValue("response_text", "");
    }
  }, [opportunityQuestionResponse, setValue]);

  React.useEffect(() => {
    const workshopRelayChannelInstance = cableConsumer(params.workshop_token)
    .subscriptions
    .create({
      channel: 'WorkshopRelayChannel',
      workshop_token: params.workshop_token
    }, {
      received: (data) => {
        if (workshop.is_host) { return; }

        setHostResponseText(data.hostResponseText);
      },
      connected: () => {
        console.log("WORKSHOP RELAY CONNECTED!");

        setWorkshopRelayChannel(workshopRelayChannelInstance);
      }
    });

    return () => {
      setWorkshopRelayChannel(null);
      workshopRelayChannelInstance.unsubscribe();
    }
  }, [params.workshop_token, dispatch, workshop.is_host]);

  // When the response text changes, broadcast over the relay socket
  React.useEffect(() => {
    if (workshopRelayChannel) {
      workshopRelayChannel.send({ hostResponseText: responseText });
    }
  }, [responseText, workshopRelayChannel]);

  return (
    <React.Fragment>
      {shouldShowBathroomBreak === true ?
        <BathroomBreakModal />
      : null}

      {showConfirmSubmission === true ?
        <ConfirmSubmissionModal
          setShowConfirmSubmission={setShowConfirmSubmission}
          setShouldShowBathroomBreak={setShouldShowBathroomBreak}
        />
      : null}

      <h1 className="h2 mt-5">Opportunity Question</h1>

      <h5 className="mb-4">The host will propose the first opportunity question. The group will then discuss the response.</h5>

      {starVotingResults && starVotingResults.runoff_winner ?
        <blockquote className="mb-5">
          <div className="text-muted small">
            Winning Problem:
          </div>

          <div>
            {starVotingResults.runoff_winner.resource.response_text}
          </div>
        </blockquote>
      : null}

      {workshop.is_host ?
        <React.Fragment>
          <div className="mb-5">
            Rephrase the problem as a question starting with "How Might We..."
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              control={control}
              register={register({ required: true, maxLength: 140 })}
              name="response_text"
              placeholder="Start by typing How Might We..."
              className={cn("mb-1", charCountExceeded ? 'bg-scary' : '')}
              onUserInput={(userInput) => setResponseText(userInput)}
            />

            {errors.response_text ?
              <div className="small text-danger">
                Please enter a response of 140 characters or less
              </div>
            : null}

            <div className="text-right">
              <CharacterCounter
                inputString={responseText}
                maxChars={140}
                onExceed={handleExceed}
              />
            </div>

            <div>
              <Button
                type="submit"
                text="Submit"
                className="btn btn-primary px-5 rounded"
                disabled={responseText.length === 0}
                loading={isLoading}
              />
            </div>
          </form>

          <ProTip
            mainText="Focus on the problem and how to transfer it into a question."
            calloutText="How Might We make the wait feel less annoying?"
          />
        </React.Fragment>
      :
        <React.Fragment>
          {hostResponseText ?
            <div className="border border-info rounded p-1 mb-5">
                {hostResponseText}
            </div>
          : null}

          {showJumbotron ?
            <div className="jumbotron text-center bg-info border border-primary pt-0">
              <button
                onClick={() => setShowJumbotron(false)}
                className="btn btn-block btn-link text-right p-1"
              >
                Close
              </button>

              <h4>The host will write out the opportunity question, and then the group will discuss the host's proposed response.</h4>
            </div>
          : null}
        </React.Fragment>
      }
    </React.Fragment>
  );
}

const BathroomBreakModal = () => {
  const dispatch = useDispatch();

  const [breakAccepted, setBreakAccepted] = React.useState(false);

  const startBathroomBreak = () => {
    window
    .localStorage
    .setItem("breakStarted", moment().utc().toISOString());

    return setBreakAccepted(true);
  }

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const onTimerExpired = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));

      window.localStorage.removeItem("breakStarted");
    }
  }

  React.useEffect(() => {
    const breakStarted = window
    .localStorage
    .getItem("breakStarted");

    if (breakStarted) {
      return setBreakAccepted(true);
    }
  }, []);

  return (
    <div className="simple-modal-overlay">
      {breakAccepted === false ?
        <div className="simple-modal-wrapper">
          <h4 className="text-center mb-2">Do you want a bathroom break?</h4>

          <div className="row mb-2">
            <div className="col-6">
              <button onClick={onTimerExpired} className="btn btn-block btn-link">
                No
              </button>
            </div>

            <div className="col-6">
              <button onClick={startBathroomBreak} className="btn btn-block btn-warning btn-square">
                Yes
              </button>
            </div>
          </div>

          <div className="text-center small">
            No one will see if you press yes <span role="img" aria-label="Winky Emoji">😉</span>
          </div>
        </div>
      : null}

      {breakAccepted === true ?
        <div className="simple-modal-wrapper">
          <h4 className="text-center">Quick Bathroom Break</h4>

          <div className="small text-muted text-center mb-2">
            Grab a healthy snack and beverage.
          </div>

          <div className="text-center">
            <RingTimer
              radius={75}
              strokeWidth={4}
              startTimestamp={window.localStorage.getItem("breakStarted")}
              expireTimestamp={moment(window.localStorage.getItem("breakStarted")).utc().add(10, "minutes").toISOString()}
              onTimerExpired={onTimerExpired}
            />
          </div>
        </div>
      : null}
    </div>
  );
}

const ConfirmSubmissionModal = ({
  setShowConfirmSubmission,
  setShouldShowBathroomBreak
}) => {
  return (
    <div className="simple-modal-overlay">
      <div className="simple-modal-wrapper">
        <h4 className="text-center">Submit?</h4>

        <div className="small text-muted text-center mb-3">
          You won't be able to edit this
        </div>

        <div className="row mb-2">
          <div className="col-6">
            <button
              onClick={() => setShowConfirmSubmission(false)}
              className="btn btn-block btn-link"
            >
              No
            </button>
          </div>

          <div className="col-6">
            <button
              onClick={() => {
                setShowConfirmSubmission(false);
                setShouldShowBathroomBreak(true);
              }}
              className="btn btn-block btn-warning btn-square"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response;
