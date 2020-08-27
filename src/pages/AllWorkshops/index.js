import React from 'react';
import { useDispatch } from 'react-redux';

import * as workshopActions from 'app/workshop/actions';

const AllWorkshops = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getMyWorkshops()
    );
  }, [dispatch]);

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-3 vh-100 bg-info">
          Sidebar
        </div>

        <div className="col-9 vh-100">
          Content
        </div>
      </div>
    </div>
  );
}

export default AllWorkshops;