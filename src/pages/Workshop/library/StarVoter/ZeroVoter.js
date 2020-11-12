import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as votingActions from 'app/voting/actions';
import * as workshopActions from 'app/workshop/actions';

const ZeroVoter = ({
  workshopToken,
  votingItems,
  modelName
}) => {
  const dispatch = useDispatch();

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  React.useEffect(() => {
    // If there is only 1 item to vote on, save the new voting result and complete the current step
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        votingActions
        .saveVotingResult(workshopToken, modelName, votingItems[0].id, 5)
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
  }, [currentWorkshopStep.workshop_stage_step_id, dispatch, modelName, votingItems, workshopToken, workshop.is_host]);

  return (
    <h4>Loading...</h4>
  );
}

export default ZeroVoter;
