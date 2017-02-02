import { createSelector } from 'reselect';
import rootSelector, {
  selectCurrentPage,
  selectItemsPerPage,
  selectSortField,
  selectSortDirection,
} from '../selectors';
import { selectFilterValues } from '../Filter/selectors';
import { SORT_DIRECTION_DESC } from '../Header/constants';

const selectList = () => createSelector(
  rootSelector(),
  expenses => expenses.get('list'),
);

export const selectQuery = () => createSelector(
  selectCurrentPage(),
  selectItemsPerPage(),
  selectFilterValues(),
  selectSortField(),
  selectSortDirection(),
  (page, limit, values, sortField, sortDirection) => {
    const filter = Object.keys(values).reduce((memo, key) => {
      const result = memo;
      const value = values[key];
      if (!value) return result;
      if (key === 'amount') {
        if (value.min) result[`${key}Min`] = value.min * 100;
        if (value.max) result[`${key}Max`] = value.max * 100;
        return result;
      }
      if (key === 'date') {
        if (value.from) result[`${key}From`] = value.from.toISOString();
        if (value.to) result[`${key}To`] = value.to.toISOString();
        return result;
      }
      result[key] = value;
      return result;
    }, {});

    return {
      ...filter,
      limit,
      page,
      sortField: sortField === 'user' ? 'userEmail' : sortField,
      sortDirection: sortDirection === SORT_DIRECTION_DESC ? 'desc' : 'asc',
    };
  },
);

export default selectList;
