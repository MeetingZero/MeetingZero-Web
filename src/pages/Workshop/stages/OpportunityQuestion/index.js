import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Response from './steps/Response';

const OpportunityQuestion = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  if (currentStepKey === "OPPORTUNITY_QUESTION_RESPONSE") {
    return (
      <WorkshopApp>
        <Response />
      </WorkshopApp>
    );
  }
}

export default OpportunityQuestion;
