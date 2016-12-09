import { createSelector } from 'reselect';

const rootSelector = () => state => state.get('users');

export default rootSelector;

const userRoleLabels = [
  [100, 'User'],
  [200, 'Manager'],
  [300, 'Admin'],
];

const selectUserRole = () => state => state.getIn(['global', 'user', 'role']);

export const selectUserRoleLabels = () => createSelector(
  selectUserRole(),
  (role) => {
    if (role === 0) return [];
    if (role === 300) return userRoleLabels;
    return userRoleLabels.filter(label => label[0] !== 300);
  },
);
