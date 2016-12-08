import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const InputEmail = (props) => {
  const {
    label,
    input,
    disabled,
    style,
    autofocus,
    meta:
    {
      touched,
      error,
    },
  } = props;
  return (
    <TextField
      {...input}
      type="email"
      floatingLabelText={label}
      errorText={touched && error}
      disabled={disabled}
      style={style}
      autoFocus={autofocus}
    />
  );
};
InputEmail.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  autofocus: PropTypes.bool,
  style: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputEmail;
