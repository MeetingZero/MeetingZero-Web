import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as votingActions from 'app/voting/actions';

const VoterReview = ({ workshopToken, modelName }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      votingActions
      .calculateVotingResults(workshopToken, modelName)
    );
  }, [dispatch, workshopToken, modelName]);

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults[modelName];
  });

  return (
    <React.Fragment>
      {starVotingResults ?
        <React.Fragment>
          <h5 className="mb-2">The Winner</h5>

          {starVotingResults.runoff_winner ?
            <div className="bg-primary text-white rounded px-3 py-1 mb-4 shadow">
              {starVotingResults.runoff_winner.resource.response_text}
            </div>
          : null}

          {starVotingResults.runoff_runner_up ?
            <React.Fragment>
              <h5 className="mb-2">The Runner Up</h5>

              <div className="feather-card rounded shadow">
                {starVotingResults.runoff_runner_up.resource.response_text}
              </div>
            </React.Fragment>
          : null}
        </React.Fragment>
      : null}
    </React.Fragment>
  );
}

export default VoterReview;
