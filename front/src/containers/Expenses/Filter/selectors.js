import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import rootSelector, {
  selectCurrentPage,
  selectItemsPerPage,
} from '../selectors';
import { FORM_NAME } from './constants';

const filterFields = [
  'userEmail',
  'comment',
  'description',
  'amount.min',
  'amount.max',
  'date.from',
  'date.to',
];

const selectFilterValues = () => state => formValueSelector(FORM_NAME)(state, ...filterFields);

export const selectFilter = () => createSelector(
  rootSelector(),
  expenses => expenses.get('filter'),
);

export const selectFilterOn = () => createSelector(
  selectFilter(),
  filter => filter.get('on'),
);

export const selectFilteredQuery = () => createSelector(
  selectCurrentPage(),
  selectItemsPerPage(),
  selectFilterValues(),
  (page, limit, values) => {
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
    };
  },
);
