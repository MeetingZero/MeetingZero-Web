import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Responses from './steps/Responses';
import ImpactEffort from './steps/ImpactEffort';
import Vote from './steps/Vote';
import ReviewVotes from './steps/ReviewVotes';

import * as workshopActions from 'app/workshop/actions';
import * as solutionsActions from 'app/workshop/stages/solutions/actions';
import * as votingActions from 'app/voting/actions';

const Solutions = () => {
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
        .calculateVotingResults(workshop.workshop_token, "SolutionResponse")
      )
      .then(() => {
        dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
      });
    }
  }

  const onImpactEffortCompleteStep = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        solutionsActions
        .getSolutionsForVoting(workshop.workshop_token)
      )
      .then(() => {
        dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
      });
    }
  }

  if (currentStepKey === "SOLUTIONS_RESPONSES") {
    return (
      <WorkshopApp>
        <Responses />
      </WorkshopApp>
    );
  } else if (currentStepKey === "SOLUTIONS_IMPACT_EFFORT") {
    return (
      <WorkshopApp onCompleteStep={onImpactEffortCompleteStep}>
        <ImpactEffort />
      </WorkshopApp>
    );
  } else if (currentStepKey === "SOLUTIONS_VOTE") {
    return (
      <WorkshopApp onCompleteStep={onVoteCompleteStep}>
        <Vote />
      </WorkshopApp>
    );
  } else if (currentStepKey === "SOLUTIONS_REVIEW_VOTES") {
    return (
      <WorkshopApp>
        <ReviewVotes />
      </WorkshopApp>
    );
  }
}

export default Solutions;