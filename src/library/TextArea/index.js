import React from 'react';
import { useWatch, useFieldArray } from 'react-hook-form';
import cn from 'classnames';

import "./TextArea.scss";

const Textarea = ({
  control,
  register,
  name,
  className,
  placeholder,
  onUserInput
}) => {
  const userInput = useWatch({
    control,
    name: name,
    defaultValue: ""
  });

  React.useEffect(() => {
    if (onUserInput) {
      onUserInput(userInput);
    }
  }, [userInput, onUserInput]);

  return (
    <textarea
      ref={register}
      name={name}
      className={cn("form-control", className)}
      placeholder={placeholder}
    />
  );
}

export const DynamicTextarea = ({
  formInstance,
  name,
  className,
  placeholder,
  onUserInput,
  onSubmit,
  startingNumInputs = 1,
  removable = false
}) => {
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const userInput = useWatch({
    control: formInstance.control,
    name: name,
    defaultValue: ""
  });

  const { fields, append, remove } = useFieldArray({
    control: formInstance.control,
    name: name
  });

  React.useEffect(() => {
    if (onUserInput) {
      onUserInput(userInput);
    }

    if (userInput && userInput[0].value.length) {
      setSubmitDisabled(false);
    }
  }, [userInput, onUserInput]);

  React.useEffect(() => {
    let startingValueArray = [];

    for (let i = 0; i < startingNumInputs; i++) {
      startingValueArray.push({
        value: ""
      });
    }

    append(startingValueArray, false);
  }, [append, startingNumInputs]);

  return (
    <React.Fragment>
      {fields.map((field, index) => (
        <div key={field.id} className={cn(removable ? "removable-textarea" : null)}>
          {removable ?
            <i
              onClick={() => remove(index)}
              className="fa fa-trash remove-toggle"
            />
          : null}

          <textarea
            key={field.id}
            name={`${name}[${index}].value`}
            ref={formInstance.register()}
            defaultValue={field.value}
            className={cn("form-control", className)}
            placeholder={typeof placeholder === "string" ? placeholder : placeholder(index)}
          />
        </div>
      ))}

      <div className="text-right">
        <button
          onClick={() => append({value: ""}, true)}
          type="button"
          className="btn btn-secondary btn-rounded px-2 py-1"
        >
          Add More
          <i className="fa fa-plus ml-1" />
        </button>

        {onSubmit ?
          <button
            onClick={onSubmit}
            type="button"
            className="btn btn-primary btn-rounded px-2 py-1 ml-2"
            disabled={submitDisabled}
          >
            Submit
          </button>
        : null}
      </div>
    </React.Fragment>
  );
}

export default Textarea;
