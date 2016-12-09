import React, { PropTypes } from 'react';
import TimePicker from 'material-ui/TimePicker';

const handleChange = (change, value) => (ev, newValue) => {
  value.setHours(newValue.getHours(), newValue.getMinutes());
  return change(value.toISOString());
};

const TableInputDateTime = (props) => {
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
    <TimePicker
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

TableInputDateTime.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default TableInputDateTime;
