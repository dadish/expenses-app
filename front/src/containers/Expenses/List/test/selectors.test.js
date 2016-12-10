import expect from 'expect';
import { fromJS } from 'immutable';
import selectList from '../selectors';

const list = fromJS([]);
const expenses = fromJS({ list });
const state = fromJS({ expenses });

test('selectList() returns state.expenses.list node', () => {
  expect(selectList()(state)).toBe(list);
});
