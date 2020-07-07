import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as workshopActions from '../../../../app/workshop/actions';

import WorkshopSidebar from '../../library/WorkshopSidebar';
import Blurb from '../../library/Blurb';
import RingTimer from '../../../../library/RingTimer';

import logo from '../../../../assets/images/logo.svg';
import './LeftSidebar.scss';

const LeftSidebar = ({ children }) => {
  const dispatch = useDispatch();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const handleTimerExpired = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
    }
  }

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
            onTimerExpired={handleTimerExpired}
          />
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;