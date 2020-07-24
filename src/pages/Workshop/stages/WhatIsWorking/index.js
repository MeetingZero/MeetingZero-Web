import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Responses from './steps/Responses';
import Review from './steps/Review';

const WhatIsWorking = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "WHATS_WORKING_RESPONSES") {
    return (
      <WorkshopApp>
        <Responses />
      </WorkshopApp>
    );
  } else if (currentStepKey === "WHATS_WORKING_REVIEW") {
    return (
      <WorkshopApp>
        <Review />
      </WorkshopApp>
    );
  }
}

export default WhatIsWorking;