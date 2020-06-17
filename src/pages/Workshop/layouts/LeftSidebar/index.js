import React from 'react';

import WorkshopSidebar from '../../library/WorkshopSidebar';
import Blurb from '../../library/Blurb';
import Timer from '../../library/Timer';

import logo from '../../../../assets/images/logo.svg';
import './LeftSidebar.scss';

const LeftSidebar = ({ children }) => {
  return (
    <div className="container-fluid workshop-left-sidebar-container">
      <div className="row">
        <div className="col-3 vh-100">
          <img src={logo} className="workshop-logo" alt="Workshop Logo" />

          <div className="workshop-left-sidebar-bottom">
            <WorkshopSidebar />

            <Blurb />
          </div>
        </div>

        <div className="col-7 p-3">
          {children}
        </div>

        <div className="col-2">
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;