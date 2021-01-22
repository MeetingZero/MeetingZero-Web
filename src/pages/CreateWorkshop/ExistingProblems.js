import React from 'react';

import { HUMAN_COUNTING } from 'constants/englishNumbers';

import { DynamicTextarea } from 'library/TextArea/index';

const ExistingProblems = ({
  formInstance,
  setPssConfigComplete
}) => {
  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <div className="mb-1">
          Give us a little more information
        </div>

        <DynamicTextarea
          formInstance={formInstance}
          name="existing_problems"
          startingNumInputs={3}
          removable={true}
          placeholder={(index) => {
            return `${HUMAN_COUNTING[index + 1]} problem`;
          }}
          className="mb-3"
          onSubmit={() => setPssConfigComplete(true)}
        />
      </div>
    </React.Fragment>
  );
}

export default ExistingProblems;
