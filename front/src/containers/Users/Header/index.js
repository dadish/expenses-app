import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import ItemRow from 'components/ItemRow';
import {
  UsersItemColumnId,
  UsersItemColumnEmail,
  UsersItemColumnRole,
  UsersItemColumnEdit,
} from 'components/UsersItemColumn';

const UsersHeader = () => (
  <ItemRow
    style={{
      borderTop: `1px solid ${grey200}`,
    }}
  >
    <UsersItemColumnId>Id</UsersItemColumnId>
    <UsersItemColumnEmail>Email</UsersItemColumnEmail>
    <UsersItemColumnRole>Role</UsersItemColumnRole>
    <UsersItemColumnEdit>Edit</UsersItemColumnEdit>
  </ItemRow>
);

export default UsersHeader;
