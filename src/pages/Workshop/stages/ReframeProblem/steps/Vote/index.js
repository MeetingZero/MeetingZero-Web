import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'library/Button';
import BubbleVoter from 'library/BubbleVoter';

import * as reframeProblemActions from 'app/workshop/stages/reframe_problem/actions';
import * as votingActions from 'app/voting/actions';
import reframeProblemSlice from 'app/workshop/stages/reframe_problem/slice';

const Vote = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [viewIndex, setViewIndex] = React.useState(null);

  React.useEffect(() => {
    dispatch(
      reframeProblemActions
      .getAllResponses(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  const allReframeProblemResponses = useSelector((state) => {
    return state.ReframeProblem.allReframeProblemResponses;
  });

  React.useEffect(() => {
    // Set the view index to the reframed problem that doesn't have a vote yet
    for (let i = 0; i < allReframeProblemResponses.length; i++) {
      if (viewIndex === null && !allReframeProblemResponses[i].star_voting_vote) {
        return setViewIndex(i);
      }
    }

    // If all reframed problems have votes and nothing is currently selected, show the last one
    if (viewIndex === null && allReframeProblemResponses.length > 0) {
      return setViewIndex(allReframeProblemResponses.length - 1);
    }
  }, [allReframeProblemResponses, viewIndex]);

  const submitVote = (voteNum) => {
    if (allReframeProblemResponses[viewIndex].star_voting_vote === null) {
      dispatch(
        votingActions
        .saveVote(
          params.workshop_token,
          allReframeProblemResponses[viewIndex].id,
          "ReframeProblemResponse",
          voteNum
        )
      )
      .then((responseData) => {
        dispatch(reframeProblemSlice.actions.setAllReframeProblemResponses(responseData))
        
        if (allReframeProblemResponses[viewIndex + 1] !== undefined) {
          return setViewIndex(viewIndex + 1);
        }
      });
    } else {
      dispatch(
        votingActions
        .updateVote(
          params.workshop_token,
          allReframeProblemResponses[viewIndex].id,
          "ReframeProblemResponse",
          allReframeProblemResponses[viewIndex].star_voting_vote.id,
          voteNum
        )
      )
      .then((responseData) => {
        dispatch(reframeProblemSlice.actions.setAllReframeProblemResponses(responseData))
      });
    }
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Vote</h1>

      <h5 className="mb-4">Evaluate the importance of each item addressed. Once everyone is finished, you will be redirected to the results.</h5>

      {allReframeProblemResponses.length > 0 && viewIndex !== null ?
        <React.Fragment>
          {allReframeProblemResponses.length > 1 ?
            <div className="mb-2">
              <Button
                onClick={() => setViewIndex(viewIndex - 1)}
                text="Previous"
                className="btn btn-link mr-3"
                disabled={allReframeProblemResponses[viewIndex - 1] === undefined}
              />

              <Button
                onClick={() => setViewIndex(viewIndex + 1)}
                text="Forward"
                className="btn btn-link"
                disabled={allReframeProblemResponses[viewIndex + 1] === undefined}
              />
            </div>
          : null}

          <div className="text-right mb-1">
            {viewIndex + 1}/{allReframeProblemResponses.length}
          </div>

          <div className="feather-card shadow mb-4">
            {allReframeProblemResponses[viewIndex].response_text}
          </div>

          <div style={{maxWidth: '80%'}} className="mx-auto">
            <BubbleVoter
              minText='Not important'
              maxText='Very important'
              onVote={(voteNum) => submitVote(voteNum)}
              startingVote={allReframeProblemResponses[viewIndex].star_voting_vote ? allReframeProblemResponses[viewIndex].star_voting_vote.vote_number : 0}
            />
          </div>
        </React.Fragment>
      : null}
    </React.Fragment>
  );
}

export default Vote;
