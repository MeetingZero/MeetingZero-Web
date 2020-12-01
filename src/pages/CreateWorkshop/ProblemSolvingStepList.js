import React from 'react';

const PROBLEM_SOLVING_STEP_LIST = [
  {
    key: "GENERAL_TOPIC",
    description: "I have a topic I want my team to explore"
  },
  {
    key: "EXISTING_PROBLEMS",
    description: "I have a few problems, but I don’t know which is the right one to solve"
  },
  {
    key: "ONE_EXISTING_PROBLEM",
    description: "I have a problem I want my team to solve"
  },
  {
    key: "EXISTING_SOLUTIONS",
    description: "I have a few solutions for a problem, but I don’t know which is the right one"
  },
  {
    key: "ONE_EXISTING_SOLUTION",
    description: "I want to create an experiment based on a solution I want to validate"
  }
];

const ProblemSolvingStepList = () => {
  return (
    <div className="mb-2">
      <div className="mb-2">
        First off, where are you in your problem-solving process?
      </div>

      {PROBLEM_SOLVING_STEP_LIST.map((pss, index) => {
        return (
          <div key={index} className="form-check mb-1">
            <input
              className="form-check-input"
              type="radio"
              name="problem_solving_step"
              id={`pss-${index}`}
              value={pss.key}
            />

            <label className="form-check-label ml-1" htmlFor={`pss-${index}`}>
              {pss.description}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default ProblemSolvingStepList;
