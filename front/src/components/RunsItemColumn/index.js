import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import ItemColumn from 'components/ItemColumn';

const ExpensesItemColumn = props => (
  <ItemColumn {...props} />
);

export const ExpensesItemColumnId = ({ children }) => (
  <ItemColumn
    style={{
      width: '7%',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnExpensener = ({ children }) => (
  <ItemColumn
    style={{
      width: '32%',
      fontSize: '14px',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnDistance = ({ children }) => (
  <ItemColumn
    style={{
      width: '11%',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnDuration = ({ children }) => (
  <ItemColumn
    style={{
      width: '10%',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnDate = ({ children }) => (
  <ItemColumn
    style={{
      width: '28%',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnEdit = ({ children }) => (
  <ItemColumn
    style={{
      width: '12%',
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </ItemColumn>
);

export default ExpensesItemColumn;
