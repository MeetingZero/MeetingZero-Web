import React from 'react';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const ExistingProblems = ({
  formInstance
}) => {
  const [problems, setProblems] = React.useState([null]);

  const handleChange = (userInput, index) => {
    if (userInput === problems[index]) {
      return;
    }

    const clonedProblems = [...problems];

    clonedProblems[index] = userInput;

    setProblems(clonedProblems);
  }

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more information
        </div>

        {problems.map((problem, index) => {
          return (
            <div key={index} className="mb-2">
              <LimitedTextarea
                onUserInput={(userInput) => handleChange(userInput, index)}
                formInstance={formInstance}
                fieldName={`problem_${index}`}
                placeholder="What's this problem?"
                errorMessage="Please enter a problem of 140 characters or less"
              />
            </div>
          );
        })}
      </div>

      <div className="text-right">
        <button
          onClick={() => setProblems([...problems, null])}
          type="button"
          className="btn btn-secondary btn-rounded px-2 py-1"
        >
          Add More
          <i className="fa fa-plus ml-1" />
        </button>

        <button
          className="btn btn-primary px-2 py-1 ml-2"
          // disabled={!problem.length}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default ExistingProblems;
