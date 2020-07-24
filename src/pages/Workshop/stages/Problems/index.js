import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Responses from './steps/Responses';
import Vote from './steps/Vote';
import ReviewVotes from './steps/ReviewVotes';

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
  } else if (currentStepKey === "PROBLEMS_REVIEW_VOTES") {
    return (
      <WorkshopApp>
        <ReviewVotes />
      </WorkshopApp>
    );
  }
}

export default Problems;
