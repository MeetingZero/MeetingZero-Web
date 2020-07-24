import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

  return (
    <div>Review Votes</div>
  );
}

export default ReviewVotes;