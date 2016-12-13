import { createSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';

const rootSelector = () => state => state.get('expenses');

export default rootSelector;

export const selectColumnWidths = () => createSelector(
  selectUserRole(),
  (role) => {
    const admin = Boolean(role === 300);
    return ({
      id: admin ? 5 : 6,
      user: admin ? 18 : 0,
      amount: admin ? 7 : 8,
      date: admin ? 20 : 24,
      description: admin ? 20 : 24,
      comment: admin ? 22 : 26,
      edit: admin ? 8 : 12,
    });
  },
);
