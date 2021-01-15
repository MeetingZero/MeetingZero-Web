import React from 'react';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const ExistingProblem = ({
  formInstance,
  setPssConfigComplete
}) => {
  const [existingProblem, setExistingProblem] = React.useState("");

  const handleSubmit = () => {
    const formValues = formInstance.getValues();

    if (formValues.existing_problems[0].length > 0) {
      setPssConfigComplete(true);
    }
  }

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more info
        </div>

        <LimitedTextarea
          formInstance={formInstance}
          fieldName={`existing_problems[0]`}
          placeholder="What's this problem?"
          errorMessage="Please enter a problem of 140 characters or less"
          onUserInput={(userInput) => setExistingProblem(userInput)}
        />

        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-secondary px-2 py-1"
          disabled={existingProblem.length === 0}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default ExistingProblem;
