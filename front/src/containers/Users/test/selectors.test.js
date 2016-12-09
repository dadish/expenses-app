import expect from 'expect';
import { fromJS } from 'immutable';
import selector from '../selectors';

test('selector selects the `users` from the root state', () => {
  const users = fromJS({});
  const state = fromJS({ users });
  expect(selector()(state)).toBe(users);
});
