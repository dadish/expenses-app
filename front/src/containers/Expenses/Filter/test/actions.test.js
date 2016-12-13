import { toggleFilter } from '../actions';
import { TOGGLE_FILTER } from '../constants';

describe('toggleFilter()', () => {
  it('creates the correct type', () => {
    expect(toggleFilter().type).toBe(TOGGLE_FILTER);
  });
  it('sets the first argument as a payload of the action', () => {
    const target = {};
    expect(toggleFilter(target).payload).toBe(target);
  });
});
