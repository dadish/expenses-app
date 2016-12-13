import { fromJS } from 'immutable';
import { selectFilter, selectFilterOn } from '../selectors';

const on = false;

const filter = fromJS({
  on,
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
  expect(selectFilterOn()(state)).toBe(false);
  const newState = state.setIn(['expenses', 'filter', 'on'], true);
  expect(selectFilterOn()(newState)).toBe(true);
});
