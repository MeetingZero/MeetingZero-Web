import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';

import * as whatIsWorkingActions from 'app/workshop/stages/what_is_working/actions';

const Responses = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [viewIndex, setViewIndex] = React.useState(0);
  const [responseText, setResponseText] = React.useState("");

  // Get my responses on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(whatIsWorkingActions.getMyResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (myWhatIsWorkingResponses[viewIndex] === null) {
      dispatch(
        whatIsWorkingActions
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
        whatIsWorkingActions
        .updateResponse(
          params.workshop_token,
          myWhatIsWorkingResponses[viewIndex].id,
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
    return state.Loading.indexOf("SAVE_WHAT_IS_WORKING_RESPONSE") >= 0;
  });

  const myWhatIsWorkingResponses = useSelector((state) => {
    return state.WhatIsWorking.myWhatIsWorkingResponses;
  });

  React.useEffect(() => {
    setViewIndex(myWhatIsWorkingResponses.length - 1);
  }, [myWhatIsWorkingResponses]);

  React.useEffect(() => {
    if (myWhatIsWorkingResponses[viewIndex]) {
      setResponseText(myWhatIsWorkingResponses[viewIndex].response_text);
    } else {
      setResponseText("");
    }
  }, [viewIndex, myWhatIsWorkingResponses]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Start with what's working</h1>

      <h5 className="mb-4">Up to three short statements of what's going well.</h5>

      {myWhatIsWorkingResponses.length > 1 ?
        <div className="mb-2">
          <Button
            onClick={() => setViewIndex(viewIndex - 1)}
            text="Previous"
            className="btn btn-link mr-3"
            disabled={myWhatIsWorkingResponses[viewIndex - 1] === undefined}
          />

          <Button
            onClick={() => setViewIndex(viewIndex + 1)}
            text="Forward"
            className="btn btn-link"
            disabled={myWhatIsWorkingResponses[viewIndex + 1] === undefined}
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
          placeholder="Keep it positive"
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
            text={myWhatIsWorkingResponses[viewIndex] === null ? "Submit" : "Update"}
            className="btn btn-primary px-5 rounded"
            disabled={responseText.length === 0}
            loading={isLoading}
          />
        </div>
      </form>
    </React.Fragment>
  );
}

export default Responses;