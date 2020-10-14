import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { cableConsumer } from 'config/cableConsumer';
import workshopSlice from 'app/workshop/slice';
import experimentsSlice from 'app/workshop/stages/experiments/slice';
import * as workshopActions from 'app/workshop/actions';

import LoadingScreen from 'library/LoadingScreen';

const WhatIsWorking = React.lazy(() => {
  return import('./stages/WhatIsWorking');
});

const Problems = React.lazy(() => {
  return import('./stages/Problems');
});

const ReframeProblem = React.lazy(() => {
  return import('./stages/ReframeProblem');
});

const OpportunityQuestion = React.lazy(() => {
  return import('./stages/OpportunityQuestion');
});

const Solutions = React.lazy(() => {
  return import('./stages/Solutions');
});

const Experiments = React.lazy(() => {
  return import('./stages/Experiments');
});

const WorkshopDone = React.lazy(() => {
  return import('./stages/WorkshopDone');
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
        } else if (data.experiment_tasks) {
          dispatch(
            experimentsSlice
            .actions
            .setExperimentTasks(data.experiment_tasks)
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

  const workshopDirector = useSelector((state) => {
    return state.Workshop.workshopDirector;
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

  if (!currentWorkshopStep || !workshop || !workshopDirector) {
    return (
      <LoadingScreen />
    );
  }

  const currentWorkshopStageKey = currentWorkshopStep.workshop_stage.key;

  if (currentWorkshopStep.completed === true) {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <WorkshopDone />
      </React.Suspense>
    );
  }

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
  } else if (currentWorkshopStageKey === "REFRAME_PROBLEM") {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <ReframeProblem />
      </React.Suspense>
    );
  } else if (currentWorkshopStageKey === "OPPORTUNITY_QUESTION") {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <OpportunityQuestion />
      </React.Suspense>
    );
  } else if (currentWorkshopStageKey === "SOLUTIONS") {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <Solutions />
      </React.Suspense>
    );
  } else if (currentWorkshopStageKey === "EXPERIMENTS") {
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <Experiments />
      </React.Suspense>
    );
  }
}

export default Workshop;
