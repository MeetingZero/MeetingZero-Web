import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as workshopActions from 'app/workshop/actions';

import WorkshopSidebar from 'pages/Workshop/library/WorkshopSidebar';
import Blurb from 'pages/Workshop/library/Blurb';
import RingTimer from 'library/RingTimer';

import logo from 'assets/images/logo.svg';
import './WorkshopApp.scss';

const WorkshopApp = ({ children, onTimerExpired }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const handleTimerExpired = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        workshopActions
        .completeWorkshopStep(
          workshop.workshop_token,
          workshopStageStepId
        )
      )
      .then((response) => {
        if (response.workshop_complete) {
          history.push(`/all-workshops/${workshop.workshop_token}`);
        }
      });
    }
  }

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-3 vh-100">
          <div className="workshop-sidebar-container">
            <img src={logo} className="workshop-logo" alt="Workshop Logo" />

            <WorkshopSidebar />
            
            <Blurb title="Workshop Purpose" text={workshop.purpose} />
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
            onTimerExpired={onTimerExpired || handleTimerExpired}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkshopApp;