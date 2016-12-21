import expect from 'expect';
import { fromJS } from 'immutable';
import selectList, { selectQuery } from '../selectors';

const currentPage = 3;
const itemsPerPage = 25;
const list = fromJS([]);
const reports = fromJS({ list, itemsPerPage, currentPage });
const state = fromJS({ reports });

test('selectList() returns state.expenses.list node', () => {
  expect(selectList()(state)).toBe(list);
});

test('selectQuery() returns the query params computed from itemsPerPage and currentPage of the state', () => {
  const query = selectQuery()(state);
  expect(query.limit).toBe(itemsPerPage);
  expect(query.page).toBe(currentPage);
});
