import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoadingScreen from 'library/LoadingScreen';

import * as userActions from 'app/user/actions';

const Restricted = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  const currentUser = useSelector((state) => {
    return state.User.currentUser;
  });

  if (currentUser.loggedIn === false) {
    return <Redirect to="/login" />
  }

  if (currentUser.loggedIn === undefined) {
    return (
      <LoadingScreen />
    );
  }

  if (currentUser.loggedIn === true) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export default Restricted;