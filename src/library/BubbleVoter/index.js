import React from 'react';
import cn from 'classnames';

import './BubbleVoter.scss';

const BubbleVoter = ({ minText, maxText, onVote, startingVote }) => {
  const [voteSelected, setVoteSelected] = React.useState(null);

  React.useEffect(() => {
    if (startingVote) {
      setVoteSelected(startingVote);
    }
  }, [startingVote]);

  const handleVote = (voteNum) => {
    setVoteSelected(voteNum);

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
        <div onClick={() => handleVote(1)} className={cn('bubble-voter-bubble', voteSelected >= 1 ? 'active' : '')}></div>
      </div>
      <div className="bubble-voter-bubble-container">
        <div onClick={() => handleVote(2)} className={cn('bubble-voter-bubble', voteSelected >= 2 ? 'active' : '')}></div>
      </div>
      <div className="bubble-voter-bubble-container">
        <div onClick={() => handleVote(3)} className={cn('bubble-voter-bubble', voteSelected >= 3 ? 'active' : '')}></div>
      </div>
      <div className="bubble-voter-bubble-container">
        <div onClick={() => handleVote(4)} className={cn('bubble-voter-bubble', voteSelected >= 4 ? 'active' : '')}></div>
      </div>
      <div className="bubble-voter-bubble-container">
        <div onClick={() => handleVote(5)} className={cn('bubble-voter-bubble', voteSelected >= 5 ? 'active' : '')}></div>
      </div>

      <div className="bubble-voter-label text-right">
        {maxText}
      </div>
    </div>
  );
}

export default BubbleVoter;