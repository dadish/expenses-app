import React, { PropTypes } from 'react';
import { grey200 } from 'material-ui/styles/colors';

const ExpensesItemColumn = ({ children, style }) => (
  <div
    style={{
      padding: '8px',
      textAlign: 'left',
      borderLeft: `1px solid ${grey200}`,
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);

ExpensesItemColumn.propTypes = {
  style: PropTypes.object,
};

export const ExpensesItemColumnId = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '5%',
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export const ExpensesItemColumnUser = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '18%',
      fontSize: '14px',
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export const ExpensesItemColumnAmount = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '7%',
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export const ExpensesItemColumnDate = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '20%',
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export const ExpensesItemColumnDescription = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '20%',
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export const ExpensesItemColumnComment = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '22%',
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export const ExpensesItemColumnEdit = ({ children }) => (
  <ExpensesItemColumn
    style={{
      width: '8%',
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);

export default ExpensesItemColumn;
