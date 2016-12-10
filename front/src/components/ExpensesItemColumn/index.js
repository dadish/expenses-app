import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import ItemColumn from 'components/ItemColumn';

const ExpensesItemColumn = props => (
  <ItemColumn {...props} />
);

export const ExpensesItemColumnId = ({ children }) => (
  <ItemColumn
    style={{
      width: '10%',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnEmail = ({ children }) => (
  <ItemColumn
    style={{
      width: '40%',
    }}
  >
    {children}
  </ItemColumn>
);

export const ExpensesItemColumnRole = ({ children }) => (
  <ItemColumn
    style={{
      width: '30%',
    }}
  >
    {children}
  </ItemColumn>
);


export const ExpensesItemColumnEdit = ({ children }) => (
  <ItemColumn
    style={{
      width: '20%',
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </ItemColumn>
);

export default ExpensesItemColumn;
