import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DescendingIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import AscendingIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';
import {
  selectSortField,
  selectSortDirection,
} from 'containers/Expenses/selectors';
import {
  setSortField,
  setSortDirection,
} from './actions';

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
};

const Icon = ({ direction }) => (direction === 'desc' ? <DescendingIcon /> : <AscendingIcon />);
Icon.propTypes = {
  direction: PropTypes.string.isRequired,
};

export const Label = ({ children, sortField, field, direction }) => (
  <div style={style}>
    <div>
      {children}
    </div>
    <Icon direction={direction} isActive={field === sortField} />
  </div>
);

Label.propTypes = {
  direction: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  sortField: PropTypes.string.isRequired,
  // handleSortField: PropTypes.func.isRequired,
  // handleSortDirection: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sortField: selectSortField(),
  direction: selectSortDirection(),
});

const mapDispatchToProps = dispatch => ({
  handleSortField: field => dispatch(setSortField(field)),
  handleSortDirection: direction => dispatch(setSortDirection(direction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Label);
