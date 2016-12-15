import React, { PropTypes } from 'react';
import TimePicker from 'material-ui/TimePicker';

export const handleChange = (change, val) => (ev, newValue) => {
  const value = val ? new Date(val) : new Date();
  value.setHours(newValue.getHours(), newValue.getMinutes());
  return change(value);
};

const TableInputDateTime = (props) => {
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
    <TimePicker
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

TableInputDateTime.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default TableInputDateTime;
