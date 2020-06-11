import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpConfirmation from '../pages/SignUpConfirmation';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const LoginSignup = () => {
  return (
    <React.Fragment>
      <Route path='/login'>
        <Login />
      </Route>

      <Route path='/sign-up'>
        <SignUp />
      </Route>

      <Route path='/signup-confirmation'>
        <SignUpConfirmation />
      </Route>

      <Route path='/forgot-password'>
        <ForgotPassword />
      </Route>

      <Route path='/reset-password'>
        <ResetPassword />
      </Route>
    </React.Fragment>
  );
}

export default LoginSignup;