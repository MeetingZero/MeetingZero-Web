import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import BubbleVoter from '../../../../../../library/BubbleVoter';

import * as problemsActions from '../../../../../../app/workshop/stages/problems/actions';

const Vote = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      problemsActions
      .getAllResponses(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  const allProblemsResponses = useSelector((state) => {
    return state.Problems.allProblemsResponses;
  });

  console.log(allProblemsResponses);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Vote</h1>

      <h5 className="mb-4">Evaluate the importance of each item addressed. Once everyone is finished, you will be redirected to the results.</h5>
      
      <BubbleVoter
        minText='Not important'
        maxText='Very important'
        onVote={(voteNum) => console.log(voteNum)}
      />
    </React.Fragment>
  );
}

export default Vote;