import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from '../../containers/WorkshopApp';
import Responses from './steps/Responses';
import Vote from './steps/Vote';

const Problems = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "PROBLEMS_REPONSES") {
    return (
      <WorkshopApp>
        <Responses />
      </WorkshopApp>
    );
  } else if (currentStepKey === "PROBLEMS_VOTE") {
    return (
      <WorkshopApp>
        <Vote />
      </WorkshopApp>
    );
  }
}

export default Problems;
