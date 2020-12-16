import React from 'react';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const GeneralTopic = ({
  formInstance
}) => {
  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <LimitedTextarea
          formInstance={formInstance}
          fieldName="purpose"
          placeholder="State a broad topic..."
          errorMessage="Please enter a workshop purpose of 140 characters or less"
        />
      </div>
    </React.Fragment>
  );
}

export default GeneralTopic;
