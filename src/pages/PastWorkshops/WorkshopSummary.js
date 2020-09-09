import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RaciMatrix from 'pages/Workshop/stages/Experiments/steps/Owners/RaciMatrix';

import * as workshopActions from 'app/workshop/actions';

const WorkshopSummary = ({ workshop }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      workshopActions
      .getWorkshopSummary(workshop.workshop_token)
    );
  }, [dispatch, workshop.workshop_token]);

  const workshopSummary = useSelector((state) => {
    return state.Workshop.workshopSummary;
  });

  if (!workshopSummary) {
    return null;
  }

  return (
    <div className="p-5">
      {workshopSummary.winning_problem ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Original Problem</h5>

          <div className="feather-card shadow mb-8">
            {workshopSummary.winning_problem.response_text}
          </div>
        </React.Fragment>
      : null}

      {workshopSummary.winning_reframed_problem ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Reframed Problem</h5>

          <div className="feather-card shadow mb-8">
            {workshopSummary.winning_reframed_problem.response_text}
          </div>
        </React.Fragment>
      : null}

      {workshopSummary.opportunity_question ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Opportunity Question</h5>

          <div className="feather-card shadow mb-8">
            {workshopSummary.opportunity_question.response_text}
          </div>
        </React.Fragment>
      : null}

      {workshopSummary.experiment_hypothesis ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Hypothesis</h5>

          <div className="feather-card shadow mb-8">
            {workshopSummary.experiment_hypothesis.we_believe_text} {workshopSummary.experiment_hypothesis.will_result_in_text} {workshopSummary.experiment_hypothesis.succeeded_when_text}
          </div>
        </React.Fragment>
      : null}

      <h5 className="font-weight-normal mb-2">RACI Matrix</h5>

      <div>
        <RaciMatrix
          workshopToken={workshop.workshop_token}
          editable={false}
        />
      </div>
    </div>
  );
}

export default WorkshopSummary;
