import React from 'react';
import ReactTagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';
import './TagsInput.scss';

const TagsInput = (props) => {
  return (
    <ReactTagsInput
      {...props}
      tagProps={{className: 'react-tagsinput-tag'}}
      inputProps={{className: 'react-tagsinput-input-field', placeholder: props.placeholder}}
      focusedClassName=""
    />
  );
}

export default TagsInput;