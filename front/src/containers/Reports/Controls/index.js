import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import isNaN from 'lodash/isNaN';
import toNumber from 'lodash/toNumber';
import FlatButton from 'material-ui/FlatButton';
import InputSelect from 'components/InputSelect';
import { blue400 } from 'material-ui/styles/colors';
import { createStructuredSelector } from 'reselect';
import Pagination from 'react-ultimate-pagination-material-ui';
import { selectPaginationData, selectItemsPerPage } from '../selectors';
import { setCurrentPage, setItemsPerPage } from '../actions';
import { loadList } from '../List/actions';

const choices = [
  [10], [15], [20], [25], [30], [35], [40], [45], [50],
  [55], [60], [65], [70], [75], [80], [85], [90], [95],
  [100], [200], [300], [400], [500],
];

export const printOnClick = () => print();

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
          alignItems: 'center',
        }}
      >
        <InputSelect
          label="Limit"
          input={{
            onChange: handleLimitChange,
            value: itemsPerPage,
          }}
          meta={{}}
          choices={choices}
          style={{
            marginRight: '32px',
          }}
        />
        <FlatButton
          primary
          label="Print"
          labelStyle={{
            color: blue400,
          }}
          onClick={printOnClick}
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
  handleLimitChange: (limit) => {
    let value = toNumber(limit);
    if (isNaN(value)) value = 25;
    value = value > 500 ? 500 : value;
    dispatch(setItemsPerPage(value));
    dispatch(loadList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesControls);
