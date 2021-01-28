import React from 'react';

const Preparation = ({
  formInstance,
  setPreparationComplete
}) => {
  const [preparationInstructions, setPreparationInstructions] = React.useState("");

  return (
    <React.Fragment>
      <input
        onChange={(event) => setPreparationInstructions(event.target.value)}
        ref={formInstance.register()}
        name="preparation_instructions"
        type="text"
        className="form-control line-input mb-2"
        placeholder="How can your teammates prepare? - Optional"
      />

      <div className="text-right">
        <button
          onClick={() => setPreparationComplete(true)}
          type="button"
          className="btn btn-secondary btn-rounded px-2 py-1"
        >
          Skip
        </button>

        <button
          onClick={() => setPreparationComplete(true)}
          type="button"
          className="btn btn-primary btn-rounded px-2 py-1 ml-2"
          disabled={preparationInstructions.length === 0}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

export default Preparation;
