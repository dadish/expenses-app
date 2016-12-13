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

export const selectFilterUpdating = () => createSelector(
  selectFilter(),
  filter => filter.get('updating'),
);

export const selectFilterFields = () => createSelector(
  selectFilter(),
  filter => filter.get('fields'),
);
