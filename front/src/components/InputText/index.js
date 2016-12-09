import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const InputText = (props) => {
  const {
    label,
    input,
    disabled,
    autofocus,
    style,
    meta: {
      touched,
      error,
    },
  } = props;
  return (
    <TextField
      {...input}
      type="text"
      floatingLabelText={label}
      errorText={touched && error}
      style={style}
      disabled={disabled}
      autoFocus={autofocus}
    />
  );
};
InputText.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  autofocus: PropTypes.bool,
  style: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputText;
