import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import ItemRow from 'components/ItemRow';
import {
  ExpensesItemColumnId,
  ExpensesItemColumnEmail,
  ExpensesItemColumnRole,
  ExpensesItemColumnEdit,
} from 'components/ExpensesItemColumn';

const ExpensesHeader = () => (
  <ItemRow
    style={{
      borderTop: `1px solid ${grey200}`,
    }}
  >
    <ExpensesItemColumnId>Id</ExpensesItemColumnId>
    <ExpensesItemColumnEmail>Email</ExpensesItemColumnEmail>
    <ExpensesItemColumnRole>Role</ExpensesItemColumnRole>
    <ExpensesItemColumnEdit>Edit</ExpensesItemColumnEdit>
  </ItemRow>
);

export default ExpensesHeader;
