import React from 'react';

import LimitedTextarea from 'library/TextArea/LimitedTextarea';

const GeneralTopic = ({
  formInstance,
  generalTopicComplete
}) => {
  const [purpose, setPurpose] = React.useState("");

  const handleSubmit = () => {
    const formValues = formInstance.getValues();

    if (formValues.purpose.length > 0) {
      generalTopicComplete();
    }
  }

  return (
    <React.Fragment>
      <div className="mt-4 mb-2">
        <LimitedTextarea
          formInstance={formInstance}
          fieldName="purpose"
          placeholder="State a broad topic..."
          errorMessage="Please enter a workshop purpose of 140 characters or less"
          onUserInput={(userInput) => setPurpose(userInput)}
        />

        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-secondary px-2 py-1"
          disabled={purpose.length === 0}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default GeneralTopic;
