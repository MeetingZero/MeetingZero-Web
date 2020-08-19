import React from 'react';
import { useParams } from 'react-router-dom';

import VoterReview from 'pages/Workshop/library/StarVoter/VoterReview';
import ProTip from 'library/ProTip';

const ReviewVotes = () => {
  const params = useParams();

  return (
    <React.Fragment>
      <h1 className="h2 mt-5 mb-5">Voting Results</h1>

      <VoterReview
        workshopToken={params.workshop_token}
        modelName="ProblemResponse"
      />

      <ProTip
        calloutText="Winning Reframe: Waiting for the elevators is annoying"
      />
    </React.Fragment>
  );
}

export default ReviewVotes;
