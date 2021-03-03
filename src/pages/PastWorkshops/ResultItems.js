import React from 'react';
import CollapsibleResult from './CollapsibleResult';

const ResultItems = ({workshopSummary}) => {
  return (
    <React.Fragment>
      <h5 className="font-weight-normal mb-2">All Results</h5>
      <div className="mb-8">
        {workshopSummary.what_is_working_responses ? 
          <CollapsibleResult title="What's Working Submissions" items={workshopSummary.what_is_working_responses} /> 
        : null}
        {workshopSummary.problem_responses ?
          <CollapsibleResult title="Original Problem Submissions" items={workshopSummary.problem_responses} />
        : null}
        {workshopSummary.reframe_problem_responses ?
          <CollapsibleResult title="Reframed Problem Submissions" items={workshopSummary.reframe_problem_responses} />
        : null}
        {workshopSummary.solution_responses ?
          <CollapsibleResult title="Solution Submissions" items={workshopSummary.solution_responses} group={true} />
        : null}
      </div>
    </React.Fragment>
  )
}

export default ResultItems