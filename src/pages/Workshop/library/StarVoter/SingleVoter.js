import React from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import Button from 'library/Button';

import * as votingActions from 'app/voting/actions';

const SingleVoter = ({ workshopToken, votingItems, modelName, handleUpdateData }) => {
  const dispatch = useDispatch();

  const submitVote = (votingItem) => {
    if (votingItem.star_voting_vote === null || (votingItem.star_voting_vote && votingItem.star_voting_vote.vote_number === 1)) {
      dispatch(
        votingActions
        .saveExclusiveVote(
          workshopToken,
          votingItem.id,
          votingItems.filter(vi => vi.id !== votingItem.id)[0].id,
          modelName
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
      {votingItems.map((votingItem) => {
        const isSelected = votingItem.star_voting_vote && votingItem.star_voting_vote.vote_number === 5 ? true : false;

        return (
          <div key={votingItem.id} className="row mb-4">
            <div className="col-10">
              <div className="feather-card shadow">
                {votingItem.response_text}
              </div>
            </div>

            <div className="col-2">
              <Button
                onClick={() => submitVote(votingItem)}
                className={cn("btn btn-block btn-primary", isSelected ? null : "btn-hollow")}
                text={isSelected ? "Selected!" : "Select"}
              />
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default SingleVoter;