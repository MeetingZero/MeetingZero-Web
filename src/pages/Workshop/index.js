import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import WhatIsWorking from './stages/WhatIsWorking';
import LoadingScreen from '../../library/LoadingScreen';
import * as workshopActions from '../../app/workshop/actions';

const Workshop = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getDirector(params.workshop_token)
    );

    dispatch(
      workshopActions
      .getCurrentStep(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  if (!currentWorkshopStep) {
    return (
      <LoadingScreen />
    );
  }

  const currentWorkshopStageKey = currentWorkshopStep.workshop_stage.key;

  if (currentWorkshopStageKey === "WHATS_WORKING") {
    return (
      <WhatIsWorking />
    );
  }
}

export default Workshop;