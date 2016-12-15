import { fromJS } from 'immutable';
import {
  selectFilter,
  selectFilterOn,
  selectFilterUpdating,
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
  const selector = selectFilter();
  expect(selector(state)).toBe(filter);
});

test('selectFilterOn selects state.expenses.filter.on', () => {
  const selector = selectFilterOn();
  expect(selector(state)).toBe(on);
});

test('selectFilterUpdating selects state.expenses.filter.updating', () => {
  const selector = selectFilterUpdating();
  expect(selector(state)).toBe(updating);
});
