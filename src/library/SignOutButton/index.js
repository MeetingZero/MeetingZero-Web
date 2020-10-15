import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'library/Button';

import userSlice from 'app/user/slice';

const SignOutButton = ({
  text = "Sign Out",
  className
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignOut = () => {
    window.localStorage.removeItem("authToken");

    dispatch(userSlice.actions.resetAll());

    return history.push("/");
  }

  return (
    <Button
      onClick={handleSignOut}
      text={text}
      className={className}
    />
  );
}

export default SignOutButton;