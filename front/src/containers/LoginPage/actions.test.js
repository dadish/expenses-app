import expect from 'expect';
import { submit } from './actions';
import { SUBMIT } from './constants';

describe('submit() action', () => {
  it('dispatches the right type', () => {
    expect(submit().type).toBe(SUBMIT);
  });
  it('sets the passed argument as a payload of the action', () => {
    const obj = {};
    expect(submit(obj).payload).toBe(obj);
  });
});
