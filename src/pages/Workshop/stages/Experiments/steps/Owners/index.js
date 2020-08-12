import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';

const Owners = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(experimentsActions.getHypothesis(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const hypothesis = useSelector((state) => {
    return state.Experiments.hypothesis;
  });

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Owners</h1>

      <h5 className="mb-4">Assigning responsibility to team members for this experiment</h5>

      <div className="row">
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
    </React.Fragment>
  );
}

export default Owners;