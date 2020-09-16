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
    dispatch(workshopActions.getWorkshop(workshopToken));
  }, [dispatch, workshopToken]);
  
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

  const [leftBound, setLeftBound] = React.useState(0);
  const [rightBound, setRightBound] = React.useState(5);

  const toggleForward = () => {
    const slicedMembers = workshopMembers
    .slice(leftBound + 5, rightBound + 5);

    if (!slicedMembers[0]) {
      return false;
    }

    setLeftBound(leftBound + 5);
    setRightBound(rightBound + 5);
  }

  const toggleBackward = () => {
    const slicedMembers = workshopMembers
    .slice(leftBound - 5, rightBound - 5);

    if (!slicedMembers[0]) {
      return false;
    }

    setLeftBound(leftBound - 5);
    setRightBound(rightBound - 5);
  }

  const mappableMembers = workshopMembers.slice(leftBound, rightBound);

  // Don't show this if workshop isn't loaded
  if (!workshop) {
    return null;
  }

  // If the RACI matrix isn't editable and there aren't any tasks just don't show it
  if (!editable && (experimentTasks[0] === null || experimentTasks[0] === undefined)) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="raci-matrix">
        <div className="row">
          <div className="col-3"></div>

          {mappableMembers.map((mm, index) => {
            return (
              <div key={mm.id} className={`col-3 text-center border border-top-0 py-1 ${index + 1 < mappableMembers.length ? "border-right-0" : ""}`}>
                {workshopMembers.length > 5 && index === 0 ?
                  <i onClick={toggleBackward} className="fa fa-chevron-left raci-toggle-left text-muted" />
                : null}

                {workshopMembers.length > 5 && index === mappableMembers.length - 1 ?
                  <i onClick={toggleForward} className="fa fa-chevron-right raci-toggle-right text-muted" />
                : null}

                <strong>{mm.user.first_name}</strong>
              </div>
            );
          })}
        </div>

        {experimentTasks.map((experimentTask, index) => {
          return (
            <TaskAssignments
              key={index}
              existingTask={experimentTask}
              mappableMembers={mappableMembers}
              toggleRaciModal={toggleRaciModal}
              editable={editable}
            />
          );
        })}

        {workshop.is_host && editable ?
          <div className="row">
            <div className="col-3">
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
