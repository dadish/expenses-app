import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'components/DoneIcon';
import CancelIcon from 'components/CancelIcon';
import { green400 } from 'material-ui/styles/colors';
import { save, editModeOff } from 'containers/Expenses/Item/actions';

const style = {
  display: 'flex',
  justifyContent: 'space-around',
};

export const Icons = (props) => {
  const {
    expense,
    handleSubmit,
    handleCancel,
    handleDone,
  } = props;
  if (expense.get('saving')) {
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
    <div style={style}>
      <DoneIcon
        style={{
          height: '48px',
        }}
        onClick={handleSubmit(handleDone)}
      />
      <CancelIcon
        style={{
          height: '48px',
        }}
        onClick={handleCancel}
      />
    </div>
  );
};

Icons.propTypes = {
  expense: PropTypes.instanceOf(Map).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDone: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export const mapDispatchToProps = (dispatch, { expense }) => ({
  handleCancel: () => dispatch(editModeOff(expense)),
  handleDone: values => new Promise((resolve, reject) => {
    dispatch(save(values.set('rej', reject).set('res', resolve)));
  }),
});

export default connect(null, mapDispatchToProps)(Icons);
