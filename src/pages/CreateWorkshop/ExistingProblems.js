import React from 'react';

import { HUMAN_COUNTING } from 'constants/englishNumbers';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';
import { DynamicTextarea } from 'library/TextArea/index';

const ExistingProblems = ({
  formInstance,
  setPssConfigComplete
}) => {
  const [problems, setProblems] = React.useState([null, null, null]);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const handleChange = () => {
    const existingProblems = formInstance
    .getValues()
    .existing_problems;

    if (existingProblems[0] && existingProblems[0].length) {
      return setSubmitDisabled(false);
    }

    console.log(existingProblems)
  }

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more information
        </div>

        <div className="create-workshop-removable-input">
          <i
            className="fa fa-trash remove-toggle"
          />

          <DynamicTextarea
            formInstance={formInstance}
            name="existing_problems"
            startingNumInputs={3}
          />
        </div>

        {/* {problems.map((problem, index) => {
          return (
            <div key={index} className="mb-2">
              <div className="create-workshop-removable-input">
                <i
                  onClick={() => setProblems(problems.filter((p, i) => i !== index))}
                  className="fa fa-trash remove-toggle"
                />

                <LimitedTextarea
                  onUserInput={handleChange}
                  formInstance={formInstance}
                  fieldName={`existing_problems[${index}]`}
                  fieldRequired={index === 0}
                  placeholder={`${HUMAN_COUNTING[index + 1]} problem`}
                  errorMessage="Please enter a problem of 140 characters or less"
                />
              </div>
            </div>
          );
        })} */}
      </div>

      <div className="text-right mb-4">
        <button
          onClick={() => setProblems([...problems, null])}
          type="button"
          className="btn btn-secondary btn-rounded px-2 py-1"
          disabled={problems.length === 27}
        >
          Add More
          <i className="fa fa-plus ml-1" />
        </button>

        <button
          onClick={() => {
            console.log(formInstance.getValues())
            setPssConfigComplete(true)
          }}
          type="button"
          className="btn btn-primary px-2 py-1 ml-2"
          // disabled={submitDisabled}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default ExistingProblems;
