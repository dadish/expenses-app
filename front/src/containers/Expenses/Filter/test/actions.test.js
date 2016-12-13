import { toggle } from '../actions';
import { TOGGLE } from '../constants';

describe('toggle()', () => {
  it('creates the correct type', () => {
    expect(toggle().type).toBe(TOGGLE);
  });
  it('sets the first argument as a payload of the action', () => {
    const target = {};
    expect(toggle(target).payload).toBe(target);
  });
});
