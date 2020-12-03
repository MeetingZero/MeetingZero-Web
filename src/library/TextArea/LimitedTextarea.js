import React from 'react';
import cn from 'classnames';

import CharacterCounter from 'library/CharacterCounter';
import TextArea from 'library/TextArea';

const LimitedTextarea = ({
  formInstance,
  onUserInput,
  fieldName,
  placeholder,
  errorMessage,
  maxChars = 140
}) => {
  const [fieldText, setFieldText] = React.useState("");
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  return (
    <React.Fragment>
      <TextArea
        control={formInstance.control}
        register={formInstance.register({ required: true, maxLength: maxChars })}
        name={fieldName}
        placeholder={placeholder}
        className={cn("mb-1", charCountExceeded ? 'bg-scary' : '')}
        onUserInput={(userInput) => {
          setFieldText(userInput);

          if (onUserInput) {
            onUserInput(userInput);
          }
        }}
      />

      <div className="row">
        <div className="col-6">
          {formInstance.errors[fieldName] ?
            <div className="small text-danger">
              {errorMessage || `Please enter text of ${maxChars} characters or less`}
            </div>
          : null}
        </div>

        <div className="col-6">
          <CharacterCounter
            className="text-right"
            maxChars={maxChars}
            inputString={fieldText}
            onExceed={handleExceed}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default LimitedTextarea;