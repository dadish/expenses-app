import filterReducer, { initialState } from '../reducer';
import {
  toggleFilter,
  startFiltering,
  endFiltering,
} from '../actions';

test('filterReducer sets the filter.on to false when it is true for toggleFilter action', () => {
  const filterOffState = initialState().set('on', false);
  const state = filterReducer(filterOffState, toggleFilter());
  expect(state.get('on')).toBe(true);
});

test('filterReducer sets the filter.on to true when it is false for toggleFilter action', () => {
  const filterOffState = initialState().set('on', true);
  const state = filterReducer(filterOffState, toggleFilter());
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

test('filterReducer sets the updating to true for startFiltering action', () => {
  const initial = initialState();
  expect(initial.get('updating')).toBe(false);
  expect(filterReducer(initial, startFiltering()).get('updating')).toBe(true);
});

test('filterReducer sets the updating to true for startFiltering action', () => {
  const initial = initialState().set('updating', true);
  expect(initial.get('updating')).toBe(true);
  expect(filterReducer(initial, endFiltering()).get('updating')).toBe(false);
});
