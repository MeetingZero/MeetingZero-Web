import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import queryString from 'query-string';

import LogoSplitLayout from 'layouts/LogoSplit';
import Button from 'library/Button';

import * as workshopActions from 'app/workshop/actions';
import workshopSlice from 'app/workshop/slice';

const JoinWorkshop = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => {
    return state.User.currentUser;
  });

  const [workshopToken, setWorkshopToken] = React.useState("");
  const [workshopError, setWorkshopError] = React.useState();

  // Pre-populate workshop ID input with token if present
  React.useEffect(() => {
    const parsedQs = queryString.parse(window.location.search);

    if (parsedQs.workshop_token) {
      setWorkshopToken(parsedQs.workshop_token);
    }
  }, []);

  const onJoinWorkshop = (event) => {
    event.preventDefault();

    setWorkshopError(undefined);

    // Reset workshop slice to prevent any issues with previous workshops
    dispatch(workshopSlice.actions.reset());

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
        <div className="d-flex justify-content-end px-5">
          <div>
            <Link to="/create-workshop" className="btn btn-block btn-link btn-square">
              Create Workshop
            </Link>
          </div>

          <div>
            <Link to="/dashboard" className="btn btn-block btn-link btn-square ml-2">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="container-small mt-10 absolute-center-y">
          {currentUser.first_name && currentUser.last_name ?
            <h1 className="text-center mb-8">Welcome, {currentUser.first_name}!</h1>
          : null}

          <form onSubmit={onJoinWorkshop}>
            <input
              onChange={(event) => setWorkshopToken(event.target.value)}
              type="text"
              className="form-control mb-1"
              placeholder="MeetingZero ID"
              value={workshopToken}
            />

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