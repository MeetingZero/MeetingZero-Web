import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Response from './steps/Response';
import Vote from './steps/Vote';
import ReviewVotes from './steps/ReviewVotes';

import * as workshopActions from 'app/workshop/actions';
import * as reframeProblemActions from 'app/workshop/stages/reframe_problem/actions';
import * as votingActions from 'app/voting/actions';

const ReframeProblem = () => {
  const dispatch = useDispatch();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const onVoteCompleteStep = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        votingActions
        .calculateVotingResults(workshop.workshop_token, "ReframeProblemResponse")
      )
      .then(() => {
        dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
      });
    }
  }

  const onResponseCompleteStep = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;
      
      dispatch(
        reframeProblemActions
        .getAllResponses(workshop.workshop_token, true)
      )
      .then(() => {
        dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
      });
    }
  }

  if (currentStepKey === "REFRAME_PROBLEM_RESPONSE") {
    return (
      <WorkshopApp onCompleteStep={onResponseCompleteStep}>
        <Response />
      </WorkshopApp>
    );
  } else if (currentStepKey === "REFRAME_PROBLEM_VOTE") {
    return (
      <WorkshopApp onCompleteStep={onVoteCompleteStep}>
        <Vote />
      </WorkshopApp>
    );
  } else if (currentStepKey === "REFRAME_PROBLEM_REVIEW_VOTES") {
    return (
      <WorkshopApp>
        <ReviewVotes />
      </WorkshopApp>
    );
  }
}

export default ReframeProblem;