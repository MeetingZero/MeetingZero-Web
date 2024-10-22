import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Hypothesis from './steps/Hypothesis';
import Owners from './steps/Owners';

import * as workshopActions from 'app/workshop/actions';

const Experiments = () => {
  const dispatch = useDispatch();

  const [showAddTimeModal, setShowAddTimeModal] = React.useState(false);

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const onTimerExpiredOverride = () => {
    const timeAdded = window.localStorage.getItem("timeAdded");

    if (workshop.is_host && !timeAdded) {
      return setShowAddTimeModal(true);
    } else if (workshop.is_host && timeAdded) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));

      window.localStorage.removeItem("timeAdded");
    }
  }

  if (currentStepKey === "EXPERIMENTS_HYPOTHESIS") {
    return (
      <WorkshopApp allowMoveOn={false}>
        <Hypothesis />
      </WorkshopApp>
    );
  } else if (currentStepKey === "EXPERIMENTS_OWNERS") {
    return (
      <WorkshopApp onTimerExpiredOverride={onTimerExpiredOverride}>
        <Owners showAddTimeModal={showAddTimeModal} />
      </WorkshopApp>
    );
  }
}

export default Experiments;
