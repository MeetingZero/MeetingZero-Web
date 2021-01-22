import React from 'react';
import { useWatch, useFieldArray } from 'react-hook-form';
import cn from 'classnames';

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
  startingNumInputs = 1
}) => {
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
  }, [userInput, onUserInput]);

  React.useEffect(() => {
    let startingValueArray = [];

    for (let i = 0; i < startingNumInputs; i++) {
      startingValueArray.push({
        value: ""
      });
    }

    append(startingValueArray);
  }, [append, startingNumInputs]);

  return (
    <React.Fragment>
      {fields.map((field, index) => (
        <textarea
          key={field.id}
          name={`${name}[${index}].value`}
          ref={formInstance.register()}
          defaultValue={field.value}
          className={cn("form-control", className)}
          placeholder={placeholder}
        />
      ))}
    </React.Fragment>
  );
}

export default Textarea;
