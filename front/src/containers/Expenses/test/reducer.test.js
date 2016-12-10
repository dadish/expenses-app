import expect from 'expect';
import { List, Map } from 'immutable';
import { resetList } from 'containers/Expenses/List/actions';
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
import ExpensesReducer, { initialState } from '../reducer';

describe('ExpensesReducer', () => {
  it('returns default state if no state with unknow action is provided', () => {
    expect(ExpensesReducer(undefined, { type: 'adsfva' })).toBe(initialState);
  });

  describe('ExpensesReducer handles', () => {
    const actions = {
      resetList,
      editModeOn,
      editModeOff,
      save,
      saveSuccess,
      saveError,
      create,
      del,
      deleteSuccess,
      deleteError,
    };
    Object.keys(actions).forEach((methodName) => {
      it(`${methodName} action without errors`, () => {
        const method = actions[methodName];
        const state = ExpensesReducer(undefined, method());
        expect(state).toBeA(Map);
        expect(state.get('list')).toBeA(List);
      });
    });
  });
});
