import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import queryString from 'query-string';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';
import * as userActions from '../../app/user/actions';
import * as Regex from '../../constants/regex';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, setError } = useForm();

  const [queryStringData, setQueryStringData] = React.useState({});

  React.useEffect(() => {
    setQueryStringData(queryString.parse(window.location.search));
  }, []);

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirm_password) {
      return setError("confirm_password");
    }

    dispatch(userActions
    .resetPassword(formData.password, formData.confirm_password, queryStringData.email, queryStringData.token))
    .then(() => {
      history.push("/login?reset_password=true");
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
            <input ref={register({ required: true, pattern: Regex.STRONG_PASSWORD })} type="password" name="password" className="form-control mb-1" placeholder="Password" />

            <div className={cn("small mb-4", errors.password ? 'text-danger' : 'text-muted')}>
              Must include: 8 characters minimum, 1 number or symbol
            </div>

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