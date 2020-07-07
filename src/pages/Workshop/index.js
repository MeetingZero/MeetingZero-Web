import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cableConsumer } from '../../config/cableConsumer';
import * as workshopActions from '../../app/workshop/actions';

import WhatIsWorking from './stages/WhatIsWorking';

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
        console.log(data);
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
      <WhatIsWorking />
    );
  }
}

export default Workshop;