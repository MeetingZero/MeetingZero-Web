import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-rangeslider';

import ProTip from 'library/ProTip';
import Button from 'library/Button';

import "react-rangeslider/lib/index.css";
import "./ImpactEffort.scss";

import * as solutionsActions from 'app/workshop/stages/solutions/actions';
import * as opportunityQuestionActions from 'app/workshop/stages/opportunity_question/actions';

const ImpactEffort = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [viewIndex, setViewIndex] = React.useState(0);
  const [impactValue, setImpactValue] = React.useState(5);
  const [effortValue, setEffortValue] = React.useState(5);

  React.useEffect(() => {
    dispatch(solutionsActions.getAllResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const handleSubmit = () => {
    dispatch(
      solutionsActions
      .setPriority(
        params.workshop_token,
        allSolutions[viewIndex].id,
        impactValue,
        effortValue
      )
    );
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVE_SOLUTION_PRIORITY") >= 0;
  });

  const allSolutions = useSelector((state) => {
    return state.Solutions.allSolutionsResponses;
  });

  React.useEffect(() => {
    if (allSolutions[viewIndex]) {
      if (allSolutions[viewIndex].my_solution_response_priority) {
        setImpactValue(allSolutions[viewIndex].my_solution_response_priority.impact_level);

        setEffortValue(allSolutions[viewIndex].my_solution_response_priority.effort_level);
      } else {
        setImpactValue(5);
        setEffortValue(5);
      }
    }
  }, [allSolutions, viewIndex]);

  React.useEffect(() => {
    for (let i = 0; i < allSolutions.length; i++) {
      if (!allSolutions[i].my_solution_response_priority) {
        return setViewIndex(i);
      }
    }

    return setViewIndex(allSolutions.length - 1);
  }, [allSolutions]);

  React.useEffect(() => {
    dispatch(opportunityQuestionActions.getResponse(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const opportunityQuestionResponse = useSelector((state) => {
    return state.OpportunityQuestion.opportunityQuestionResponse;
  });

  const sliderLabels = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10"
  };

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Evaluate Solutions</h1>

      <h5 className="mb-4">Grade each solution on how much impact it will have if implemented and how much efforit it will take to implement.</h5>

      {opportunityQuestionResponse ?
        <blockquote className="mb-5">
          <div className="text-muted small">
            Winning Opportunity:
          </div>

          <div>
            {opportunityQuestionResponse.response_text}
          </div>
        </blockquote>
      : null}

      {allSolutions.length > 1 ?
        <div className="row mb-1">
          <div className="col-6">
            <Button
              onClick={() => setViewIndex(viewIndex - 1)}
              text="Previous"
              className="btn btn-link mr-3"
              disabled={allSolutions[viewIndex - 1] === undefined}
            />
          </div>

          <div className="col-6 text-right">
            <Button
              onClick={() => setViewIndex(viewIndex + 1)}
              text="Forward"
              className="btn btn-link"
              disabled={allSolutions[viewIndex + 1] === undefined}
            />
          </div>
        </div>
      : null}

      {allSolutions[viewIndex] ?
        <React.Fragment>
          <div className="text-right mb-1">
            {viewIndex + 1}/{allSolutions.length}
          </div>

          <div className="border border-info rounded p-1 mb-5">
            {allSolutions[viewIndex].response_text}
          </div>

          <div className="row mb-5">
            <div className="col-6">
              <div className="ie-slider-container mb-7">
                <Slider
                  min={1}
                  max={10}
                  labels={sliderLabels}
                  value={impactValue}
                  tooltip={false}
                  onChange={setImpactValue}
                  className="ie-slider mb-2"
                />

                <div className="left-handle">
                  Low Impact
                </div>

                <div className="right-handle">
                  High Impact
                </div>
              </div>

              <div className="h5 text-center">
                Impact
              </div>
            </div>

            <div className="col-6">
              <div className="ie-slider-container mb-7">
                <Slider
                  min={1}
                  max={10}
                  labels={sliderLabels}
                  value={effortValue}
                  tooltip={false}
                  onChange={setEffortValue}
                  className="ie-slider mb-2"
                />

                <div className="left-handle">
                  Low Effort
                </div>

                <div className="right-handle">
                  High Effort
                </div>
              </div>

              <div className="h5 text-center">
                Effort
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              className="btn btn-primary px-4"
              text={allSolutions[viewIndex].my_solution_response_priority === null ? "Submit" : "Update"}
              loading={isLoading}
            />
          </div>
        </React.Fragment>
      : null}

      <ProTip
        mainText="Think about impact first, and then focus your thinking on effort. If you get stuck, go with your gut."
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

export default ImpactEffort;