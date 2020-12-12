import React from 'react';

import { HUMAN_COUNTING } from 'constants/englishNumbers';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const ExistingSolutions = ({
  formInstance
}) => {
  const [solutions, setSolutions] = React.useState([null, null, null]);

  const handleChange = (userInput, index) => {
    if (userInput === solutions[index]) {
      return;
    }

    const clonedSolutions = [...solutions];

    clonedSolutions[index] = userInput;

    setSolutions(clonedSolutions);
  }

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more information
        </div>

        {solutions.map((solution, index) => {
          return (
            <div key={index} className="mb-2">
              <LimitedTextarea
                onUserInput={(userInput) => handleChange(userInput, index)}
                formInstance={formInstance}
                fieldName={`solution_${index}`}
                fieldRequired={index === 0}
                placeholder={`${HUMAN_COUNTING[index + 1]} solution`}
                errorMessage="Please enter a solution of 140 characters or less"
              />
            </div>
          );
        })}
      </div>

      <div className="text-right">
        <button
          onClick={() => setSolutions([...solutions, null])}
          type="button"
          className="btn btn-secondary btn-rounded px-2 py-1"
        >
          Add More
          <i className="fa fa-plus ml-1" />
        </button>

        <button
          className="btn btn-primary px-2 py-1 ml-2"
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default ExistingSolutions;
