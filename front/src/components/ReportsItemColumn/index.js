import React, { PropTypes } from 'react';
import { grey200 } from 'material-ui/styles/colors';

const ReportsItemColumn = ({ children, style }) => (
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


ReportsItemColumn.propTypes = {
  style: PropTypes.object,
};

export const ReportsItemColumnPeriod = ({ children }) => (
  <ReportsItemColumn
    style={{
      width: '40%',
    }}
  >
    {children}
  </ReportsItemColumn>
);

export const ReportsItemColumnAvarageSpent = ({ children }) => (
  <ReportsItemColumn
    style={{
      width: '30%',
    }}
  >
    {children}
  </ReportsItemColumn>
);

export const ReportsItemColumnTotalSpent = ({ children }) => (
  <ReportsItemColumn
    style={{
      width: '30%',
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </ReportsItemColumn>
);

export default ReportsItemColumn;
