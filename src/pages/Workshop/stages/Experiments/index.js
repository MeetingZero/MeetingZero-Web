import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Hypothesis from './steps/Hypothesis';
import Owners from './steps/Owners';

const Experiments = () => {
  const [showAddTimeModal, setShowAddTimeModal] = React.useState(false);

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const onTimerExpired = () => {
    if (workshop.is_host) {
      return setShowAddTimeModal(true);
    }
  }

  if (currentStepKey === "EXPERIMENTS_HYPOTHESIS") {
    return (
      <WorkshopApp>
        <Hypothesis />
      </WorkshopApp>
    );
  } else if (currentStepKey === "EXPERIMENTS_OWNERS") {
    return (
      <WorkshopApp onTimerExpired={onTimerExpired}>
        <Owners showAddTimeModal={showAddTimeModal} />
      </WorkshopApp>
    );
  }
}

export default Experiments;
