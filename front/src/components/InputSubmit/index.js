import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { SUBMIT_START } from 'containers/App/constants';

const InputSubmit = ({ input, label, primary }) => {
  let node;
  if (input.value === SUBMIT_START) {
    node = (
      <CircularProgress
        style={{
          margin: '8px',
        }}
        size={25}
        thickness={2.5}
      />
    );
  } else {
    node = (
      <FlatButton
        type="submit"
        primary={primary !== undefined || true}
        label={label}
        {...input}
      />
    );
  }

  return node;
};

InputSubmit.propTypes = {
  primary: PropTypes.bool,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
};

export default InputSubmit;
