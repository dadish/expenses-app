import React, { PropTypes } from 'react';
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
import ActionIcons from './ActionIcons';

export const roleToRoleLabel = (role, labels) => {
  if (labels.length) return labels.find(label => label[0] === role)[1];
  return '';
};

const ExpensesItem = ({ expense }) => (
  <ExpensesItemRow>
    <ExpensesItemColumnId>
      {expense.get('id')}
    </ExpensesItemColumnId>
    <ExpensesItemColumnUser>
      {expense.get('userEmail')}
    </ExpensesItemColumnUser>
    <ExpensesItemColumnAmount>
      {expense.get('amount') / 100}
    </ExpensesItemColumnAmount>
    <ExpensesItemColumnDate>
      {expense.get('date')}
    </ExpensesItemColumnDate>
    <ExpensesItemColumnComment>
      {expense.get('comment')}
    </ExpensesItemColumnComment>
    <ExpensesItemColumnDescription>
      {expense.get('description')}
    </ExpensesItemColumnDescription>
    <ExpensesItemColumnEdit>
      <ActionIcons expense={expense} />
    </ExpensesItemColumnEdit>
  </ExpensesItemRow>
);

ExpensesItem.propTypes = {
  expense: PropTypes.instanceOf(Map),
};

export default ExpensesItem;
