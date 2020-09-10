import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Response from './steps/Response';

const OpportunityQuestion = () => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  const [showBathroomBreak, setShowBathroomBreak] = React.useState(false);

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const onTimerExpired = () => {
    if (workshop.is_host) {
      return setShowBathroomBreak(true);
    }
  }

  if (currentStepKey === "OPPORTUNITY_QUESTION_RESPONSE") {
    return (
      <WorkshopApp onTimerExpired={onTimerExpired}>
        <Response showBathroomBreak={showBathroomBreak} />
      </WorkshopApp>
    );
  }
}

export default OpportunityQuestion;
