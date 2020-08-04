import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Responses from './steps/Responses';

const Solutions = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "SOLUTIONS_RESPONSES") {
    return (
      <WorkshopApp>
        <Responses />
      </WorkshopApp>
    );
  }
}

export default Solutions;