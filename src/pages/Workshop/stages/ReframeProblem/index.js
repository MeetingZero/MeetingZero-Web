import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Response from './steps/Response';
import Vote from './steps/Vote';

const ReframeProblem = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "REFRAME_PROBLEM_RESPONSE") {
    return (
      <WorkshopApp>
        <Response />
      </WorkshopApp>
    );
  } else if (currentStepKey === "REFRAME_PROBLEM_VOTE") {
    return (
      <WorkshopApp>
        <Vote />
      </WorkshopApp>
    );
  }
}

export default ReframeProblem;