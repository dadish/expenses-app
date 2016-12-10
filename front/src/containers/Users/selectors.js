import { createSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';

const rootSelector = () => state => state.get('users');

export default rootSelector;

export const userRoleLabels = [
  [100, 'User'],
  [200, 'Manager'],
  [300, 'Admin'],
];

export const selectUserRoleLabels = () => createSelector(
  selectUserRole(),
  (role) => {
    if (role === 0) return [];
    if (role === 300) return userRoleLabels;
    return userRoleLabels.filter(label => label[0] !== 300);
  },
);
