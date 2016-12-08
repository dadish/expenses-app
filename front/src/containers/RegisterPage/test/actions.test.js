import expect from 'expect';
import { submit } from '../actions';
import { SUBMIT } from '../constants';

describe('submit()', () => {
  it('returns the right type', () => {
    expect(submit().type).toBe(SUBMIT);
  });
  it('sets the first argument as an action paylaod', () => {
    const target = {};
    expect(submit(target).payload).toBe(target);
  });
});
