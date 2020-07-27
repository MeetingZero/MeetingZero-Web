import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as problemsActions from 'app/workshop/stages/problems/actions';

const ReviewVotes = () => {
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(
      problemsActions
      .calculateVotingResults(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  const problemsVoteResults = useSelector((state) => {
    return state.Problems.problemsVoteResults;
  });

  return (
    <React.Fragment>
      <h1 className="h2 mt-5 mb-5">Voting Results</h1>

      {problemsVoteResults ?
        <React.Fragment>
          <h5 className="mb-1">The Winner</h5>

          <div className="bg-primary text-white rounded px-3 py-1 mb-4 shadow">
            {problemsVoteResults.runoff_winner.problem_response.response_text}
          </div>

          <h5 className="mb-1">The Runner Up</h5>

          <div className="feather-card rounded shadow">
            {problemsVoteResults.runoff_runner_up.problem_response.response_text}
          </div>
        </React.Fragment>
      : null}
    </React.Fragment>
  );
}

export default ReviewVotes;