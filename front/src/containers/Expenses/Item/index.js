import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import ItemRow from 'components/ItemRow';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnEmail,
  ExpensesItemColumnRole,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';
import ActionIcons from './ActionIcons';

export const roleToRoleLabel = (role, labels) => {
  if (labels.length) return labels.find(label => label[0] === role)[1];
  return '';
};

const ExpensesItem = ({ expense, expenseRoleLabels }) => (
  <ItemRow>
    <ExpensesItemColumnId>
      {expense.get('id')}
    </ExpensesItemColumnId>
    <ExpensesItemColumnEmail>
      {expense.get('email')}
    </ExpensesItemColumnEmail>
    <ExpensesItemColumnRole>
      {roleToRoleLabel(expense.get('role'), expenseRoleLabels)}
    </ExpensesItemColumnRole>
    <ExpensesItemColumnEdit>
      <ActionIcons expense={expense} />
    </ExpensesItemColumnEdit>
  </ItemRow>
);

ExpensesItem.propTypes = {
  expenseRoleLabels: PropTypes.array.isRequired,
  expense: PropTypes.instanceOf(Map),
};

export default ExpensesItem;
