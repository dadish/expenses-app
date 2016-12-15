import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import InProgress from 'components/InProgress';
import { createStructuredSelector } from 'reselect';
import { selectFilterOn, selectFilterUpdating } from './Filter/selectors';
import Controls from './Controls';
import Filter from './Filter';
import Header from './Header';
import List from './List';

const style = {
  width: '90%',
  margin: '32px auto',
  padding: '16px',
};

export const Expenses = ({ filterOn, filterUpdating }) => {
  const items = [];
  items.push(<Controls key="Controls" />);
  if (filterOn) items.push(<Filter key="Filter" />);
  items.push(<Header key="Header" />);
  if (filterUpdating) items.push(<InProgress key="Progress" />);
  else items.push(<List key="List" />);
  return (
    <Paper style={style} >
      {items}
    </Paper>
  );
};

Expenses.propTypes = {
  filterOn: PropTypes.bool.isRequired,
  filterUpdating: PropTypes.bool.isRequired,
};

export const mapStateToProps = createStructuredSelector({
  filterOn: selectFilterOn(),
  filterUpdating: selectFilterUpdating(),
});

export default connect(mapStateToProps)(Expenses);
