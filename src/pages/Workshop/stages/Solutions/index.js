import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Responses from './steps/Responses';
import ImpactEffort from './steps/ImpactEffort';
import Vote from './steps/Vote';
import ReviewVotes from './steps/ReviewVotes';

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
  } else if (currentStepKey === "SOLUTIONS_IMPACT_EFFORT") {
    return (
      <WorkshopApp>
        <ImpactEffort />
      </WorkshopApp>
    );
  } else if (currentStepKey === "SOLUTIONS_VOTE") {
    return (
      <WorkshopApp>
        <Vote />
      </WorkshopApp>
    );
  } else if (currentStepKey === "SOLUTIONS_REVIEW_VOTES") {
    return (
      <WorkshopApp>
        <ReviewVotes />
      </WorkshopApp>
    );
  }
}

export default Solutions;