import React, { PropTypes } from 'react';
import { grey200 } from 'material-ui/styles/colors';

const ExpensesItem = ({ children, style }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderBottom: `1px solid ${grey200}`,
      ...style,
    }}
  >
    {children}
  </div>
);

ExpensesItem.propTypes = {
  style: PropTypes.object,
};

export default ExpensesItem;
