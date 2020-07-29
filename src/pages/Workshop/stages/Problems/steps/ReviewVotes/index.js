import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as votingActions from 'app/voting/actions';

const ReviewVotes = () => {
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(
      votingActions
      .calculateVotingResults(params.workshop_token, "ProblemResponse")
    );
  }, [dispatch, params.workshop_token]);

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["ProblemResponse"];
  });

  return (
    <React.Fragment>
      <h1 className="h2 mt-5 mb-5">Voting Results</h1>

      {starVotingResults ?
        <React.Fragment>
          <h5 className="mb-1">The Winner</h5>

          <div className="bg-primary text-white rounded px-3 py-1 mb-4 shadow">
            {starVotingResults.runoff_winner.resource.response_text}
          </div>

          <h5 className="mb-1">The Runner Up</h5>

          <div className="feather-card rounded shadow">
            {starVotingResults.runoff_runner_up.resource.response_text}
          </div>
        </React.Fragment>
      : null}
    </React.Fragment>
  );
}

export default ReviewVotes;
