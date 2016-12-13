import filterReducer, { initialState } from '../reducer';
import { toggle } from '../actions';

test('filterReducer sets the filter.on to false when it is true for toggle action', () => {
  const filterOffState = initialState().set('on', false);
  const state = filterReducer(filterOffState, toggle());
  expect(state.get('on')).toBe(true);
});

test('filterReducer sets the filter.on to true when it is false for toggle action', () => {
  const filterOffState = initialState().set('on', true);
  const state = filterReducer(filterOffState, toggle());
  expect(state.get('on')).toBe(false);
});

test('filterReducer returns state back unchanged for unknown action', () => {
  const firstState = initialState();
  const secondState = filterReducer(firstState, { type: 'unknown' });
  expect(secondState).toBe(firstState);
});

test('filterReducer returns initialState when no state was provided', () => {
  const state = filterReducer(undefined, { type: 'unknown' });
  expect(state).toEqual(initialState());
});
