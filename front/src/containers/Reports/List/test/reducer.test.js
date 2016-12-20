import expect from 'expect';
import { fromJS } from 'immutable';
import {
  editModeOn,
  editModeOff,
  save,
  saveSuccess,
  saveError,
  create,
  del,
  deleteSuccess,
  deleteError,
} from 'containers/Expenses/Item/actions';
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
  it('removes the item from the list for the deleteSuccess() action', () => {
    const state = listReducer(list, deleteSuccess(fromJS({ id: 1 })));
    expect(state.size).toBe(list.size - 1);
  });
  it('adds a new item to the list for the create() action', () => {
    const state = listReducer(list, create(fromJS({ id: 6 })));
    expect(state.size).toBe(list.size + 1);
  });
  it('handles actions that are related to itemReducer without errors', () => {
    listReducer(list, editModeOn(fromJS({ id: 1 })));
    listReducer(list, editModeOff(fromJS({ id: 1 })));
    listReducer(list, save(fromJS({ id: 1 })));
    listReducer(list, saveSuccess(fromJS({ id: 1 })));
    listReducer(list, saveError(fromJS({ id: 1 })));
    listReducer(list, del(fromJS({ id: 1 })));
    listReducer(list, deleteError(fromJS({ id: 1 })));
  });
  it('removes item from the list editModeOff() if item does have a falsy `id` attribute', () => {
    const newItem = fromJS({ cid: 'bar' });
    const listWithNewItem = list.push(newItem);
    const listWithoutNewItem = listReducer(listWithNewItem, editModeOff(newItem));
    expect(listWithNewItem.size - 1).toBe(listWithoutNewItem.size);
  });
});
