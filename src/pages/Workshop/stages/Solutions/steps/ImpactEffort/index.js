import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import ProTip from 'library/ProTip';

import "./ImpactEffort.scss";

import * as solutionsActions from 'app/workshop/stages/solutions/actions';

const ImpactEffort = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [newItemIndex, setNewItemIndex] = React.useState(null);
  const [currentDraggedSolution, setCurrentDraggedSolution] = React.useState(null);

  React.useEffect(() => {
    dispatch(solutionsActions.getAllResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const solutions = useSelector((state) => {
    return state.Solutions.allSolutionsResponses;
  });

  React.useEffect(() => {
    for (let i = 0; i < solutions.length; i++) {
      if (!solutions[i].solution_priority) {
        return setNewItemIndex(i);
      }
    }

    return setNewItemIndex(null);
  }, [solutions]);

  const handleDragStart = (solution) => {
    return setCurrentDraggedSolution(solution);
  }

  const handleDrop = (solution, priority) => {
    // If priority is already set to drop target, do nothing
    if (solution.solution_priority && solution.solution_priority === priority) {
      return;
    }

    dispatch(solutionsActions.setPriority(params.workshop_token, solution.id, priority));
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Evaluate Solutions</h1>

      <h5 className="mb-7">Drag and drop each solution (red dot) where you feel it's appropriate based off the impact it will have for your customers and for the business and what the effort needed will be to implement it.</h5>

      {solutions.length > 0 && newItemIndex !== null ?
        <div className="mb-7">
          <ImpactEffortItem
            number={newItemIndex + 1}
            solution={solutions[newItemIndex]}
            showText={true}
            onDragStart={handleDragStart}
          />
        </div>
      : null}

      <div className="impact-effort-chart">
        <div className="title-top">
          High Impact
        </div>

        <div className="title-left">
          Low Effort
        </div>

        <div className="title-right">
          High Effort
        </div>

        <div className="title-bottom">
          Low Impact
        </div>

        <div className="impact-effort-chart-row">
          <div
            className="impact-effort-chart-quadrant border-right border-bottom border-dark"
            onDrop={() => handleDrop(currentDraggedSolution, "Do Now")}
            onDragEnter={(event) => event.preventDefault()}
            onDragOver={(event) => event.preventDefault()}
          >
            <span>Do Now</span>

            <div className="d-flex flex-wrap">
              {solutions.map((solution, index) => {
                if (solution.solution_priority === "Do Now") {
                  return (
                    <div key={solution.id} className="p-1">
                      <ImpactEffortItem
                        number={index + 1}
                        solution={solution}
                        onDragStart={handleDragStart}
                        position="top"
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>

          <div
            className="impact-effort-chart-quadrant border-left border-bottom border-dark"
            onDrop={() => handleDrop(currentDraggedSolution, "Make a Project")}
            onDragEnter={(event) => event.preventDefault()}
            onDragOver={(event) => event.preventDefault()}
          >
            <span>Make a Project</span>

            <div className="d-flex flex-wrap">
              {solutions.map((solution, index) => {
                if (solution.solution_priority === "Make a Project") {
                  return (
                    <div key={solution.id} className="p-1">
                      <ImpactEffortItem
                        number={index + 1}
                        solution={solution}
                        onDragStart={handleDragStart}
                        position="top"
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>

        <div className="impact-effort-chart-row">
          <div
            className="impact-effort-chart-quadrant border-right border-top border-dark"
            onDrop={() => handleDrop(currentDraggedSolution, "Make a Task")}
            onDragEnter={(event) => event.preventDefault()}
            onDragOver={(event) => event.preventDefault()}
          >
            <span>Make a Task</span>

            <div className="d-flex flex-wrap">
              {solutions.map((solution, index) => {
                if (solution.solution_priority === "Make a Task") {
                  return (
                    <div key={solution.id} className="p-1">
                      <ImpactEffortItem
                        number={index + 1}
                        solution={solution}
                        onDragStart={handleDragStart}
                        position="top"
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>

          <div
            className="impact-effort-chart-quadrant border-left border-top border-dark"
            onDrop={() => handleDrop(currentDraggedSolution, "Forget for Now")}
            onDragEnter={(event) => event.preventDefault()}
            onDragOver={(event) => event.preventDefault()}
          >
            <span>Forget for Now</span>

            <div className="d-flex flex-wrap">
              {solutions.map((solution, index) => {
                if (solution.solution_priority === "Forget for Now") {
                  return (
                    <div key={solution.id} className="p-1">
                      <ImpactEffortItem
                        number={index + 1}
                        solution={solution}
                        onDragStart={handleDragStart}
                        position="top"
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      <ProTip
        mainText="Before you place a solution into a quandrant, think about the impact (y-axis), then focus your thinking on effort (x-axis)."
        calloutTitle="Definitions"
        calloutText={
          <React.Fragment>
            <p>
              <strong>Impact:</strong> How well the solution serves your users in ways that also meet the needs of the business.
            </p>

            <p>
              <strong>Effort:</strong> The higher the effort, the longer the solution will take to deliver value to your users.
            </p>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

const ImpactEffortItem = ({ position = "right", number, solution, showText, onDragStart }) => {
  const [shouldShowText, setShowText] = React.useState(false);

  React.useEffect(() => {
    if (showText !== undefined) {
      setShowText(showText);
    }
  }, [showText]);

  return (
    <div
      className="ie-item-container"
    >
      <div
        onClick={() => setShowText(!shouldShowText)}
        className="ie-item"
        draggable
        onDragStart={() => {
          setShowText(false);
          onDragStart(solution);
        }}
      >
        {number}
      </div>

      <CSSTransition
        in={shouldShowText}
        timeout={200}
        classNames="ie-content"
        unmountOnExit
      >
        <div className={cn("ie-content", `position-${position}`)}>
          {solution.response_text}
        </div>
      </CSSTransition>
    </div>
  );
}

export default ImpactEffort;