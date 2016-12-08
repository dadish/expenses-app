import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const InputPassword = (props) => {
  const { label, input, meta: { touched, error } } = props;
  return (
    <TextField
      type="password"
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
    />
  );
};

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputPassword;
