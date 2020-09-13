import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AddTimeModal.scss';
import modernClockImg from 'assets/images/modern_clock.svg';

import Button from 'library/Button';

import * as workshopActions from 'app/workshop/actions';

const AddTimeModal = ({ workshopToken, setAddTimeModalVisible }) => {
  const dispatch = useDispatch();

  const handleAddTime = () => {
    dispatch(
      workshopActions
      .addTime(workshopToken, 300)
    )
    .then(() => {
      window.localStorage.setItem("timeAdded", "true");

      setAddTimeModalVisible(false);
    });
  }

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const handleEndWorkshop = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));

      setAddTimeModalVisible(false);
    }
  }

  return (
    <div className="add-time-modal">
      <img
        src={modernClockImg}
        className="add-time-modal-icon img-fluid d-block mx-auto mb-3"
        alt="Clock"
      />

      <h5 className="text-center mb-3">Times up! What would you like to do?</h5>

      <div className="row">
        <div className="col-6">
          <Button
            onClick={handleEndWorkshop}
            text="End Workshop"
            className="btn btn-link btn-lg btn-block text-left"
          />
        </div>

        <div className="col-6">
          <Button
            onClick={handleAddTime}
            text="Add 5 Minutes"
            className="btn btn-link btn-lg btn-block text-right"
          />
        </div>
      </div>
    </div>
  );
}

export default AddTimeModal;