import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import FlatButton from 'material-ui/FlatButton';
import { blue400 } from 'material-ui/styles/colors';
import Pagination from 'react-ultimate-pagination-material-ui';
import { create } from '../Item/actions';
import { selectPaginationData } from '../selectors';
import { setCurrentPage } from '../actions';
import { loadList } from '../List/actions';
import { toggleFilter } from '../Filter/actions';

export const ExpensesControls = ({ handleAdd, handleFilter, handlePageChange, paginationData }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
    }}
  >
    <Pagination
      {...paginationData}
      onChange={handlePageChange}
    />
    <div>
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
  </div>
);

ExpensesControls.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  paginationData: PropTypes.object.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  paginationData: selectPaginationData(),
});

export const mapDispatchToProps = dispatch => ({
  handleAdd: () => dispatch(create({
    edit: true,
  })),
  handleFilter: () => dispatch(toggleFilter()),
  handlePageChange: (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(loadList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesControls);
