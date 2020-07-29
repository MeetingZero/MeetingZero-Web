import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'library/Button';
import BubbleVoter from 'library/BubbleVoter';

import * as problemsActions from 'app/workshop/stages/problems/actions';

const Vote = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [viewIndex, setViewIndex] = React.useState(null);

  React.useEffect(() => {
    dispatch(
      problemsActions
      .getAllResponses(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  const allProblemsResponses = useSelector((state) => {
    return state.Problems.allProblemsResponses;
  });

  React.useEffect(() => {
    // Set the view index to the problem that doesn't have a vote yet
    for (let i = 0; i < allProblemsResponses.length; i++) {
      if (viewIndex === null && !allProblemsResponses[i].star_voting_vote) {
        return setViewIndex(i);
      }
    }

    // If all problems have votes and nothing is currently selected, show the last one
    if (viewIndex === null && allProblemsResponses.length > 0) {
      return setViewIndex(allProblemsResponses.length - 1);
    }
  }, [allProblemsResponses, viewIndex]);

  const submitVote = (voteNum) => {
    if (allProblemsResponses[viewIndex].star_voting_vote === null) {
      dispatch(
        problemsActions
        .saveVote(
          params.workshop_token,
          allProblemsResponses[viewIndex].id,
          voteNum
        )
      )
      .then(() => {
        if (allProblemsResponses[viewIndex + 1] !== undefined) {
          return setViewIndex(viewIndex + 1);
        }
      });
    } else {
      dispatch(
        problemsActions
        .updateVote(
          params.workshop_token,
          allProblemsResponses[viewIndex].id,
          allProblemsResponses[viewIndex].star_voting_vote.id,
          voteNum
        )
      );
    }
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Vote</h1>

      <h5 className="mb-4">Evaluate the importance of each item addressed. Once everyone is finished, you will be redirected to the results.</h5>

      {allProblemsResponses.length > 0 && viewIndex !== null ?
        <React.Fragment>
          {allProblemsResponses.length > 1 ?
            <div className="mb-2">
              <Button
                onClick={() => setViewIndex(viewIndex - 1)}
                text="Previous"
                className="btn btn-link mr-3"
                disabled={allProblemsResponses[viewIndex - 1] === undefined}
              />

              <Button
                onClick={() => setViewIndex(viewIndex + 1)}
                text="Forward"
                className="btn btn-link"
                disabled={allProblemsResponses[viewIndex + 1] === undefined}
              />
            </div>
          : null}

          <div className="text-right mb-1">
            {viewIndex + 1}/{allProblemsResponses.length}
          </div>

          <div className="feather-card shadow mb-4">
            {allProblemsResponses[viewIndex].response_text}
          </div>

          <div style={{maxWidth: '80%'}} className="mx-auto">
            <BubbleVoter
              minText='Not important'
              maxText='Very important'
              onVote={(voteNum) => submitVote(voteNum)}
              startingVote={allProblemsResponses[viewIndex].star_voting_vote ? allProblemsResponses[viewIndex].star_voting_vote.vote_number : 0}
            />
          </div>
        </React.Fragment>
      : null}
    </React.Fragment>
  );
}

export default Vote;
