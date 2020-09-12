import React from 'react';
import { useWatch } from 'react-hook-form';
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
    name: name
  });

  React.useEffect(() => {
    if (onUserInput) {
      onUserInput(userInput);
    }
  }, [userInput]);

  return (
    <textarea
      ref={register}
      name={name}
      className={cn("form-control", className)}
      placeholder={placeholder}
    />
  );
}

export default Textarea;