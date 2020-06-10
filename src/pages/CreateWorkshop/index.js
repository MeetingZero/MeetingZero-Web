import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';
import CharacterCounter from '../../library/CharacterCounter';

const CreateWorkshop = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (formData) => {

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

            <textarea onChange={handleChange} ref={register({ required: true, maxLength: 140 })} name="workshop_name" className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)} placeholder="Purpose of workshop..."></textarea>

            <div className="row mb-2">
              <div className="col-6">
                { errors.workshop_name ?
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

            <div className="text-center">
              <Button type="submit" className="btn btn-primary px-5" text="Create workshop" />
            </div>
          </form>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default CreateWorkshop;