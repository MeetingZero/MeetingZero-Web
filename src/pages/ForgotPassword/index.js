import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import LogoSplitLayout from 'layouts/LogoSplit';
import Button from 'library/Button';
import * as userActions from 'app/user/actions';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);

    dispatch((userActions.forgotPassword(email)))
    .then(() => {
      setShowSuccess(true);
    })
    .catch(() => {
      setEmailError(true);
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("FORGOT_PASSWORD") >= 0;
  });

  if (showSuccess) {
    return (
      <LogoSplitLayout>
        <div className="p-2">
          <div className="text-center absolute-center-y">
            <h5 className="mb-1">Success!</h5>

            <p>
              We've sent an email to {email}.
            </p>

            <p>
              Reset your password by clicking the link in your email.
            </p>
          </div>
        </div>
      </LogoSplitLayout>
    );
  }

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="container-small absolute-center-y">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              Happens all the time, worry not!
            </div>

            {emailError ?
              <div className="small text-danger mb-1">
                Email not found
              </div>
            : null}

            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control mb-4" placeholder="Email" />

            <div className="text-center mb-1">
              <Button type="submit" className="btn btn-primary px-5" text="Send recovery link" loading={isLoading} />
            </div>
          </form>

          <div className="text-center">
            <Link to="/login" className="small text-muted">
              Nevermind, I remember
            </Link>
          </div>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default Login;