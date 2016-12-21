import expect from 'expect';
import { fromJS } from 'immutable';
import { resetList } from '../actions';
import listReducer from '../reducer';

const list = fromJS([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
]);

describe('listReducer()', () => {
  it('returns the provided state back for an unknown type of action', () => {
    const state = listReducer(list, { type: 'pooop' });
    expect(state).toBe(list);
  });
  it('resets the whole list for resetList() actio', () => {
    const state = listReducer(undefined, resetList(list));
    expect(state.size).toBe(list.size);
  });
});
