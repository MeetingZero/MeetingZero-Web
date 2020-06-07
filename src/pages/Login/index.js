import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';
import * as userActions from '../../app/user/actions';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(userActions.loginUser(email, password))
    .then(() => {
      history.push('/join-workshop');
    })
    .catch(() => {
      setLoginError(true);
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("LOGIN") >= 0;
  });

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Link to="/sign-up">
            Sign up
          </Link>
        </div>

        <div className="container-small absolute-center-y">
          <form onSubmit={handleSubmit}>
            {loginError ?
              <div className="small text-danger mb-2">
                Hmmm... seems like the email and password do not match up
              </div>
            : null}

            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-4" placeholder="Email" />

            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control mb-4" placeholder="Password" />

            <div className="text-center mb-1">
              <Button type="submit" className="btn btn-primary px-5" text="Sign in" loading={isLoading} />
            </div>
          </form>

          <div className="text-center">
            <Link to="/forgot-password" className="small text-muted">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default Login;