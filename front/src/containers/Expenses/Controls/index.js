import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { blue400 } from 'material-ui/styles/colors';
import { create } from '../Item/actions';
import { toggle as toggleFilter } from '../Filter/actions';

export const ExpensesControls = ({ handleAdd, handleFilter }) => (
  <div
    style={{
      textAlign: 'right',
      marginBottom: '16px',
    }}
  >
    <FlatButton
      primary
      label="Filter"
      labelStyle={{
        color: blue400,
      }}
      onClick={handleFilter}
    />
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
  handleFilter: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  handleAdd: () => dispatch(create({
    edit: true,
  })),
  handleFilter: () => dispatch(toggleFilter()),
});

export default connect(null, mapDispatchToProps)(ExpensesControls);
