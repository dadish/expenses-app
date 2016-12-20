import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Pagination from 'react-ultimate-pagination-material-ui';
import { selectPaginationData } from '../selectors';
import { setCurrentPage } from '../actions';
import { loadList } from '../List/actions';

export const ExpensesControls = ({ handlePageChange, paginationData }) => (
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
  </div>
);

ExpensesControls.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  paginationData: PropTypes.object.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  paginationData: selectPaginationData(),
});

export const mapDispatchToProps = dispatch => ({
  handlePageChange: (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(loadList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesControls);
