import React from 'react';
import cn from 'classnames';

const CharacterCounter = (props) => {
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);

  React.useEffect(() => {
    if (props.inputString.length > props.maxChars) {
      setCharCountExceeded(true);

      if (props.onExceed) {
        props.onExceed(true);
      }
    } else if (props.inputString.length <= props.maxChars) {
      setCharCountExceeded(false);

      if (props.onExceed) {
        props.onExceed(false);
      }
    }
  }, [props]);

  return (
    <div className={cn(props.className, charCountExceeded ? 'text-danger' : null)}>
      {props.inputString.length}/{props.maxChars}
    </div>
  );
}

export default CharacterCounter;