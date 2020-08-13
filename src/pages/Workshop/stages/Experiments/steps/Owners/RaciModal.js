import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';

const RaciModal = ({ modalOpen, toggleRaciModal, userId, taskId }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (assignmentText) => {
    dispatch(
      experimentsActions
      .saveTaskAssignment(params.workshop_token, taskId, userId, assignmentText)
    );
  }

  return (
    <CSSTransition
      in={modalOpen}
      timeout={500}
      classNames="raci-modal-wrapper"
      unmountOnExit
    >
      <div className="raci-modal-wrapper">
        <i
          onClick={(event) => {
            event.stopPropagation();
            toggleRaciModal(false);
          }}
          className="fa fa-close raci-modal-close text-muted"
        />

        <div className="font-weight-bold mb-3">
          Select Matt's assignment for "make pasta".
        </div>

        <div className="row">
          <div className="col-3">
            <button
              onClick={() => handleSubmit("Responsible")}
              className="btn btn-block responsible-button"
            >
              Responsible
            </button>
          </div>

          <div className="col-3">
            <button
              onClick={() => handleSubmit("Accountable")}
              className="btn btn-block accountable-button"
            >
              Accountable
            </button>
          </div>

          <div className="col-3">
            <button
              onClick={() => handleSubmit("Consulted")}
              className="btn btn-block consulted-button"
            >
              Consulted
            </button>
          </div>

          <div className="col-3">
            <button
              onClick={() => handleSubmit("Informed")}
              className="btn btn-block informed-button"
            >
              Informed
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default RaciModal;
