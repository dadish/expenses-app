import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectSortField,
  selectSortDirection,
} from 'containers/Expenses/selectors';
import {
  setSortField,
  setSortDirection,
} from './actions';
import SortIcon from './SortIcon';
import { SORT_DIRECTION_ASC, SORT_DIRECTION_DESC } from './constants';

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
};

const createClickHandler = (props, dispatch) => (ev) => {
  ev.preventDefault();
  const {
      field,
      sortField,
      direction,
    } = props;
  if (field === sortField) {
    let newDirection;
    if (direction === SORT_DIRECTION_ASC) newDirection = SORT_DIRECTION_DESC;
    else newDirection = SORT_DIRECTION_ASC;
    dispatch(setSortDirection(newDirection));
  } else {
    dispatch(setSortField(field));
  }
};

export const Label = (props) => {
  const {
    children,
    sortField,
    field,
    direction,
    handleClick,
  } = props;
  return (
    <a
      style={style}
      onClick={handleClick(props)}
      tabIndex="-1"
    >
      {children}
      <SortIcon direction={direction} isActive={field === sortField} />
    </a>
  );
};

Label.propTypes = {
  direction: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  sortField: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sortField: selectSortField(),
  direction: selectSortDirection(),
});

const mapDispatchToProps = dispatch => ({
  handleClick: props => createClickHandler(props, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Label);
