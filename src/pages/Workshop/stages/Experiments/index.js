import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Hypothesis from './steps/Hypothesis';
import Owners from './steps/Owners';

const Experiments = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "EXPERIMENTS_HYPOTHESIS") {
    return (
      <WorkshopApp>
        <Hypothesis />
      </WorkshopApp>
    );
  } else if (currentStepKey === "EXPERIMENTS_OWNERS") {
    return (
      <WorkshopApp>
        <Owners />
      </WorkshopApp>
    );
  }
}

export default Experiments;
