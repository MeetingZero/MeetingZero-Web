import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import Button from '../../../../../../library/Button';
import CharacterCounter from '../../../../../../library/CharacterCounter';

const Responses = () => {
  const { register, handleSubmit, errors } = useForm();

  const [response, setResponse] = React.useState("");
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);

  const onSubmit = (formData) => {
    console.log(formData);
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Start with what's working</h1>

      <h5 className="mb-4">Up to three short statements of what's going well.</h5>

      <div className="mb-2">
        <Button text="Previous" className="btn btn-link" />

        <Button text="Forward" className="btn btn-link ml-3" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          onChange={(event) => setResponse(event.target.value)}
          ref={register({ required: true, maxLength: 140 })}
          name="response"
          className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)}
          placeholder="Keep it positive"
        />

        {errors.response ?
          <div className="small text-danger">
            Please enter a response of 140 characters or less
          </div>
        : null}

        <div className="text-right">
          <CharacterCounter
            inputString={response}
            maxChars={140}
            onExceed={handleExceed}
          />
        </div>

        <div>
          <Button type="submit" text="Submit" className="btn btn-primary px-5 rounded" />
        </div>
      </form>
    </React.Fragment>
  );
}

export default Responses;