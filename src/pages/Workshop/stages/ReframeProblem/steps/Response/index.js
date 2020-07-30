import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';

import * as reframeProblemActions from 'app/workshop/stages/reframe_problem/actions';
import * as votingActions from 'app/voting/actions';

const Response = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [responseText, setResponseText] = React.useState("");

  React.useEffect(() => {
    dispatch(votingActions.calculateVotingResults(params.workshop_token, "ProblemResponse"));
  }, [dispatch, params.workshop_token]);

  // Get my response on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(reframeProblemActions.getMyResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (myReframeProblemResponse === null) {
      dispatch(
        reframeProblemActions
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
        reframeProblemActions
        .updateResponse(
          params.workshop_token,
          myReframeProblemResponse.id,
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
    return state.Loading.indexOf("SAVE_REFRAME_PROBLEM_RESPONSE") >= 0;
  });

  const myReframeProblemResponse = useSelector((state) => {
    return state.ReframeProblem.myReframeProblemResponse;
  });

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["ProblemResponse"];
  });

  React.useEffect(() => {
    if (myReframeProblemResponse) {
      setResponseText(myReframeProblemResponse.response_text);
    } else {
      setResponseText("");
    }
  }, [myReframeProblemResponse]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5 mb-5">Reframe Problem</h1>

      {starVotingResults ?
        <blockquote className="mb-5">
          <div className="text-muted small">
            Problem to Reframe:
          </div>

          <div>
            {starVotingResults.runoff_winner.resource.response_text}
          </div>
        </blockquote>
      : null}

      <div className="mb-5">
        Ask yourself and answer the question, "so what?" as it relates to the problem (you get one response)
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          onChange={(event) => setResponseText(event.target.value)}
          value={responseText}
          ref={register({ required: true, maxLength: 140 })}
          name="response_text"
          className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)}
          placeholder="What is one other way to understand this problem?"
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
            text={myReframeProblemResponse === null ? "Submit" : "Update"}
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
  );
}

export default Response;
