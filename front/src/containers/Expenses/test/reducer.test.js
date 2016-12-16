import expect from 'expect';
import { List, Map } from 'immutable';
import { resetList } from 'containers/Expenses/List/actions';
import { toggleFilter, startFiltering, endFiltering } from 'containers/Expenses/filter/actions';
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
import { setPage, setLimit, setTotal } from '../actions';
import ExpensesReducer, { initialState } from '../reducer';

describe('ExpensesReducer', () => {
  it('returns default state if no state with unknow action is provided', () => {
    expect(ExpensesReducer(undefined, { type: 'adsfva' })).toBe(initialState);
  });

  it('sets the limit for setLimit action', () => {
    const limit = 32546;
    const state = ExpensesReducer(undefined, setLimit(limit));
    expect(state.get('limit')).toBe(limit);
  });

  it('sets the total for setTotal action', () => {
    const total = 32546;
    const state = ExpensesReducer(undefined, setTotal(total));
    expect(state.get('total')).toBe(total);
  });

  it('sets the page for setPage action', () => {
    const page = 32546;
    const state = ExpensesReducer(undefined, setPage(page));
    expect(state.get('page')).toBe(page);
  });

  describe('handles', () => {
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
      toggleFilter,
      startFiltering,
      endFiltering,
    };
    Object.keys(actions).forEach((methodName) => {
      it(`${methodName} action without errors`, () => {
        const method = actions[methodName];
        const state = ExpensesReducer(initialState, method());
        expect(state).toBeA(Map);
        expect(state.get('list')).toBeA(List);
      });
    });
  });
});
