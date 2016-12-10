import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
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

const ExpensesHeader = () => (
  <ExpensesItemRow
    style={{
      borderTop: `1px solid ${grey200}`,
    }}
  >
    <ExpensesItemColumnId>Id</ExpensesItemColumnId>
    <ExpensesItemColumnUser>User</ExpensesItemColumnUser>
    <ExpensesItemColumnAmount>Amount</ExpensesItemColumnAmount>
    <ExpensesItemColumnDate>Date</ExpensesItemColumnDate>
    <ExpensesItemColumnComment>Comment</ExpensesItemColumnComment>
    <ExpensesItemColumnDescription>Description</ExpensesItemColumnDescription>
    <ExpensesItemColumnEdit>Edit</ExpensesItemColumnEdit>
  </ExpensesItemRow>
);

export default ExpensesHeader;
