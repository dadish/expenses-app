import React from 'react';
import { grey200 } from 'material-ui/styles/colors';
import UsersItemRow from 'components/UsersItemRow';
import {
  UsersItemColumnId,
  UsersItemColumnEmail,
  UsersItemColumnRole,
  UsersItemColumnEdit,
} from 'components/UsersItemColumn';

const UsersHeader = () => (
  <UsersItemRow
    style={{
      borderTop: `1px solid ${grey200}`,
    }}
  >
    <UsersItemColumnId>Id</UsersItemColumnId>
    <UsersItemColumnEmail>Email</UsersItemColumnEmail>
    <UsersItemColumnRole>Role</UsersItemColumnRole>
    <UsersItemColumnEdit>Edit</UsersItemColumnEdit>
  </UsersItemRow>
);

export default UsersHeader;
