import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import WhatIsWorking from './stages/WhatIsWorking';
import * as workshopActions from '../../app/workshop/actions';

const Workshop = () => {
  const dispatch = useDispatch();
  const params = useParams();

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getDirector(params.workshop_token)
    );

    dispatch(
      workshopActions
      .getCurrentStep(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  return (
    <WhatIsWorking />
  );
}

export default Workshop;