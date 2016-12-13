import { fromJS } from 'immutable';
import {
  selectFilter,
  selectFilterOn,
  selectFilterUpdating,
  selectFilterFields,
} from '../selectors';

const on = 'qalsdfjas,';

const updating = 'aksdfgnqkal';

const fields = fromJS({});

const filter = fromJS({
  on,
  updating,
  fields,
});

const state = fromJS({
  expenses: {
    filter,
  },
});

test('selectFilter selects state.expenses.filter', () => {
  expect(selectFilter()(state)).toBe(filter);
});

test('selectFilterOn selects state.expenses.filter.on', () => {
  expect(selectFilterOn()(state)).toBe(on);
});

test('selectFilterUpdating selects state.expenses.filter.updating', () => {
  expect(selectFilterUpdating()(state)).toBe(updating);
});

test('selectFilterFields selects state.expenses.filter.fields', () => {
  expect(selectFilterFields()(state)).toBe(fields);
});
