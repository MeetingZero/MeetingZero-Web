import React from 'react';
import { useHistory } from 'react-router-dom';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';

const SignUpConfirmation = () => {
  const history = useHistory();

  React.useEffect(() => {
    if (!window.sessionStorage.getItem("signUpEmail")) {
      history.push("/login");
    }
  }, [history]);

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Button href="/login" text="Sign in" />
        </div>

        <div className="text-center absolute-center-y">
          <h5 className="mb-1">Thanks!</h5>

          <p>
            We've sent an email to {window.sessionStorage.getItem("signUpEmail")}.
          </p>

          <p>
            Activate your account by clicking the link in your email.
          </p>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default SignUpConfirmation;