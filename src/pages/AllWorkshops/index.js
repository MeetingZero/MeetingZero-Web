import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as workshopActions from 'app/workshop/actions';

const AllWorkshops = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getMyWorkshops()
    );
  }, [dispatch]);

  const myWorkshops = useSelector((state) => {
    return state.Workshop.myWorkshops;
  });

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-3 vh-100 bg-info">
          {myWorkshops.map((myWorkshop) => {
            return (
              <div key={myWorkshop.id}>
                {myWorkshop.date_time_planned ?
                  <div className="small text-muted">
                    {myWorkshop.date_time_planned}
                  </div>
                : null}

                <div className="mt-1 mb-3">
                  {myWorkshop.purpose}
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-9 vh-100">
          Content
        </div>
      </div>
    </div>
  );
}

export default AllWorkshops;