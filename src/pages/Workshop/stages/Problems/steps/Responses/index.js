import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';
import TextArea from 'library/TextArea';

import * as problemsActions from 'app/workshop/stages/problems/actions';

const Responses = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [viewIndex, setViewIndex] = React.useState(0);
  const [responseText, setResponseText] = React.useState("");

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_PROBLEMS_RESPONSE") >= 0;
  });

  const myProblemsResponses = useSelector((state) => {
    return state.Problems.myProblemsResponses;
  });

  // Get my responses on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(problemsActions.getMyResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData) => {
    if (myProblemsResponses[viewIndex] === null) {
      dispatch(
        problemsActions
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
        problemsActions
        .updateResponse(
          params.workshop_token,
          myProblemsResponses[viewIndex].id,
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

  React.useEffect(() => {
    setViewIndex(myProblemsResponses.length - 1);
  }, [myProblemsResponses]);

  React.useEffect(() => {
    if (myProblemsResponses[viewIndex]) {
      setResponseText(myProblemsResponses[viewIndex].response_text);
      setValue("response_text", myProblemsResponses[viewIndex].response_text);
    } else {
      setResponseText("");
      setValue("response_text", "");
    }
  }, [viewIndex, myProblemsResponses, setValue]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Problems</h1>

      <h5 className="mb-4">One or two short statements of applicable annoyances, challenges, or inefficiencies.</h5>

      {myProblemsResponses.length > 1 ?
        <div className="mb-2">
          <Button
            onClick={() => setViewIndex(viewIndex - 1)}
            text="Previous"
            className="btn btn-link mr-3"
            disabled={myProblemsResponses[viewIndex - 1] === undefined}
          />

          <Button
            onClick={() => setViewIndex(viewIndex + 1)}
            text="Forward"
            className="btn btn-link"
            disabled={myProblemsResponses[viewIndex + 1] === undefined}
          />
        </div>
      : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          control={control}
          register={register({ required: true, maxLength: 140 })}
          name="response_text"
          placeholder="What's preventing the business and/or users from achieving their goals?"
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
            text={myProblemsResponses[viewIndex] === null ? "Submit" : "Update"}
            className="btn btn-primary px-5 rounded"
            disabled={responseText.length === 0}
            loading={isLoading}
          />
        </div>
      </form>

      <ProTip
        mainText="Focus on your customer and business needs."
        calloutText="The elevators in the building are too slow."
      />
    </React.Fragment>
  );
}

export default Responses;
