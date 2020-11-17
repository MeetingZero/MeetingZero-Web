import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import queryString from 'query-string';

import LogoSplitLayout from 'layouts/LogoSplit';
import Button from 'library/Button';
import * as userActions from 'app/user/actions';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, setError, watch } = useForm();

  const passwordWatch = watch("password");

  const [queryStringData, setQueryStringData] = React.useState({});
  const [passwordScore, setPasswordScore] = React.useState(0);

  React.useEffect(() => {
    setQueryStringData(queryString.parse(window.location.search));
  }, []);

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirm_password) {
      return setError("confirm_password");
    }

    if (passwordScore < 3) {
      return setError("password");
    }

    dispatch(userActions
    .resetPassword(formData.password, formData.confirm_password, queryStringData.email, queryStringData.token))
    .then(() => {
      window
      .sessionStorage
      .setItem("resetPassword", "true");

      history.push("/login");
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("RESET_PASSWORD") >= 0;
  });

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="container-small absolute-center-y">
          {queryStringData.email ?
            <div className="mb-2">
              Hi {queryStringData.email}, let's reset your password!
            </div>
          : null}

          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.password ?
              <div className="small mb-1 text-danger">
                Your password is too weak. Please try again with a stronger password.
              </div>
            : null}

            <input ref={register({ required: true })} type="password" name="password" className="form-control mb-1" placeholder="Password" />

            <PasswordStrengthBar
              password={passwordWatch}
              onChangeScore={(score) => setPasswordScore(score)}
              className="mb-2"
            />

            <div className="mb-4">
              <input ref={register} type="password" name="confirm_password" className="form-control" placeholder="Confirm password" />

              {errors.confirm_password ?
                <div className="small text-danger">
                  Passwords must match
                </div>
              : null}
            </div>

            <div className="text-center">
              <Button className="btn btn-primary px-5" text="Confirm password reset" type="submit" loading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default ResetPassword;