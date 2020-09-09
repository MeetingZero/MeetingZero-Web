import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import Button from 'library/Button';
import WorkshopSummary from './WorkshopSummary';

import './PastWorkshops.scss';

import logoImg from 'assets/images/logo.svg';

import * as workshopActions from 'app/workshop/actions';

const PastWorkshops = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getMyWorkshops()
    );
  }, [dispatch]);

  const myWorkshops = useSelector((state) => {
    return state.Workshop.myWorkshops;
  });

  const [currentWorkshop, setCurrentWorkshop] = React.useState(null);

  React.useEffect(() => {
    if (!params.workshop_token && myWorkshops && myWorkshops.length > 0) {
      return history.push(`/past-workshops/${myWorkshops[0].workshop_token}`);
    } else if (params.workshop_token && myWorkshops && myWorkshops.length > 0) {
      for (let i = 0; i < myWorkshops.length; i++) {
        if (myWorkshops[i].workshop_token === params.workshop_token) {
          return setCurrentWorkshop(myWorkshops[i]);
        }
      }
    }
  }, [myWorkshops, params.workshop_token, history]);

  const handleSignOut = () => {
    window.localStorage.removeItem("authToken");

    history.push("/");
  }

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-3 vh-100 bg-info">
          <Link to="/dashboard" className="d-flex align-items-end my-3 text-decoration-none">
            <img src={logoImg} className="img-fluid d-block" style={{width: 100}} alt="Logo" />

            <h1 className="text-primary font-weight-normal ml-2">MeetingZero</h1>
          </Link>

          <h5 className="font-weight-normal mb-3 mt-5">Past Workshops</h5>

          {myWorkshops.map((myWorkshop) => {
            return (
              <Link
                key={myWorkshop.id}
                to={`/past-workshops/${myWorkshop.workshop_token}`}
                className={`d-block past-workshops-links ${params.workshop_token === myWorkshop.workshop_token ? "active" : ""}`}
              >
                {myWorkshop.date_time_planned ?
                  <div className="small text-muted">
                    {moment(myWorkshop.date_time_planned).format('MMMM Do YYYY, h:mm A')}
                  </div>
                : null}

                <div className="font-weight-bold">
                  {myWorkshop.purpose}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="col-9 vh-100 overflow-y-scroll">
          <div className="d-flex justify-content-end px-5 mt-3">
            <div>
              <Link to="/create-workshop" className="btn btn-block btn-link btn-square">
                Create Workshop
              </Link>
            </div>

            <div>
              <Link to="/join-workshop" className="btn btn-block btn-link btn-square ml-2">
                Join Workshop
              </Link>
            </div>

            <div>
              <Button onClick={handleSignOut} className="btn btn-block btn-link btn-square ml-2" text="Sign Out" />
            </div>
          </div>

          {currentWorkshop !== null ?
            <WorkshopSummary
              workshop={currentWorkshop}
            />
          : null}
        </div>
      </div>
    </div>
  );
}

export default PastWorkshops;
