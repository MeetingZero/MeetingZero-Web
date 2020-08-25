import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LogoSplitLayout from 'layouts/LogoSplit';
import Button from 'library/Button';

import * as workshopActions from 'app/workshop/actions';

const JoinWorkshop = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => {
    return state.User.currentUser;
  });

  const [workshopToken, setWorkshopToken] = React.useState();
  const [workshopError, setWorkshopError] = React.useState();

  const onJoinWorkshop = (event) => {
    event.preventDefault();

    setWorkshopError(undefined);

    dispatch(workshopActions.validateWorkshop(workshopToken, currentUser.id, currentUser.email))
    .then(() => {
      history.push(`/workshop/${workshopToken}/start`);
    })
    .catch((err) => {
      setWorkshopError(err.error);
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("VALIDATING_WORKSHOP") >= 0;
  });

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <Button href="/create-workshop" text="Create workshop" />
        </div>

        <div className="container-small mt-10 absolute-center-y">
          {currentUser.first_name && currentUser.last_name ?
            <h1 className="text-center mb-8">Welcome, {currentUser.first_name}!</h1>
          : null}

          <form onSubmit={onJoinWorkshop}>
            <input onChange={(event) => setWorkshopToken(event.target.value)} type="text" className="form-control mb-1" placeholder="MeetingZero ID" />

            {workshopError ?
              <div className="small text-danger">
                {workshopError}
              </div>
            : null}

            <div className="text-center mt-4">
              <Button type="submit" text="Join" className="btn btn-primary px-6" loading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default JoinWorkshop;