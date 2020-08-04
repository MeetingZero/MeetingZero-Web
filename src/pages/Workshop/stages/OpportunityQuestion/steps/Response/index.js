import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';

import * as opportunityQuestionActions from 'app/workshop/stages/opportunity_question/actions';
import * as votingActions from 'app/voting/actions';

const Response = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [responseText, setResponseText] = React.useState("");

  React.useEffect(() => {
    dispatch(votingActions.calculateVotingResults(params.workshop_token, "ReframeProblem"));
  }, [dispatch, params.workshop_token]);

  // Get my response on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(opportunityQuestionActions.getMyResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (myOpportunityQuestionResponse === null) {
      dispatch(
        opportunityQuestionActions
        .saveResponse(
          params.workshop_token,
          formData.response_text
        )
      )
      .then(() => {
        setResponseText("");
      });
    } else {
      dispatch(
        opportunityQuestionActions
        .updateResponse(
          params.workshop_token,
          myOpportunityQuestionResponse.id,
          formData.response_text
        )
      )
      .then(() => {
        setResponseText("");
      });
    }
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_OPPORTUNITY_QUESTION_RESPONSE") >= 0;
  });

  const myOpportunityQuestionResponse = useSelector((state) => {
    return state.OpportunityQuestion.myOpportunityQuestionResponse;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["ReframeProblem"];
  });

  React.useEffect(() => {
    if (myOpportunityQuestionResponse) {
      setResponseText(myOpportunityQuestionResponse.response_text);
    } else {
      setResponseText("");
    }
  }, [myOpportunityQuestionResponse]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Opportunity Question</h1>

      <h5 className="mb-4">As the host, you will propose the first opportunity question then the group will discuss your response.</h5>

      {starVotingResults ?
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
            <textarea
              onChange={(event) => setResponseText(event.target.value)}
              value={responseText}
              ref={register({ required: true, maxLength: 140 })}
              name="response_text"
              className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)}
              placeholder="Start by typing How Might We..."
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
                text={myOpportunityQuestionResponse === null ? "Submit" : "Update"}
                className="btn btn-primary px-5 rounded"
                disabled={responseText.length === 0}
                loading={isLoading}
              />
            </div>
          </form>

          <ProTip
            tipText="Tip Text Here"
            exampleText="This is an example"
          />
        </React.Fragment>
      :
        <div className="jumbotron text-center bg-info border border-primary">
          <h4>The host will write out the opportunity question, and then the group will discuss the host's proposed response.</h4>
        </div>
      }
    </React.Fragment>
  );
}

export default Response;
