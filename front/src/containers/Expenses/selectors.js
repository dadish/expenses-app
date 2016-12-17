import { createSelector } from 'reselect';
import { selectUserRole } from 'containers/App/selectors';

const rootSelector = () => state => state.get('expenses');

export default rootSelector;

export const selectTotalItems = () => createSelector(
  rootSelector(),
  expenses => expenses.get('totalItems'),
);

export const selectCurrentPage = () => createSelector(
  rootSelector(),
  expenses => expenses.get('currentPage')
);

export const selectItemsPerPage = () => createSelector(
  rootSelector(),
  expenses => expenses.get('itemsPerPage')
);

export const selectTotalPages = () => createSelector(
  selectTotalItems(),
  selectItemsPerPage(),
  (total, limit) => Math.ceil(total / limit)
);

export const selectPaginationData = () => createSelector(
  selectTotalPages(),
  selectCurrentPage(),
  (totalPages, currentPage) => ({ totalPages, currentPage })
);

export const selectColumnWidths = () => createSelector(
  selectUserRole(),
  (role) => {
    const admin = Boolean(role === 300);
    if (admin) {
      return ({
        id: 5,
        user: 18,
        amount: 7,
        date: 20,
        description: 20,
        comment: 22,
        edit: 8,
      });
    }
    return ({
      id: 6,
      user: 0,
      amount: 8,
      date: 24,
      description: 24,
      comment: 26,
      edit: 12,
    });
  },
);
