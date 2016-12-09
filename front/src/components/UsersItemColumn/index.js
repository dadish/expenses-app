import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import ItemColumn from 'components/ItemColumn';

const UsersItemColumn = props => (
  <ItemColumn {...props} />
);

export const UsersItemColumnId = ({ children }) => (
  <ItemColumn
    style={{
      width: '10%',
    }}
  >
    {children}
  </ItemColumn>
);

export const UsersItemColumnEmail = ({ children }) => (
  <ItemColumn
    style={{
      width: '40%',
    }}
  >
    {children}
  </ItemColumn>
);

export const UsersItemColumnRole = ({ children }) => (
  <ItemColumn
    style={{
      width: '30%',
    }}
  >
    {children}
  </ItemColumn>
);


export const UsersItemColumnEdit = ({ children }) => (
  <ItemColumn
    style={{
      width: '20%',
      borderRight: `1px solid ${grey200}`,
    }}
  >
    {children}
  </ItemColumn>
);

export default UsersItemColumn;
