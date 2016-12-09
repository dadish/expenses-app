import expect from 'expect';
import { resetList } from '../actions';
import { RESET_LIST } from '../constants';

test('resetList() returns the right type', () => {
  expect(resetList().type).toBe(RESET_LIST);
});

test('resetList() sets the first argument as the payload of the action', () => {
  const target = {};
  expect(resetList(target).payload).toBe(target);
});
