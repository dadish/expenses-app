import { createSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';

const rootSelector = () => state => state.get('expenses');

export default rootSelector;

export const expenseRoleLabels = [
  [100, 'Expense'],
  [200, 'Manager'],
  [300, 'Admin'],
];

export const selectExpenseRoleLabels = () => createSelector(
  selectUserRole(),
  (role) => {
    if (role === 0) return [];
    if (role === 300) return expenseRoleLabels;
    return expenseRoleLabels.filter(label => label[0] !== 300);
  },
);
