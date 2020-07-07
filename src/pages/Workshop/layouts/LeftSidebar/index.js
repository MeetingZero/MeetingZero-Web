import React from 'react';
import { useSelector } from 'react-redux';

import WorkshopSidebar from '../../library/WorkshopSidebar';
import Blurb from '../../library/Blurb';
import RingTimer from '../../../../library/RingTimer';

import logo from '../../../../assets/images/logo.svg';
import './LeftSidebar.scss';

const LeftSidebar = ({ children }) => {
  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  return (
    <div className="container-fluid container-fixed">
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
          <RingTimer
            radius={75}
            strokeWidth={4}
            startTimestamp={currentWorkshopStep.workshop_stage_step_start_time}
            expireTimestamp={currentWorkshopStep.workshop_stage_step_expire_time}
            onTimerExpired={() => console.log('TIMER EXPIRED')}
          />
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;