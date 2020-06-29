import React from 'react';
import ReactTagsInput from 'react-tagsinput';

import './TagsInput.scss';
import 'react-tagsinput/react-tagsinput.css';

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