import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Responses from './steps/Responses';
import Vote from './steps/Vote';
import ReviewVotes from './steps/ReviewVotes';

import * as workshopActions from 'app/workshop/actions';
import * as votingActions from 'app/voting/actions';

const Problems = () => {
  const dispatch = useDispatch();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const onTimerExpired = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        votingActions
        .calculateVotingResults(workshop.workshop_token, "ProblemResponse")
      )
      .then(() => {
        dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
      });
    }
  }

  if (currentStepKey === "PROBLEMS_REPONSES") {
    return (
      <WorkshopApp>
        <Responses />
      </WorkshopApp>
    );
  } else if (currentStepKey === "PROBLEMS_VOTE") {
    return (
      <WorkshopApp onTimerExpired={onTimerExpired}>
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
