import React, { PropTypes } from 'react';
import { grey200 } from 'material-ui/styles/colors';

const ExpensesItemRow = ({ children, style }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      borderBottom: `1px solid ${grey200}`,
      ...style,
    }}
  >
    {children}
  </div>
);

ExpensesItemRow.propTypes = {
  style: PropTypes.object,
};

export default ExpensesItemRow;
