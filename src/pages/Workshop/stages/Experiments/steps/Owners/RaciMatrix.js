import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TaskAssignments from './TaskAssignments';
import RaciModal from './RaciModal';

import './RaciMatrix.scss';

import * as workshopActions from 'app/workshop/actions';
import * as experimentsActions from 'app/workshop/stages/experiments/actions';
import experimentsSlice from 'app/workshop/stages/experiments/slice';

const RaciMatrix = ({ workshopToken, editable = true }) => {
  const dispatch = useDispatch();

  const [raciModalOpen, setRaciModalOpen] = React.useState(false);
  const [raciModalUserId, setRaciModalUserId] = React.useState(null);
  const [raciModalTask, setRaciModalTask] = React.useState(null);

  React.useEffect(() => {
    dispatch(workshopActions.getWorkshopMembers(workshopToken));
  }, [dispatch, workshopToken]);

  React.useEffect(() => {
    dispatch(experimentsActions.getExperimentTasks(workshopToken));
  }, [dispatch, workshopToken]);

  const addNewTask = () => {
    dispatch(experimentsSlice.actions.addBlankExperimentTask());
  }

  const toggleRaciModal = (isOpen, userId, task) => {
    setRaciModalUserId(userId);
    setRaciModalTask(task);
    setRaciModalOpen(isOpen);
  }

  const workshopMembers = useSelector((state) => {
    return state.Workshop.workshopMembers;
  });

  const experimentTasks = useSelector((state) => {
    return state.Experiments.experimentTasks;
  });

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  return (
    <React.Fragment>
      <div className="raci-matrix h-100">
        <div className="row">
          <div className="col-2"></div>

          {workshopMembers.map((wm, index) => {
            return (
              <div key={wm.id} className={`col-2 text-center border border-top-0 py-1 ${index + 1 < workshopMembers.length ? "border-right-0" : null}`}>
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
              editable={editable}
            />
          );
        })}

        {workshop.is_host && editable ?
          <div className="row">
            <div className="col-2">
              <button
                onClick={addNewTask}
                type="button"
                className="btn btn-link btn-block btn-square text-dark font-weight-bold">
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
    </React.Fragment>
  );
}

export default RaciMatrix;