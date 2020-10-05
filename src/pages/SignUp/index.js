import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import LogoSplitLayout from 'layouts/LogoSplit';
import Button from 'library/Button';
import * as userActions from 'app/user/actions';
import * as Regex from 'constants/regex';

import "./SignUp.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, setError, setValue } = useForm();

  React.useEffect(() => {
    const emailAddress = window.localStorage.getItem("signupEmail");

    if (emailAddress) {
      setValue("email", emailAddress);
    }

    return () => window.localStorage.removeItem("signupEmail");
  }, [setValue]);

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirm_password) {
      return setError("confirm_password");
    }

    dispatch(userActions
    .saveNewUser(formData))
    .then(() => {
      window
      .sessionStorage
      .setItem("signUpEmail", formData.email);

      history.push("/signup-confirmation");
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("CREATING_NEW_USER") >= 0;
  });

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Button href="/login" text="Log in" />
        </div>

        <div className="container-small absolute-center-y">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <input ref={register({ required: true })} type="text" name="first_name" className="form-control" placeholder="First name" />

                {errors.first_name ?
                  <div className="small text-danger">
                    Please enter a first name
                  </div>
                : null}
              </div>

              <div className="col-md-6">
                <input ref={register({ required: true })} type="text" name="last_name" className="form-control" placeholder="Last name" />

                {errors.last_name ?
                  <div className="small text-danger">
                    Please enter a last name
                  </div>
                : null}
              </div>
            </div>

            <div className="mb-4">
              <input ref={register({ required: true, pattern: Regex.EMAIL })} type="email" name="email" className="form-control" placeholder="Email" />

              {errors.email ?
                <div className="small text-danger">
                  Please enter a valid email
                </div>
              : null}
            </div>

            <input ref={register({ required: true, pattern: Regex.STRONG_PASSWORD })} type="password" name="password" className="form-control mb-1" placeholder="Password" />

            <div className={cn("small mb-4", errors.password ? 'text-danger' : 'text-muted')}>
              Must include: 8 characters minimum, 1 number or symbol
            </div>

            <div className="mb-4">
              <input ref={register({ required: true })} type="password" name="confirm_password" className="form-control" placeholder="Confirm password" />

              {errors.confirm_password ?
                <div className="small text-danger">
                  Passwords must match
                </div>
              : null}
            </div>

            <div className="mb-4">
              <div className="form-group form-check terms-agree-checkbox">
                <input
                  ref={register({ required: true })}
                  type="checkbox"
                  name="terms_agree"
                  className="form-check-input"
                  id="terms-agree"
                />

                <label className={cn("form-check-label", errors.terms_agree ? "text-danger" : null)} htmlFor="terms-agree">
                  I agree to MeetingZero's <a href="https://meetingzero-assets.s3.us-west-1.amazonaws.com/meetingzero_privacy_policy.pdf" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                </label>
              </div>
            </div>

            <div className="text-center">
              <Button className="btn btn-primary px-5" text="Sign up" type="submit" loading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default SignUp;