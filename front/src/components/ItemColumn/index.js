import React, { PropTypes } from 'react';
import { grey200 } from 'material-ui/styles/colors';

const ItemColumn = ({ children, style }) => (
  <div
    style={{
      padding: '8px',
      textAlign: 'left',
      borderLeft: `1px solid ${grey200}`,
      ...style,
    }}
  >
    {children}
  </div>
);

ItemColumn.propTypes = {
  style: PropTypes.object,
};

export default ItemColumn;
