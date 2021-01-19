import React from 'react';

import { HUMAN_COUNTING } from 'constants/englishNumbers';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const ExistingProblems = ({
  formInstance,
  setPssConfigComplete
}) => {
  const [problems, setProblems] = React.useState([null, null, null]);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const handleChange = (userInput, index) => {
    if (userInput === problems[index]) {
      return;
    }

    const clonedProblems = [...problems];

    clonedProblems[index] = userInput;

    setProblems(clonedProblems);
  }

  React.useEffect(() => {
    for (let i = 0; i < problems.length; i++) {
      if (problems[i] && problems[i].length) {
        return setSubmitDisabled(false);
      }
    }
  }, [problems]);

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more information
        </div>

        {problems.map((problem, index) => {
          return (
            <div key={index} className="mb-2">
              <div className="create-workshop-removable-input">
                <i
                  className="fa fa-trash remove-toggle"
                />

                <LimitedTextarea
                  onUserInput={(userInput) => handleChange(userInput, index)}
                  formInstance={formInstance}
                  fieldName={`existing_problems[${index}]`}
                  fieldRequired={index === 0}
                  placeholder={`${HUMAN_COUNTING[index + 1]} problem`}
                  errorMessage="Please enter a problem of 140 characters or less"
                />
              </div>
            </div>
          );
        })}
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
          onClick={() => setPssConfigComplete(true)}
          type="button"
          className="btn btn-primary px-2 py-1 ml-2"
          disabled={submitDisabled}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default ExistingProblems;
