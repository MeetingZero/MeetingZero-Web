import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import ProTip from 'library/ProTip';

import "./Owners.scss";

import * as experimentsActions from 'app/workshop/stages/experiments/actions';
import * as workshopActions from 'app/workshop/actions';

const Owners = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(experimentsActions.getHypothesis(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const hypothesis = useSelector((state) => {
    return state.Experiments.hypothesis;
  });

  React.useEffect(() => {
    dispatch(workshopActions.getWorkshopMembers(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Owners</h1>

      <h5 className="mb-4">Assigning responsibility to team members for this experiment</h5>

      <div className="row mb-3">
        <div className="col-4">
          <blockquote>
            <div className="text-muted small">
              Winning Solution:
            </div>

            <div>
              This will be the winning solution once that functionality is in
            </div>
          </blockquote>
        </div>

        <div className="col-8">
          <blockquote>
            <div className="text-muted small">
              Hypothesis:
            </div>

            {hypothesis ?
              <div>
                {hypothesis.we_believe_text} {hypothesis.will_result_in_text} {hypothesis.succeeded_when_text}
              </div>
            : null}
          </blockquote>
        </div>
      </div>

      <div className="raci-matrix h-100">
        <div className="row">
          <div className="col-2"></div>

          <div className="col-2 text-center">
            <strong>Matt</strong>
          </div>

          <div className="col-2 text-center">
            <strong>Arun</strong>
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            <textarea className="form-control h-100" placeholder="Your Task" />
          </div>

          <div className="col-2">
            <div className="d-flex h-100">
              <button type="button" className="btn btn-link text-muted btn-block">+ Assign</button>
            </div>
          </div>
        </div>
      </div>

      <RaciModal />

      <ProTip
        mainTitle="How this works"
        mainText={
          <React.Fragment>
            <p className="font-weight-bold">
              Fill out this chart with all the tasks that are necessary to complete the experiment. Then, assign responsibility to each team member.
            </p>

            <p>
              <div className="font-weight-bold">Responsible</div>
            
              <div>The team members who actually complete the task.</div>
            </p>

            <p>
              <div className="font-weight-bold">Accountable</div>

              <div>The person who delegates work and provides the final review on the task.</div>
            </p>

            <p>
              <div className="font-weight-bold">Consulted</div>

              <div>The people who provide input on a the task based on their domain of expertise.</div>
            </p>

            <p>
              <div className="font-weight-bold">Informed</div>

              <div>Make sure everyone else is in kept in the loop!</div>
            </p>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

const RaciModal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames="raci-modal-wrapper"
      unmountOnExit
    >
      <div className="raci-modal-wrapper">
        <i
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(false);
          }}
          className="fa fa-close raci-modal-close text-muted"
        />

        <div className="font-weight-bold mb-3">
          Select Matt's assignment for "make pasta".
        </div>

        <div className="row">
          <div className="col-3">
            <button className="btn btn-block responsible-button">Responsible</button>
          </div>

          <div className="col-3">
            <button className="btn btn-block accountable-button">Accountable</button>
          </div>

          <div className="col-3">
            <button className="btn btn-block consulted-button">Consulted</button>
          </div>

          <div className="col-3">
            <button className="btn btn-block informed-button">Informed</button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Owners;