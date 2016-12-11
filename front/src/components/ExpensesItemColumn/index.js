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

export const ExpensesItemColumnId = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 5}%`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnId.propTypes = { width: PropTypes.number };


export const ExpensesItemColumnUser = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 18}%`,
      fontSize: '14px',
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnUser.propTypes = { width: PropTypes.number };


export const ExpensesItemColumnAmount = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 7}%`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnAmount.propTypes = { width: PropTypes.number };


export const ExpensesItemColumnDate = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 20}%`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnDate.propTypes = { width: PropTypes.number };


export const ExpensesItemColumnDescription = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 20}%`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnDescription.propTypes = { width: PropTypes.number };


export const ExpensesItemColumnComment = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 22}%`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnComment.propTypes = { width: PropTypes.number };


export const ExpensesItemColumnEdit = ({ children, width }) => (
  <ExpensesItemColumn
    style={{
      width: `${width || 8}%`,
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </ExpensesItemColumn>
);
ExpensesItemColumnEdit.propTypes = { width: PropTypes.number };


export default ExpensesItemColumn;
