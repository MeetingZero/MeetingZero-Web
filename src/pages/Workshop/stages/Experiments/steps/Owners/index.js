import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TaskAssignments from './TaskAssignments';
import RaciModal from './RaciModal';
import ProTip from 'library/ProTip';

import "./Owners.scss";

import * as experimentsActions from 'app/workshop/stages/experiments/actions';
import * as workshopActions from 'app/workshop/actions';
import experimentsSlice from 'app/workshop/stages/experiments/slice';

const Owners = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(experimentsActions.getHypothesis(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  React.useEffect(() => {
    dispatch(experimentsActions.getExperimentTasks(params.workshop_token));
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

  const experimentTasks = useSelector((state) => {
    return state.Experiments.experimentTasks;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const addNewTask = () => {
    dispatch(experimentsSlice.actions.addBlankExperimentTask());
  }

  const [raciModalOpen, setRaciModalOpen] = React.useState(false);
  const [raciModalUserId, setRaciModalUserId] = React.useState(null);
  const [raciModalTask, setRaciModalTask] = React.useState(null);

  const toggleRaciModal = (isOpen, userId, task) => {
    setRaciModalUserId(userId);
    setRaciModalTask(task);
    setRaciModalOpen(isOpen);
  }

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

          {workshopMembers.map((wm, index) => {
            return (
              <div key={wm.id} className={`col-2 text-center border border-top-0 py-2 ${index + 1 < workshopMembers.length ? "border-right-0" : null}`}>
                <strong>{wm.user.first_name}</strong>
              </div>
            );
          })}
        </div>

        {experimentTasks.map((experimentTask, index) => {
          return (
            <TaskAssignments
              key={index}
              existingTask={experimentTask}
              allWorkshopMembers={workshopMembers}
              toggleRaciModal={toggleRaciModal}
            />
          );
        })}

        {workshop.is_host ?
          <div className="row">
            <div className="col-2">
              <button
                onClick={addNewTask}
                type="button"
                className="btn btn-link btn-block text-dark font-weight-bold">
                  + Add Task
                </button>
            </div>
          </div>
        : null}
      </div>

      <RaciModal
        modalOpen={raciModalOpen}
        toggleRaciModal={toggleRaciModal}
        userId={raciModalUserId}
        task={raciModalTask}
      />

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

export default Owners;