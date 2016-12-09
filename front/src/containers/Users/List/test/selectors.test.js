import expect from 'expect';
import { fromJS } from 'immutable';
import selectList from '../selectors';

const list = fromJS([]);
const users = fromJS({ list });
const state = fromJS({ users });

test('selectList() returns state.users.list node', () => {
  expect(selectList()(state)).toBe(list);
});
