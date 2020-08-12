import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Hypothesis from './steps/Hypothesis';

const Experiment = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "EXPERIMENT_HYPOTHESIS") {
    return (
      <WorkshopApp>
        <Hypothesis />
      </WorkshopApp>
    );
  }
}

export default Experiment;
