import React, { PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';

const handleChange = (change, value) => (ev, newValue) => {
  value.setFullYear(newValue.getFullYear());
  value.setMonth(newValue.getMonth());
  value.setDate(newValue.getDate());
  return change(value.toISOString());
};

const InputDate = (props) => {
  const {
    input,
    disabled,
    style,
    meta:
    {
      touched,
      error,
    },
  } = props;
  // we do not pass onBlur handler to DatePicker component
  // because somehow it messes up the events & state
  // also the onChange handlers behavior in DatePicker is
  // different so we rewrite it.
  // see https://github.com/erikras/redux-form-material-ui/blob/master/src/DatePicker.js
  const { onBlur, onChange, ...inputProps } = input; // eslint-disable-line no-unused-vars
  return (
    <DatePicker
      {...inputProps}
      errorText={touched && error}
      textFieldStyle={{
        width: '100%',
      }}
      style={style}
      disabled={disabled}
      value={new Date(input.value)}
      onChange={handleChange(input.onChange, new Date(input.value))}
    />
  );
};

InputDate.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputDate;
