import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

import WorkshopSummary from './WorkshopSummary';

import './AllWorkshops.scss';

import * as workshopActions from 'app/workshop/actions';

const AllWorkshops = () => {
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
      return history.push(`/all-workshops/${myWorkshops[0].workshop_token}`);
    } else if (params.workshop_token && myWorkshops && myWorkshops.length > 0) {
      for (let i = 0; i < myWorkshops.length; i++) {
        if (myWorkshops[i].workshop_token === params.workshop_token) {
          return setCurrentWorkshop(myWorkshops[i]);
        }
      }
    }
  }, [myWorkshops, params.workshop_token, history]);

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-3 vh-100 bg-info">
          <h5 className="font-weight-normal mb-3 mt-5">Past Workshops</h5>

          {myWorkshops.map((myWorkshop) => {
            return (
              <Link
                key={myWorkshop.id}
                to={`/all-workshops/${myWorkshop.workshop_token}`}
                className={`d-block all-workshops-links ${params.workshop_token === myWorkshop.workshop_token ? "active" : ""}`}
              >
                {myWorkshop.date_time_planned ?
                  <div className="small text-muted">
                    {myWorkshop.date_time_planned}
                  </div>
                : null}

                <div className="mt-1 font-weight-bold">
                  {myWorkshop.purpose}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="col-9 vh-100 overflow-y-scroll">
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

export default AllWorkshops;
