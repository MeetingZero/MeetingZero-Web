import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';
import TextArea from 'library/TextArea';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';
import * as workshopActions from 'app/workshop/actions';
import * as votingActions from 'app/voting/actions';
import { cableConsumer } from 'config/cableConsumer';

const Hypothesis = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const [weBelieveTextCharCountExceeded, setWeBelieveTextCharCountExceeded] = React.useState(false);
  const [willResultInTextCharCountExceeded, setWillResultInTextCharCountExceeded] = React.useState(false);
  const [succeededWhenTextCharCountExceeded, setSucceededWhenTextCharCountExceeded] = React.useState(false);
  const [showConfirmSubmission, setShowConfirmSubmission] = React.useState(false);
  const [workshopRelayChannel, setWorkshopRelayChannel] = React.useState(null);
  const [showJumbotron, setShowJumbotron] = React.useState(true);

  const [weBelieveText, setWeBelieveText] = React.useState("");
  const [willResultInText, setWillResultInText] = React.useState("");
  const [succeededWhenText, setSucceededWhenText] = React.useState("");

  // Get hypothesis on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(experimentsActions.getHypothesis(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  // Get winning solution
  React.useEffect(() => {
    dispatch(
      votingActions
      .calculateVotingResults(params.workshop_token, "SolutionResponse")
    );
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    dispatch(
      experimentsActions
      .saveHypothesis(
        params.workshop_token,
        formData.we_believe_text,
        formData.will_result_in_text,
        formData.succeeded_when_text
      )
    )
    .then(() => {
      setShowConfirmSubmission(true);
    });
  }

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const completeWorkshopStep = () => {
    const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

    dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_EXPERIMENT_HYPOTHESIS") >= 0;
  });

  const hypothesis = useSelector((state) => {
    return state.Experiments.hypothesis;
  });

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["SolutionResponse"];
  });

  React.useEffect(() => {
    if (!hypothesis) return;

    if (hypothesis.we_believe_text) {
      setWeBelieveText(hypothesis.we_believe_text);
      setValue("we_believe_text", hypothesis.we_believe_text);
    }

    if (hypothesis.will_result_in_text) {
      setWillResultInText(hypothesis.will_result_in_text);
      setValue("will_result_in_text", hypothesis.will_result_in_text);
    }

    if (hypothesis.succeeded_when_text) {
      setSucceededWhenText(hypothesis.succeeded_when_text);
      setValue("succeeded_when_text", hypothesis.succeeded_when_text);
    }
  }, [hypothesis, setValue]);

  React.useEffect(() => {
    const workshopRelayChannelInstance = cableConsumer(params.workshop_token)
    .subscriptions
    .create({
      channel: 'WorkshopRelayChannel',
      workshop_token: params.workshop_token
    }, {
      received: (data) => {
        if (workshop.is_host) { return; }

        if (data.weBelieveText) {
          setWeBelieveText(data.weBelieveText);
        }

        if (data.willResultInText) {
          setWillResultInText(data.willResultInText);
        }

        if (data.succeededWhenText) {
          setSucceededWhenText(data.succeededWhenText);
        }
      },
      connected: () => {
        console.log("WORKSHOP RELAY CONNECTED!");

        setWorkshopRelayChannel(workshopRelayChannelInstance);
      }
    });
  }, [params.workshop_token, workshop.is_host]);

  React.useEffect(() => {
    if (workshopRelayChannel) {
      workshopRelayChannel.send({
        weBelieveText,
        willResultInText,
        succeededWhenText
      });
    }
  }, [succeededWhenText, weBelieveText, willResultInText, workshopRelayChannel]);

  return (
    <React.Fragment>
      {showConfirmSubmission === true ?
        <ConfirmSubmissionModal
          setShowConfirmSubmission={setShowConfirmSubmission}
          completeWorkshopStep={completeWorkshopStep}
        />
      : null}

      <h1 className="h2 mt-5">Experiments</h1>

      <h5 className="mb-4">Create a hypothesis that you can test in less than 4 weeks (ideally 1-2 weeks).</h5>

      {starVotingResults && starVotingResults.runoff_winner ?
        <blockquote className="mb-4">
          <div className="text-muted small">
            Winning Solution:
          </div>

          <div>
            {starVotingResults.runoff_winner.resource.response_text}
          </div>
        </blockquote>
      : null}

      {workshop.is_host ?
        <React.Fragment>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              control={control}
              register={register({ required: true, maxLength: 140 })}
              name="we_believe_text"
              placeholder="We believe <this capability>..."
              className={cn("mb-1", weBelieveTextCharCountExceeded ? 'bg-scary' : '')}
              onUserInput={(userInput) => setWeBelieveText(userInput)}
            />

            {errors.we_believe_text ?
              <div className="small text-danger">
                Please enter a response of 140 characters or less
              </div>
            : null}

            <div className="text-right mb-2">
              <CharacterCounter
                inputString={weBelieveText}
                maxChars={140}
                onExceed={(isExceeded) => setWeBelieveTextCharCountExceeded(isExceeded)}
              />
            </div>

            <TextArea
              control={control}
              register={register({ required: true, maxLength: 140 })}
              name="will_result_in_text"
              placeholder="Will result in <this outcome>."
              className={cn("mb-1", willResultInTextCharCountExceeded ? 'bg-scary' : '')}
              onUserInput={(userInput) => setWillResultInText(userInput)}
            />

            {errors.will_result_in_text ?
              <div className="small text-danger">
                Please enter a response of 140 characters or less
              </div>
            : null}

            <div className="text-right mb-2">
              <CharacterCounter
                inputString={willResultInText}
                maxChars={140}
                onExceed={(isExceeded) => setWillResultInTextCharCountExceeded(isExceeded)}
              />
            </div>

            <TextArea
              control={control}
              register={register({ required: true, maxLength: 140 })}
              name="succeeded_when_text"
              placeholder="We will know we have succeeded when <we see this measurable signal>..."
              className={cn("mb-1", succeededWhenTextCharCountExceeded ? 'bg-scary' : '')}
              onUserInput={(userInput) => setSucceededWhenText(userInput)}
            />

            {errors.succeeded_when_text ?
              <div className="small text-danger">
                Please enter a response of 140 characters or less
              </div>
            : null}

            <div className="text-right mb-2">
              <CharacterCounter
                inputString={succeededWhenText}
                maxChars={140}
                onExceed={(isExceeded) => setSucceededWhenTextCharCountExceeded(isExceeded)}
              />
            </div>

            <div>
              <Button
                type="submit"
                text={hypothesis === null ? "Submit" : "Update"}
                className="btn btn-primary px-5 rounded"
                disabled={weBelieveText.length === 0 || willResultInText.length === 0 || succeededWhenText.length === 0}
                loading={isLoading}
              />
            </div>
          </form>

          <ProTip
            mainText={
              <React.Fragment>
                <p>
                  Be mindful of:
                </p>

                <p>
                  <strong>Feasibility risk</strong> - whether the team can build what we need within the time allotted for the experiment.
                </p>

                <p>
                  If applicable to your MVP, be mindful of:
                </p>

                <p>
                  <strong>Usability risk</strong> - whether users can figure out how to use it as intended.
                </p>
              </React.Fragment>
            }
            calloutText={
              <React.Fragment>
                <div>
                  <strong>We believe</strong> &lt;putting up 8 mirrors&gt; <strong>will result in</strong> &lt;residents being less annoyed by the wait&gt;. <strong>We will know we have succeeded when</strong> &lt;we get 50% fewer complaints&gt;.
                </div>
              </React.Fragment>
            }
          />
        </React.Fragment>
      :
        <React.Fragment>
          {weBelieveText.length ?
            <React.Fragment>
              <h5 className="mb-1">We believe...</h5>

              <div className="border border-info rounded p-1 mb-5">
                {weBelieveText}
              </div>
            </React.Fragment>
          : null}

          {willResultInText.length ?
            <React.Fragment>
              <h5 className="mb-1">Will result in...</h5>
              
              <div className="border border-info rounded p-1 mb-5">
                {willResultInText}
              </div>
            </React.Fragment>
          : null}

          {succeededWhenText.length ?
            <React.Fragment>
              <h5 className="mb-1">We will know we have succeeded when...</h5>

              <div className="border border-info rounded p-1 mb-5">
                {succeededWhenText}
              </div>
            </React.Fragment>
          : null}

          {showJumbotron ?
            <div className="jumbotron text-center bg-info border border-primary pt-0">
              <button
                onClick={() => setShowJumbotron(false)}
                className="btn btn-block btn-link text-right p-1"
              >
                Close
              </button>
              <h4>The group will break silence and discuss out loud while the host writes it out.</h4>
            </div>
          : null}
        </React.Fragment>
      }
    </React.Fragment>
  );
}

const ConfirmSubmissionModal = ({
  setShowConfirmSubmission,
  completeWorkshopStep
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
                completeWorkshopStep();
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

export default Hypothesis;
