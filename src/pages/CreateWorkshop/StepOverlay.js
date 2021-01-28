import React from 'react';

const StepOverlay = ({
  show,
  text
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="create-workshop-step-overlay py-4">
      {text}
    </div>
  );
}

export default StepOverlay;