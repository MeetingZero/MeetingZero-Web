import React from 'react';

import MultiVoter from './MultiVoter';
import SingleVoter from './SingleVoter';

const StarVoter = ({ workshopToken, votingItems, modelName, handleUpdateData }) => {
  if (votingItems.length > 2) {
    return (
      <MultiVoter
        workshopToken={workshopToken}
        votingItems={votingItems}
        modelName={modelName}
        handleUpdateData={handleUpdateData}
      />
    );
  } else if (votingItems.length === 2) {
    return (
      <SingleVoter
        workshopToken={workshopToken}
        votingItems={votingItems}
        modelName={modelName}
        handleUpdateData={handleUpdateData}
      />
    );
  }

  return null;
}

export default StarVoter;