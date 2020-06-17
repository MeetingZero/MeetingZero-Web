import React from 'react';

import MeetingSidebar from '../../library/MeetingSidebar';

import logo from '../../../../assets/images/logo.svg';
import './LeftSidebar.scss';

const LeftSidebar = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 p-3 vh-100">
          <img src={logo} className="meeting-logo" alt="Meeting Logo" />

          <div className="meeting-left-sidebar-bottom">
            <MeetingSidebar />
          </div>
        </div>

        <div className="col-lg-7 p-3">
          {children}
        </div>

        <div className="col-lg-2">
          Third Column
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;