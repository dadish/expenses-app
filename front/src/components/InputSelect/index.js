import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const InputSelect = (props) => {
  const {
    label,
    choices,
    input,
    disabled,
    style,
    meta: {
      touched,
      error,
    },
  } = props;
  const { onChange, ...inputProps } = input;
  const options = choices.map(choice =>
    <MenuItem
      value={choice[0]}
      key={choice[0]}
      primaryText={choice[1] || choice[0]}
    />);
  return (
    <SelectField
      {...inputProps}
      floatingLabelText={label}
      errorText={touched && error}
      style={style}
      disabled={disabled}
      fullWidth
      onChange={(ev, index, value) => onChange(value)}
    >
      {options}
    </SelectField>
  );
};
InputSelect.propTypes = {
  label: PropTypes.string,
  choices: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputSelect;
