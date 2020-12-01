import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import Button from 'library/Button';
import CharacterCounter from 'library/CharacterCounter';
import TagsInput from 'library/TagsInput';
import TextArea from 'library/TextArea';

import * as workshopActions from 'app/workshop/actions';

import "./CreateWorkshop.scss";

const CreateWorkshop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();

  const [emails, setEmails] = React.useState([]);
  const [workshopPurpose, setWorkshopPurpose] = React.useState("");
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [dateTimeSelected, setDateTimeSelected] = React.useState(null);
  const [showError, setShowError] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);

  const onSubmit = (formData) => {
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

    return dispatch(workshopActions.createWorkshop(formData, emails, dateTimeSelectedUtc))
    .then(() => {
      history.push("/create-workshop-confirmation");
    });
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
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

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-8">
          <div className="p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <TextArea
                control={control}
                register={register({ required: true, maxLength: 140 })}
                name="purpose"
                placeholder="State a broad topic..."
                className={cn("mb-1", charCountExceeded ? 'bg-scary' : '')}
                onUserInput={(userInput) => setWorkshopPurpose(userInput)}
              />

              <div className="row mb-10">
                <div className="col-6">
                  {errors.purpose ?
                    <div className="small text-danger">
                      Please enter a workshop name of 140 characters or less
                    </div>
                  : null}
                </div>

                <div className="col-6">
                  <CharacterCounter
                    className="text-right"
                    maxChars={140}
                    inputString={workshopPurpose}
                    onExceed={handleExceed}
                  />
                </div>
              </div>

              <TagsInput
                className="form-control border-top-0 border-left-0 border-right-0 rounded-0 mb-1"
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
                  <div className="text-right mb-2">
                    Separate emails with the tab or enter key
                  </div>
                </div>
              </div>

              <div className="mb-2">
                Select Date and Time
              </div>

              <div className="mb-5">
                <DateTimePicker 
                  value={dateTimeSelected}
                  onChange={setDateTimeSelected}
                />
              </div>

              <div className="text-center mb-1">
                <Button type="submit" className="btn btn-primary px-5" text="Create workshop" loading={isLoading} />
              </div>

              <div className="mx-auto text-center text-muted small" style={{maxWidth: 200}}>
                Clicking create will send an invitation link and ID to members
              </div>
            </form>
          </div>
        </div>

        <div className="create-workshop-helper-column col-4 vh-100">
          Column Here
        </div>
      </div>
    </div>
  );
}

export default CreateWorkshop;