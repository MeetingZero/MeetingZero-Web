import React from 'react';
import update from 'immutability-helper';
import { useDispatch, useSelector } from 'react-redux';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';
import * as userActions from '../../app/user/actions';

const SignUp = () => {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (event) => {
    setNewUser(update(newUser, {
      $merge: {
        [event.target.name]: event.target.value
      }
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(userActions
    .saveNewUser(newUser))
    .then(() => {
      console.log("SAVED!");
    })
    .catch((err) => {
      console.log(err);
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
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6 mb-4 mb-md-0">
                <input onChange={handleChange} type="text" name="first_name" className="form-control" placeholder="First name" />
              </div>

              <div className="col-md-6">
                <input onChange={handleChange} type="text" name="last_name" className="form-control" placeholder="Last name" />
              </div>
            </div>

            <input onChange={handleChange} type="email" name="email" className="form-control mb-4" placeholder="Email" />

            <input onChange={handleChange} type="password" name="password" className="form-control mb-1" placeholder="Password" />

            <div className="text-muted small mb-4">
              Must include: 8 characters minimum, 1 number or symbol
            </div>

            <input onChange={handleChange} type="password" name="confirm_password" className="form-control mb-4" placeholder="Confirm password" />

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