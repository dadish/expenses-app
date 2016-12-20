import { createSelector } from 'reselect';

const rootSelector = () => state => state.get('reports');

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

export const selectUpdating = () => createSelector(
  rootSelector(),
  expenses => expenses.get('updating')
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
