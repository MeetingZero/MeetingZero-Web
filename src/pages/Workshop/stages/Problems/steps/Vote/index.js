import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProTip from 'library/ProTip';
import StarVoter from 'pages/Workshop/library/StarVoter';

import * as problemsActions from 'app/workshop/stages/problems/actions';
import problemsSlice from 'app/workshop/stages/problems/slice';

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

  const updateProblemsResponses = (responseData) => {
    dispatch(problemsSlice.actions.setAllProblemsResponses(responseData))
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Vote</h1>

      <h5 className="mb-4">Evaluate the importance of each item addressed. Once everyone is finished, you will be redirected to the results.</h5>

      <StarVoter
        workshopToken={params.workshop_token}
        votingItems={allProblemsResponses}
        modelName="ProblemResponse"
        handleUpdateData={updateProblemsResponses}
      />

      <ProTip
        mainText="If you're stuck, go with your gut."
      />
    </React.Fragment>
  );
}

export default Vote;
