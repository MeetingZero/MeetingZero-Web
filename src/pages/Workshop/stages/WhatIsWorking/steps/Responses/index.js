import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import ProTip from 'library/ProTip';
import TextArea from 'library/TextArea';

import * as whatIsWorkingActions from 'app/workshop/stages/what_is_working/actions';

const MAX_ITEMS = 3;

const Responses = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Get my responses on page load for editing and validation purposes
  React.useEffect(() => {
    dispatch(whatIsWorkingActions.getMyResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const onSubmit = (formData, index) => {
    if (myWhatIsWorkingResponses[index] === undefined) {
      dispatch(
        whatIsWorkingActions
        .saveResponse(
          params.workshop_token,
          formData[`response_text_${index}`]
        )
      )
    } else {
      dispatch(
        whatIsWorkingActions
        .updateResponse(
          params.workshop_token,
          myWhatIsWorkingResponses[index].id,
          formData[`response_text_${index}`]
        )
      )
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
    myWhatIsWorkingResponses.forEach((response, index) => {
      if (response) {
        setValue(`response_text_${index}`, response.response_text);
      }
    });
  }, [myWhatIsWorkingResponses, setValue]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Start with what's working</h1>

      <h5 className="mb-4">Up to three short statements of what's going well.</h5>

      {[...new Array(MAX_ITEMS)].map((response, index) => {
        return (
          <form key={index} onSubmit={handleSubmit((formData) => onSubmit(formData, index))}>
            <TextArea
              control={control}
              register={register({ maxLength: 140 })}
              name={`response_text_${index}`}
              placeholder="Keep it positive"
              className={cn(charCountExceeded ? 'bg-scary' : '', activeIndex === index ? 'mb-1' : 'mb-4')}
              onFocus={() => setActiveIndex(index)}
              watchAll={true}
            />

            {errors.response_text ?
              <div className="small text-danger">
                Please enter a response of 140 characters or less
              </div>
            : null}

            {activeIndex === index ?
              <React.Fragment>
                <div className="text-right">
                  <CharacterCounter
                    inputString={""}
                    maxChars={140}
                    onExceed={handleExceed}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    text={myWhatIsWorkingResponses[index] ? "Update" : "Submit"}
                    className={"btn btn-primary px-5 rounded mb-4"}
                    disabled={false}
                    loading={isLoading}
                  />
                </div>
              </React.Fragment>
            : null}
          </form>
        );
      })}

      <ProTip
        mainText={
          <React.Fragment>
            <p>
              Keep your statements related to the workshop purpose.
            </p>

            <p>
              Be objective and avoid mentioning individuals.
            </p>
          </React.Fragment>
        }
        calloutText="The tenents in the building love our facility's cleanliness."
      />
    </React.Fragment>
  );
}

export default Responses;
