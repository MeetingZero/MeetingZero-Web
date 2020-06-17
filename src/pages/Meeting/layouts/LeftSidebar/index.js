import React from 'react';

import MeetingSidebar from '../../library/MeetingSidebar';
import Blurb from '../../library/Blurb';
import Timer from '../../library/Timer';

import logo from '../../../../assets/images/logo.svg';
import './LeftSidebar.scss';

const LeftSidebar = ({ children }) => {
  return (
    <div className="container-fluid meeting-left-sidebar-container">
      <div className="row">
        <div className="col-3 vh-100">
          <img src={logo} className="meeting-logo" alt="Meeting Logo" />

          <div className="meeting-left-sidebar-bottom">
            <MeetingSidebar />

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