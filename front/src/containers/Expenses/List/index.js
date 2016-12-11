import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import selectList from './selectors';
import Item from '../ItemOrItemForm';

export const ExpensesList = ({ list }) => (
  <div>
    {list.map(expense => <Item expense={expense} key={expense.get('id') || expense.get('cid')} />)}
  </div>
);

ExpensesList.propTypes = {
  list: PropTypes.instanceOf(List),
};

export const mapStateToProps = createStructuredSelector({
  list: selectList(),
});

export default connect(mapStateToProps, null)(ExpensesList);
