import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'components/DoneIcon';
import { green400 } from 'material-ui/styles/colors';
import { save } from '../Item/actions';

export const handleClick = (values, dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(save(values.set('rej', reject).set('res', resolve)));
  });


const ActionIcons = ({ saving, handleSubmit }) => {
  if (saving) {
    return (
      <CircularProgress
        size={32}
        thickness={3}
        color={green400}
        style={{
          margin: '8px',
        }}
      />
    );
  }

  return (
    <DoneIcon
      style={{
        height: '48px',
      }}
      onClick={handleSubmit(handleClick)}
    />
  );
};

ActionIcons.propTypes = {
  saving: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};

export default ActionIcons;
