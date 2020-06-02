import React from 'react';
import { useDispatch } from 'react-redux';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';

import * as userActions from '../../app/user/actions';

const JoinWorkshop = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(userActions.getUser());
  }, [dispatch]);

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Button href="/login" text="Create workshop" />
        </div>

        <div className="container-small mt-10 absolute-center-y">
          <h1 className="text-center mb-8">Welcome, Matt!</h1>

          <input type="text" className="form-control mb-5" placeholder="MeetingZero ID" />

          <div className="text-center">
            <button className="btn btn-primary px-6">Join</button>
          </div>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default JoinWorkshop;