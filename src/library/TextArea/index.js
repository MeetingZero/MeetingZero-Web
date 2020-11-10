import React from 'react';
import { useWatch } from 'react-hook-form';
import cn from 'classnames';

const Textarea = ({
  control,
  register,
  name,
  className,
  placeholder,
  onUserInput,
  onFocus,
  onBlur,
  watchAll
}) => {
  const userInput = useWatch({
    control,
    name: watchAll ? undefined : name,
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
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

export default Textarea;