import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';
import CharacterCounter from '../../library/CharacterCounter';

const CreateWorkshop = () => {
  const { register, handleSubmit, errors, setError } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  }

  const [workshopPurpose, setWorkshopPurpose] = React.useState("");
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);

  const handleChange = (event) => {
    setWorkshopPurpose(event.target.value);
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right mb-5">
          <Button href="/join-workshop" text="Cancel" />
        </div>

        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-center">
              Create Workshop
            </div>

            <textarea onChange={handleChange} ref={register({ required: true, maxLength: 140 })} name="purpose" className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)} placeholder="Purpose of workshop..."></textarea>

            <div className="row mb-10">
              <div className="col-6">
                { errors.purpose ?
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

            <input type="text" className="form-control border-top-0 border-left-0 border-right-0 rounded-0 mb-1" placeholder="Invite Attendees" />

            <div className="text-right mb-5">
              Separate emails with a comma
            </div>

            <div className="text-center mb-1">
              <Button type="submit" className="btn btn-primary px-5" text="Create workshop" />
            </div>

            <div className="mx-auto text-center text-muted small" style={{maxWidth: 200}}>
              Clicking create will send an invitation link and ID to members
            </div>
          </form>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default CreateWorkshop;