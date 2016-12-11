import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import ExpensesItemRow from 'components/ExpensesItemRow';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnUser,
  ExpensesItemColumnAmount,
  ExpensesItemColumnDate,
  ExpensesItemColumnComment,
  ExpensesItemColumnDescription,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';
import { selectUser } from 'containers/App/selectors';
import { selectColumnWidths } from 'containers/Expenses/selectors';
import { createStructuredSelector } from 'reselect';
import ActionIcons from './ActionIcons';

export const ExpensesItem = (props) => {
  const { expense, user, widths } = props;
  const columns = [];

  columns.push(
    <ExpensesItemColumnId key="id" width={widths.id} >
      {expense.get('id')}
    </ExpensesItemColumnId>
  );

  if (user.get('role') === 300) {
    columns.push(
      <ExpensesItemColumnUser key="user" width={widths.user}>
        {expense.get('userEmail')}
      </ExpensesItemColumnUser>
    );
  }

  columns.push(
    <ExpensesItemColumnAmount key="amount" width={widths.amount} >
      {expense.get('amount') / 100}
    </ExpensesItemColumnAmount>
  );

  columns.push(
    <ExpensesItemColumnDate key="date" width={widths.date} >
      {expense.get('date')}
    </ExpensesItemColumnDate>
  );

  columns.push(
    <ExpensesItemColumnComment key="comment" width={widths.comment} >
      {expense.get('comment')}
    </ExpensesItemColumnComment>
  );

  columns.push(
    <ExpensesItemColumnDescription key="description" width={widths.description} >
      {expense.get('description')}
    </ExpensesItemColumnDescription>
  );

  columns.push(
    <ExpensesItemColumnEdit key="edit" width={widths.edit} >
      <ActionIcons expense={expense} />
    </ExpensesItemColumnEdit>
  );

  return (
    <ExpensesItemRow>
      {columns}
    </ExpensesItemRow>
  );
};

export const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  widths: selectColumnWidths(),
});

ExpensesItem.propTypes = {
  widths: PropTypes.object.isRequired,
  expense: PropTypes.instanceOf(Map),
  user: PropTypes.instanceOf(Map),
};

export default connect(mapStateToProps)(ExpensesItem);
