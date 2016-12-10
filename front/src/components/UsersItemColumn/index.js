import React, { PropTypes } from 'react';
import { grey200 } from 'material-ui/styles/colors';

const UsersItemColumn = ({ children, style }) => (
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

UsersItemColumn.propTypes = {
  style: PropTypes.object,
};

export const UsersItemColumnId = ({ children }) => (
  <UsersItemColumn
    style={{
      width: '10%',
    }}
  >
    {children}
  </UsersItemColumn>
);

export const UsersItemColumnEmail = ({ children }) => (
  <UsersItemColumn
    style={{
      width: '40%',
    }}
  >
    {children}
  </UsersItemColumn>
);

export const UsersItemColumnRole = ({ children }) => (
  <UsersItemColumn
    style={{
      width: '30%',
    }}
  >
    {children}
  </UsersItemColumn>
);


export const UsersItemColumnEdit = ({ children }) => (
  <UsersItemColumn
    style={{
      width: '20%',
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </UsersItemColumn>
);

export default UsersItemColumn;
