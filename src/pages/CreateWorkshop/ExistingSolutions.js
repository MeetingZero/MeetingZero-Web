import React from 'react';

import { HUMAN_COUNTING } from 'constants/englishNumbers';

import { DynamicTextarea } from 'library/TextArea/index';
import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const ExistingSolutions = ({
  formInstance,
  setPssConfigComplete
}) => {
  const [existingProblem, setExistingProblem] = React.useState("");

  const handleSubmit = () => {
    const formValues = formInstance.getValues();

    if (formValues.existing_solutions[0].value.length > 0) {
      setPssConfigComplete(true);
    }
  }

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          What's the problem you want to solve?
        </div>

        <LimitedTextarea
          formInstance={formInstance}
          fieldName={`existing_problems[0].value`}
          placeholder="What's this problem?"
          errorMessage="Please enter a problem of 140 characters or less"
          onUserInput={(userInput) => setExistingProblem(userInput)}
        />

        <div className="mb-4">
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-secondary px-2 py-1"
            disabled={existingProblem.length === 0}
          >
            Submit
          </button>
        </div>

        <div className="mb-1">
          What are your solutions you want to explore?
        </div>

        <DynamicTextarea
          formInstance={formInstance}
          name="existing_solutions"
          startingNumInputs={3}
          removable={true}
          placeholder={(index) => {
            return `${HUMAN_COUNTING[index + 1]} solution`;
          }}
          className="mb-3"
          onSubmit={() => setPssConfigComplete(true)}
        />
      </div>
    </React.Fragment>
  );
}

export default ExistingSolutions;
