import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';
import { FORM_NAME } from './constants';
import rootSelector from '../selectors';

const filterFields = [
  'userEmail',
  'comment',
  'description',
  'amount.min',
  'amount.max',
  'date.from',
  'date.to',
];

export const selectFilterValues = () => state =>
  formValueSelector(FORM_NAME)(state, ...filterFields);

export const selectFilter = () => createSelector(
  rootSelector(),
  expenses => expenses.get('filter'),
);

export const selectFilterOn = () => createSelector(
  selectFilter(),
  filter => filter.get('on'),
);

