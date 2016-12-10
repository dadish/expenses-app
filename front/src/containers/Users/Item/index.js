import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import UsersItemRow from 'components/UsersItemRow';
import {
  UsersItemColumnId,
  UsersItemColumnEmail,
  UsersItemColumnRole,
  UsersItemColumnEdit,
} from 'components/UsersItemColumn';
import ActionIcons from './ActionIcons';

export const roleToRoleLabel = (role, labels) => {
  if (labels.length) return labels.find(label => label[0] === role)[1];
  return '';
};

const UsersItem = ({ user, userRoleLabels }) => (
  <UsersItemRow>
    <UsersItemColumnId>
      {user.get('id')}
    </UsersItemColumnId>
    <UsersItemColumnEmail>
      {user.get('email')}
    </UsersItemColumnEmail>
    <UsersItemColumnRole>
      {roleToRoleLabel(user.get('role'), userRoleLabels)}
    </UsersItemColumnRole>
    <UsersItemColumnEdit>
      <ActionIcons user={user} />
    </UsersItemColumnEdit>
  </UsersItemRow>
);

UsersItem.propTypes = {
  userRoleLabels: PropTypes.array.isRequired,
  user: PropTypes.instanceOf(Map),
};

export default UsersItem;
