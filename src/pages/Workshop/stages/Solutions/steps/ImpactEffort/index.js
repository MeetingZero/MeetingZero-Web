import React from 'react';

import "./ImpactEffort.scss";

const ImpactEffort = () => {
  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Evaluate Solutions</h1>

      <h5 className="mb-10">Drag and drop each solution (red dot) where you feel it's appropriate based off the impact it will have for your customers and for the business and what the effort needed will be to implement it.</h5>

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
          <div className="impact-effort-chart-quadrant border-right border-bottom border-dark">
            <span>Do Now</span>
          </div>

          <div className="impact-effort-chart-quadrant border-left border-bottom border-dark">
            <span>Make a Project</span>
          </div>
        </div>

        <div className="impact-effort-chart-row">
          <div className="impact-effort-chart-quadrant border-right border-top border-dark">
            <span>Make a Task</span>
          </div>

          <div className="impact-effort-chart-quadrant border-left border-top border-dark">
            <span>Forget for Now</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ImpactEffort;