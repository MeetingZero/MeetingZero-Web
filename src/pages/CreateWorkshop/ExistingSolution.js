import React from 'react';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const ExistingSolution = ({
  formInstance,
  setPssConfigComplete
}) => {
  const [existingSolution, setExistingSolution] = React.useState("");

  const handleSolutionSubmit = () => {
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
        />

        <div className="mb-1">
          What's the solution you want to explore?
        </div>

        <LimitedTextarea
          formInstance={formInstance}
          fieldName={`existing_solutions[0].value`}
          placeholder="What's this solution?"
          errorMessage="Please enter a solution of 140 characters or less"
          onUserInput={(userInput) => setExistingSolution(userInput)}
        />

        <button
          onClick={handleSolutionSubmit}
          type="button"
          className="btn btn-secondary px-2 py-1"
          disabled={existingSolution.length === 0}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default ExistingSolution;
