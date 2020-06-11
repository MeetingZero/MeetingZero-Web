import React from 'react';
import { Route } from 'react-router-dom';

import JoinWorkshop from '../pages/JoinWorkshop';
import CreateWorkshop from '../pages/CreateWorkshop';

const CreateJoinWorkshop = () => {
  return (
    <React.Fragment>
      <Route path='/join-workshop'>
        <JoinWorkshop />
      </Route>

      <Route path='/create-workshop'>
        <CreateWorkshop />
      </Route>
    </React.Fragment>
  );
}

export default CreateJoinWorkshop;