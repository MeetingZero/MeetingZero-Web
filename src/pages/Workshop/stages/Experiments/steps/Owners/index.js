import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RaciMatrix from './RaciMatrix';
import ProTip from 'library/ProTip';
import AddTimeModal from 'pages/Workshop/library/AddTimeModal';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';
import * as votingActions from 'app/voting/actions';

const Owners = ({ showAddTimeModal }) => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(experimentsActions.getHypothesis(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  // Get winning solution
  React.useEffect(() => {
    dispatch(
      votingActions
      .calculateVotingResults(params.workshop_token, "SolutionResponse")
    );
  }, [dispatch, params.workshop_token]);

  const hypothesis = useSelector((state) => {
    return state.Experiments.hypothesis;
  });

  const starVotingResults = useSelector((state) => {
    return state.Voting.starVotingResults["SolutionResponse"];
  });

  const [addTimeModalVisible, setAddTimeModalVisible] = React.useState(false);

  React.useEffect(() => {
    const timeAdded = window.localStorage.getItem("timeAdded");

    if (showAddTimeModal && !timeAdded) {
      setAddTimeModalVisible(showAddTimeModal);
    }
  }, [showAddTimeModal]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Owners</h1>

      <h5 className="mb-4">Assigning responsibility to team members for this experiment.</h5>

      <div className="row mb-3">
        <div className="col-4">
          <blockquote>
            <div className="text-muted small">
              Winning Solution:
            </div>

            {starVotingResults ?
              <div>
                {starVotingResults.runoff_winner.resource.response_text}
              </div>
            : null}
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

      <RaciMatrix
        workshopToken={params.workshop_token}
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

      {addTimeModalVisible ?
        <AddTimeModal workshopToken={params.workshop_token} setAddTimeModalVisible={setAddTimeModalVisible} />
      : null}
    </React.Fragment>
  );
}

export default Owners;