import React from 'react';
import cn from 'classnames';

import './BubbleVoter.scss';

const BubbleVoter = ({ minText, maxText, onVote, startingVote }) => {
  const [voteSelected, setVoteSelected] = React.useState(null);
  const [voteHovered, setVoteHovered] = React.useState(null);

  React.useEffect(() => {
    if (startingVote === null || startingVote === undefined) {
      setVoteSelected(0);
    } else {
      setVoteSelected(startingVote.vote_number);
    }
  }, [startingVote]);

  const handleVote = (voteNum) => {
    setVoteSelected(voteNum);
    setVoteHovered(null);

    if (onVote) {
      return onVote(voteNum);
    }
  }

  return (
    <div className="bubble-voter">
      <div className="bubble-voter-label">
        {minText}
      </div>

      <div className="bubble-voter-bubble-container">
        <div
          onClick={() => handleVote(1)}
          onMouseEnter={() => setVoteHovered(1)}
          onMouseLeave={() => setVoteHovered(null)}
          className={cn('bubble-voter-bubble', voteSelected >= 1 || voteHovered >= 1 ? 'active' : null)}
        />
      </div>
      <div className="bubble-voter-bubble-container">
        <div
          onClick={() => handleVote(2)}
          onMouseEnter={() => setVoteHovered(2)}
          onMouseLeave={() => setVoteHovered(null)}
          className={cn('bubble-voter-bubble', voteSelected >= 2 || voteHovered >= 2 ? 'active' : null)}
        />
      </div>
      <div className="bubble-voter-bubble-container">
        <div
          onClick={() => handleVote(3)}
          onMouseEnter={() => setVoteHovered(3)}
          onMouseLeave={() => setVoteHovered(null)}
          className={cn('bubble-voter-bubble', voteSelected >= 3 || voteHovered >= 3 ? 'active' : null)}
        />
      </div>
      <div className="bubble-voter-bubble-container">
        <div
          onClick={() => handleVote(4)}
          onMouseEnter={() => setVoteHovered(4)}
          onMouseLeave={() => setVoteHovered(null)}
          className={cn('bubble-voter-bubble', voteSelected >= 4 || voteHovered >= 4 ? 'active' : null)}
        />
      </div>
      <div className="bubble-voter-bubble-container">
        <div
          onClick={() => handleVote(5)}
          onMouseEnter={() => setVoteHovered(5)}
          onMouseLeave={() => setVoteHovered(null)}
          className={cn('bubble-voter-bubble', voteSelected === 5 || voteHovered === 5 ? 'active' : null)}
        />
      </div>

      <div className="bubble-voter-label text-right">
        {maxText}
      </div>
    </div>
  );
}

export default BubbleVoter;
