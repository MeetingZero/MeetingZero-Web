import React from 'react';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const OneProblem = ({
  formInstance
}) => {
  const [problem, setProblem] = React.useState("");

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more information
        </div>

        <LimitedTextarea
          onUserInput={(userInput) => setProblem(userInput)}
          formInstance={formInstance}
          fieldName="problem"
          placeholder="What's this problem?"
          errorMessage="Please enter a problem of 140 characters or less"
        />
      </div>

      <div className="text-right">
        <button
          className="btn btn-primary px-2 py-1"
          disabled={!problem.length}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default OneProblem;