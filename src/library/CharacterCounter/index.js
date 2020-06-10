import React from 'react';
import cn from 'classnames';

const CharacterCounter = ({
  className,
  inputString,
  maxChars,
  warningChars = 100,
  onExceed
}) => {
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [charWarning, setCharWarning] = React.useState(false);

  React.useEffect(() => {
    if (inputString.length > maxChars) {
      setCharCountExceeded(true);
      setCharWarning(false);

      if (onExceed) {
        onExceed(true);
      }
    } else if (inputString.length >= warningChars && inputString.length <= maxChars) {
      setCharCountExceeded(false);
      setCharWarning(true);

      if (onExceed) {
        onExceed(false);
      }
    } else if (inputString.length < warningChars) {
      setCharCountExceeded(false);
      setCharWarning(false);

      if (onExceed) {
        onExceed(false);
      }
    }
  }, [inputString]);

  return (
    <div className={cn(className, charCountExceeded ? 'text-danger' : null, charWarning ? 'text-warning' : null)}>
      {inputString.length}/{maxChars}
    </div>
  );
}

export default CharacterCounter;