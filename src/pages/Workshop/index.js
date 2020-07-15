import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cableConsumer } from '../../config/cableConsumer';
import workshopSlice from '../../app/workshop/slice';
import * as workshopActions from '../../app/workshop/actions';

import LoadingScreen from '../../library/LoadingScreen';

const WhatIsWorking = React.lazy(() => {
  return import('./stages/WhatIsWorking');
});

const Problems = React.lazy(() => {
  return import('./stages/Problems');
});

const Workshop = () => {
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    cableConsumer(params.workshop_token)
    .subscriptions
    .create({
      channel: 'WorkshopChannel',
      workshop_token: params.workshop_token
    }, {
      received: (data) => {
        if (data.current_workshop_director) {
          dispatch(
            workshopSlice
            .actions
            .setCurrentWorkshopStep(data.current_workshop_director)
          );
        }
      },
      connected: () => {
        console.log("WORKSHOP CABLE CONNECTED!");
      }
    });
  }, [params.workshop_token, dispatch]);

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getDirector(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getCurrentStep(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getWorkshop(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  if (!currentWorkshopStep || !workshop) {
    return null;
  }

  const currentWorkshopStageKey = currentWorkshopStep.workshop_stage.key;

  if (currentWorkshopStageKey === "WHATS_WORKING") {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <WhatIsWorking />
      </React.Suspense>
    );
  } else if (currentWorkshopStageKey === "PROBLEMS") {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <Problems />
      </React.Suspense>
    );
  }
}

export default Workshop;
