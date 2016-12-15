import React, { PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';

export const handleChange = (change, val) => (ev, newValue) => {
  const value = val ? new Date(val) : new Date();
  value.setFullYear(newValue.getFullYear());
  value.setMonth(newValue.getMonth());
  value.setDate(newValue.getDate());
  return change(value);
};

const InputDate = (props) => {
  const {
    input,
    disabled,
    style,
    label,
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
      floatingLabelText={label}
      textFieldStyle={{
        width: '100%',
        fontSize: '14px',
      }}
      style={style}
      disabled={disabled}
      value={input.value ? new Date(input.value) : null}
      onChange={handleChange(onChange, input.value)}
    />
  );
};

InputDate.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputDate;
