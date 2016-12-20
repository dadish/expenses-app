import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isNaN from 'lodash/isNaN';
import toNumber from 'lodash/toNumber';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { blue400 } from 'material-ui/styles/colors';
import { createStructuredSelector } from 'reselect';
import Pagination from 'react-ultimate-pagination-material-ui';
import { selectPaginationData, selectItemsPerPage } from '../selectors';
import { setCurrentPage, setItemsPerPage } from '../actions';
import { loadList } from '../List/actions';

export const ExpensesControls = (props) => {
  const {
    handlePageChange,
    handleLimitChange,
    paginationData,
    itemsPerPage,
  } = props;
  return (
    <div
      className="controls-w"
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
      <div
        style={{
          display: 'flex',
        }}
      >
        <span
          style={{
            position: 'relative',
            top: '8px',
            right: '8px',
          }}
        >
          Limit:
        </span>
        <TextField
          name="itemsPerPage"
          style={{
            width: '100px',
            height: '40px',
            marginRight: '16px',
          }}
          onChange={handleLimitChange}
          hintText={itemsPerPage}
          hintStyle={{
            bottom: '8px',
          }}
        />
        <FlatButton
          primary
          label="Print"
          labelStyle={{
            color: blue400,
          }}
          onClick={() => print()}
        />
      </div>
    </div>
  );
};

ExpensesControls.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
  paginationData: PropTypes.object.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  paginationData: selectPaginationData(),
  itemsPerPage: selectItemsPerPage(),
});

export const mapDispatchToProps = dispatch => ({
  handlePageChange: (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(loadList());
  },
  handleLimitChange: debounce((limit) => {
    let value = toNumber(limit);
    if (isNaN(value)) value = 25;
    value = value > 500 ? 500 : value;
    dispatch(setItemsPerPage(value));
    dispatch(loadList());
  }, 500),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesControls);
