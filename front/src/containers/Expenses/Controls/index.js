import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { blue400 } from 'material-ui/styles/colors';
import { create } from '../Item/actions';

export const ExpensesControls = ({ handleAdd }) => (
  <div
    style={{
      textAlign: 'right',
      marginBottom: '16px',
    }}
  >
    <FlatButton
      primary
      label="Add"
      labelStyle={{
        color: blue400,
      }}
      onClick={handleAdd}
    />
  </div>
);

ExpensesControls.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  handleAdd: () => dispatch(create({
    edit: true,
  })),
});

export default connect(null, mapDispatchToProps)(ExpensesControls);
