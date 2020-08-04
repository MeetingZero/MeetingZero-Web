import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';

import * as opportunityQuestionActions from 'app/workshop/stages/opportunity_question/actions';
import * as solutionsActions from 'app/workshop/stages/solutions/actions';

const Responses = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [viewIndex, setViewIndex] = React.useState(0);
  const [responseText, setResponseText] = React.useState("");

  React.useEffect(() => {
    dispatch(opportunityQuestionActions.getResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  // Get my responses on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(solutionsActions.getMyResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (mySolutionsResponses[viewIndex] === null) {
      dispatch(
        solutionsActions
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
        solutionsActions
        .updateResponse(
          params.workshop_token,
          mySolutionsResponses[viewIndex].id,
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
    return state.Loading.indexOf("SAVE_SOLUTIONS_RESPONSE") >= 0;
  });

  const opportunityQuestionResponse = useSelector((state) => {
    return state.OpportunityQuestion.opportunityQuestionResponse;
  });

  const mySolutionsResponses = useSelector((state) => {
    return state.Solutions.mySolutionsResponses;
  });

  React.useEffect(() => {
    setViewIndex(mySolutionsResponses.length - 1);
  }, [mySolutionsResponses]);

  React.useEffect(() => {
    if (mySolutionsResponses[viewIndex]) {
      setResponseText(mySolutionsResponses[viewIndex].response_text);
    } else {
      setResponseText("");
    }
  }, [viewIndex, mySolutionsResponses]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Solutions</h1>

      <h5 className="mb-4">Try to submit up to fifteen solutions.</h5>

      {opportunityQuestionResponse ?
        <blockquote className="mb-5">
          <div className="text-muted small">
            Winning Opportunity:
          </div>

          <div>
            {opportunityQuestionResponse.response_text}
          </div>
        </blockquote>
      : null}

      {mySolutionsResponses.length > 1 ?
        <div className="mb-2">
          <Button
            onClick={() => setViewIndex(viewIndex - 1)}
            text="Previous"
            className="btn btn-link mr-3"
            disabled={mySolutionsResponses[viewIndex - 1] === undefined}
          />

          <Button
            onClick={() => setViewIndex(viewIndex + 1)}
            text="Forward"
            className="btn btn-link"
            disabled={mySolutionsResponses[viewIndex + 1] === undefined}
          />
        </div>
      : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          onChange={(event) => setResponseText(event.target.value)}
          value={responseText}
          ref={register({ required: true, maxLength: 140 })}
          name="response_text"
          className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)}
          placeholder="Quantity over quality..."
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
            text={mySolutionsResponses[viewIndex] === null ? "Submit" : "Update"}
            className="btn btn-primary px-5 rounded"
            disabled={responseText.length === 0}
            loading={isLoading}
          />
        </div>
      </form>

      <ProTip
        mainText="What solutions (features/functionality) have the highest chance of creating the desired change in your user(s)’s behavior?"
        calloutText="Put up mirrors in elevator banks."
      />
    </React.Fragment>
  );
}

export default Responses;
