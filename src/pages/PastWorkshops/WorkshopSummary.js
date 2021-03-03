import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RaciMatrix from 'pages/Workshop/stages/Experiments/steps/Owners/RaciMatrix';
import PulseLoader from 'library/PulseLoader';
import EmptyWorkshop from './EmptyWorkshop';
import ResultItems from './ResultItems';

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

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("GET_WORKSHOP_SUMMARY") >= 0;
  });

  if (!workshopSummary || isLoading) {
    return (
      <PulseLoader
        size="50rem"
      />
    );
  }

  // Show empty state for workshop without any results
  if (!workshopSummary.winning_reframed_problem && !workshopSummary.opportunity_question && !workshopSummary.winning_solution && !workshopSummary.experiment_hypothesis && workshopSummary.experiment_tasks.length === 0) {
    return (
      <EmptyWorkshop />
    );
  }

  return (
    <div className="p-5">
      {workshopSummary.winning_reframed_problem ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Winning Problem</h5>

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

      {workshopSummary.winning_solution ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Winning Solution</h5>

          <div className="feather-card shadow mb-8">
            {workshopSummary.winning_solution.response_text}
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

      {workshopSummary.experiment_tasks.length > 0 ?
        <React.Fragment>
          <h5 className="font-weight-normal mb-2">Owners and Tasks</h5>

          <div className="mb-8">
            <RaciMatrix
              workshopToken={workshop.workshop_token}
              editable={false}
            />
          </div>
        </React.Fragment>
      : null}

      <ResultItems workshopSummary={workshopSummary} />
    </div>
  );
}

export default WorkshopSummary;
