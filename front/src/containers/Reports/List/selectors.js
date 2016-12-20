import { createSelector } from 'reselect';
import rootSelector, { selectCurrentPage, selectItemsPerPage } from '../selectors';

const selectList = () => createSelector(
  rootSelector(),
  expenses => expenses.get('list'),
);

export default selectList;

export const selectQuery = () => createSelector(
  selectCurrentPage(),
  selectItemsPerPage(),
  (page, limit) => ({ page, limit }),
);
