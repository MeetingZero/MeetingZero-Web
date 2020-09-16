import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StarVoter from 'pages/Workshop/library/StarVoter';

import * as solutionsActions from 'app/workshop/stages/solutions/actions';
import * as opportunityQuestionActions from 'app/workshop/stages/opportunity_question/actions';

const Vote = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(opportunityQuestionActions.getResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  React.useEffect(() => {
    dispatch(
      solutionsActions
      .getSolutionsForVoting(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  const opportunityQuestionResponse = useSelector((state) => {
    return state.OpportunityQuestion.opportunityQuestionResponse;
  });

  const solutionsForVoting = useSelector((state) => {
    return state.Solutions.solutionsForVoting;
  });

  const updateSolutionsForVoting = () => {
    return dispatch(
      solutionsActions
      .getSolutionsForVoting(params.workshop_token)
    );
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Vote</h1>

      <h5 className="mb-4">Evaluate the importance of each solution addressed.</h5>

      {opportunityQuestionResponse ?
        <blockquote className="mb-5">
          <div className="text-muted small">
            Winning Opportunity:
          </div>

          <div>
            {opportunityQuestionResponse.response_text}
          </div>
        </blockquote>
      : null}

      <StarVoter
        workshopToken={params.workshop_token}
        votingItems={solutionsForVoting}
        modelName="SolutionResponse"
        handleUpdateData={updateSolutionsForVoting}
      />
    </React.Fragment>
  );
}

export default Vote;
