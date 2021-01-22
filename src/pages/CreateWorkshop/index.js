import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import cn from 'classnames';

import Button from 'library/Button';
import TagsInput from 'library/TagsInput';

import ProblemSolvingStepList from './ProblemSolvingStepList';
import GeneralTopic from './GeneralTopic';
import ExistingProblem from './ExistingProblem';
import ExistingProblems from './ExistingProblems';
import ExistingSolutions from './ExistingSolutions';
import ExistingSolution from './ExistingSolution';
import Preparation from './Preparation';
import HelperText from './HelperText';
import StepOverlay from './StepOverlay';

import * as workshopActions from 'app/workshop/actions';

import "./CreateWorkshop.scss";

const CreateWorkshop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formInstance = useForm();

  const [emails, setEmails] = React.useState([]);
  const [dateTimeSelected, setDateTimeSelected] = React.useState(null);
  const [showError, setShowError] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [problemSolvingStepSelected, setProblemSolvingStepSelected] = React.useState(null);
  const [showPssError, setShowPssError] = React.useState(false);
  const [workshopType, setWorkshopType] = React.useState("");
  const [pssConfigComplete, setPssConfigComplete] = React.useState(false);
  const [preparationComplete, setPreparationComplete] = React.useState(false);
  const [inviteComplete, setInviteComplete] = React.useState(false);

  const onSubmit = (formData) => {
    if (!problemSolvingStepSelected) {
      return setShowPssError(true);
    }
    
    if (emails.length < 2 || emails.length > 8) {
      setShowWarning(false);
      return setShowError(true);
    }

    const dateTimeSelectedUtc = moment(dateTimeSelected)
    .utc()
    .toISOString();

    if (!dateTimeSelected) {
      return;
    }

    return dispatch(workshopActions.createWorkshop(formData, emails, dateTimeSelectedUtc, problemSolvingStepSelected))
    .then(() => {
      history.push("/create-workshop-confirmation");
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("CREATING_NEW_WORKSHOP") >= 0;
  });

  const handleEmailChange = (emails) => {
    setShowError(false);
    setShowWarning(false);

    if (emails.length < 5) {
      setShowWarning(true);
    }

    return setEmails(emails);
  }

  const generalTopicComplete = () => {
    if (problemSolvingStepSelected === "GENERAL_TOPIC") {
      setPssConfigComplete(true);
    }
  }

  const conditionToShowGeneralTopic = problemSolvingStepSelected &&
    (
      problemSolvingStepSelected === "GENERAL_TOPIC"
      ||
      problemSolvingStepSelected === "MANY_EXISTING_PROBLEMS"
    );

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-7 vh-100 overflow-y-scroll">
          <div className="p-2">
            <form onSubmit={formInstance.handleSubmit(onSubmit)}>
              <div className="row mb-5">
                <div className="col-4"></div>

                <div className="col-4">
                  <h3 className="text-center font-weight-bold">
                    Create Workshop
                  </h3>
                </div>

                <div className="col-4">
                  <div className="text-right">
                    <Button href="/dashboard" text="Cancel" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <select
                  onChange={(event) => setWorkshopType(event.target.value)}
                  className="form-control"
                >
                  <option value="">Workshop type</option>
                  <option value="KICKOFF_EXPERIMENT">Kickoff experiment</option>
                </select>
              </div>

              <div className={cn(showPssError ? "mb-2" : "mb-4")}>
                <ProblemSolvingStepList
                  handleChange={(pssKey) => {
                    setProblemSolvingStepSelected(pssKey);
                    setShowPssError(false);
                  }}
                  showOverlay={workshopType === ""}
                />
              </div>

              {showPssError ?
                <div className="text-danger mb-2">
                  Please select a step
                </div>
              : null}

              {conditionToShowGeneralTopic ?
                <GeneralTopic
                  formInstance={formInstance}
                  generalTopicComplete={generalTopicComplete}
                />
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "ONE_EXISTING_PROBLEM" ?
                <ExistingProblem
                  formInstance={formInstance}
                  setPssConfigComplete={setPssConfigComplete}
                />
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "MANY_EXISTING_PROBLEMS" ?
                <ExistingProblems
                  formInstance={formInstance}
                  setPssConfigComplete={setPssConfigComplete}
                />
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "MANY_EXISTING_SOLUTIONS" ?
                <ExistingSolutions
                  formInstance={formInstance}
                />
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "ONE_EXISTING_SOLUTION" ?
                <ExistingSolution
                  formInstance={formInstance}
                />
              : null}

              <div className="position-relative mb-4">
                <StepOverlay
                  text="Pre-workshop prep"
                  show={!pssConfigComplete}
                />

                <Preparation
                  formInstance={formInstance}
                  setPreparationComplete={setPreparationComplete}
                />
              </div>

              <div className="position-relative mb-4">
                <StepOverlay
                  text="Invite attendees"
                  show={!preparationComplete}
                />
                
                <TagsInput
                  className="react-tagsinput-container mb-1"
                  value={emails}
                  onChange={handleEmailChange}
                  onlyUnique={true}
                  placeholder="Invite Attendees"
                />

                <div className="row mb-2">
                  <div className="col-6">
                      {showError ?
                        <div className="text-danger">
                          There must be between 3 and 9 people in this workshop
                        </div>
                      : null}

                      {showWarning ?
                        <div className="text-warning">
                          MeetingZero works best with more than 5 people
                        </div>
                      : null}
                  </div>

                  <div className="col-6">
                    <div className="text-right">
                      Separate emails with the tab or enter key
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => setInviteComplete(true)}
                    type="button"
                    className="btn btn-primary btn-rounded px-2 py-1 ml-2"
                    disabled={emails.length < 2}
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="position-relative">
                <StepOverlay
                  text="Select date and time"
                  show={!inviteComplete}
                />

                <div className="mb-2">
                  Select Date and Time
                </div>

                <div className="mb-5">
                  <DateTimePicker 
                    value={dateTimeSelected}
                    onChange={setDateTimeSelected}
                  />
                </div>
              </div>

              <div className="text-center mb-1">
                <Button
                  onClick={() => console.log(formInstance.getValues())}
                  type="button"
                  className="btn btn-primary px-5"
                  text="Create workshop"
                  loading={isLoading}
                />
              </div>

              <div className="mx-auto text-center text-muted small" style={{maxWidth: 200}}>
                Clicking create will send an invitation link and ID to members
              </div>
            </form>
          </div>
        </div>

        <div className="create-workshop-helper-column col-5">
          <HelperText
            pssKey={problemSolvingStepSelected}
            pssConfigComplete={pssConfigComplete}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateWorkshop;