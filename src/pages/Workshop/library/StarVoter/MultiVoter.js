import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'library/Button';
import BubbleVoter from 'library/BubbleVoter';

import * as votingActions from 'app/voting/actions';

const MultiVoter = ({ workshopToken, votingItems, modelName, handleUpdateData }) => {
  const dispatch = useDispatch();

  const [viewIndex, setViewIndex] = React.useState(null);

  React.useEffect(() => {
    // Set the view index to the problem that doesn't have a vote yet
    for (let i = 0; i < votingItems.length; i++) {
      if (viewIndex === null && !votingItems[i].star_voting_vote) {
        return setViewIndex(i);
      }
    }

    // If all problems have votes and nothing is currently selected, show the last one
    if (viewIndex === null && votingItems.length > 0) {
      return setViewIndex(votingItems.length - 1);
    }
  }, [votingItems, viewIndex]);

  const submitVote = (voteNum) => {
    if (votingItems[viewIndex].star_voting_vote === null) {
      dispatch(
        votingActions
        .saveVote(
          workshopToken,
          votingItems[viewIndex].id,
          modelName,
          voteNum
        )
      )
      .then((responseData) => {
        if (handleUpdateData) {
          handleUpdateData(responseData);
        }
        
        if (votingItems[viewIndex + 1] !== undefined) {
          return setViewIndex(viewIndex + 1);
        }
      });
    } else {
      dispatch(
        votingActions
        .updateVote(
          workshopToken,
          votingItems[viewIndex].id,
          modelName,
          votingItems[viewIndex].star_voting_vote.id,
          voteNum
        )
      )
      .then((responseData) => {
        if (handleUpdateData) {
          handleUpdateData(responseData);
        }
      });
    }
  }

  return (
    <React.Fragment>
      {votingItems.length > 0 && viewIndex !== null ?
        <React.Fragment>
          {votingItems.length > 1 ?
            <div className="mb-2">
              <Button
                onClick={() => setViewIndex(viewIndex - 1)}
                text="Previous"
                className="btn btn-link mr-3"
                disabled={votingItems[viewIndex - 1] === undefined}
              />

              <Button
                onClick={() => setViewIndex(viewIndex + 1)}
                text="Forward"
                className="btn btn-link"
                disabled={votingItems[viewIndex + 1] === undefined}
              />
            </div>
          : null}

          <div className="text-right mb-1">
            {viewIndex + 1}/{votingItems.length}
          </div>

          <div className="feather-card shadow mb-4">
            {votingItems[viewIndex].response_text}
          </div>

          <div style={{maxWidth: '80%'}} className="mx-auto">
            <BubbleVoter
              minText='Not important'
              maxText='Very important'
              onVote={(voteNum) => submitVote(voteNum)}
              startingVote={votingItems[viewIndex].star_voting_vote ? votingItems[viewIndex].star_voting_vote.vote_number : 0}
            />
          </div>
        </React.Fragment>
      : null}
    </React.Fragment>
  );
}

export default MultiVoter;