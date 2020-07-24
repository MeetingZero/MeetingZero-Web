import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as whatIsWorkingActions from 'app/workshop/stages/what_is_working/actions';

const Review = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      whatIsWorkingActions
      .getAllResponses(params.workshop_token)
    );
  }, [dispatch, params.workshop_token]);

  const allWhatIsWorkingResponses = useSelector((state) => {
    return state.WhatIsWorking.allWhatIsWorkingResponses;
  });

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">What people think is working</h1>

      <h5 className="mb-5">See what your teammates said about how you all are succeeding.</h5>

      {allWhatIsWorkingResponses.map((response) => {
        return (
          <div key={response.id} className="feather-card shadow mb-3">
            {response.response_text}
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Review;