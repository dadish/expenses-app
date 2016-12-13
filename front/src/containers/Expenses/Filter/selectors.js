import { createSelector } from 'reselect';
import rootSelector from '../selectors';

export const selectFilter = () => createSelector(
  rootSelector(),
  expenses => expenses.get('filter'),
);

export const selectFilterOn = () => createSelector(
  selectFilter(),
  filter => filter.get('on'),
);
