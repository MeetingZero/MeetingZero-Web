import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MultiVoter from './MultiVoter';
import SingleVoter from './SingleVoter';

import * as votingActions from 'app/voting/actions';
import * as workshopActions from 'app/workshop/actions';

const StarVoter = ({ workshopToken, votingItems, modelName, handleUpdateData }) => {
  const dispatch = useDispatch();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  React.useEffect(() => {
    // If there is only 1 item to vote on, just calculate votes and complete the current step
    if (votingItems.length === 1) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        votingActions
        .calculateVotingResults(workshopToken, modelName)
      )
      .then(() => {
        dispatch(
          workshopActions
          .completeWorkshopStep(
            workshopToken,
            workshopStageStepId
          )
        );
      });
    }
  }, [dispatch, modelName, votingItems.length, workshopToken, currentWorkshopStep.workshop_stage_step_id]);

  if (votingItems.length > 2) {
    return (
      <MultiVoter
        workshopToken={workshopToken}
        votingItems={votingItems}
        modelName={modelName}
        handleUpdateData={handleUpdateData}
      />
    );
  } else if (votingItems.length === 2) {
    return (
      <SingleVoter
        workshopToken={workshopToken}
        votingItems={votingItems}
        modelName={modelName}
        handleUpdateData={handleUpdateData}
      />
    );
  }

  return null;
}

export default StarVoter;