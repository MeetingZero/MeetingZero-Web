import React from 'react';
import cn from 'classnames';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const GeneralTopic = ({
  formInstance
}) => {
  const [purpose, setPurpose] = React.useState("");

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <LimitedTextarea
          onUserInput={(userInput) => setPurpose(userInput)}
          formInstance={formInstance}
          fieldName="purpose"
          placeholder="State a broad topic..."
          errorMessage="Please enter a workshop purpose of 140 characters or less"
        />
      </div>

      <div className="text-right">
        <button
          className={cn("btn btn-primary px-2 py-1", purpose.length ? null : "disabled")}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default GeneralTopic;
