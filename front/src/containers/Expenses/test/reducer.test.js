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
import { setCurrentPage, setItemsPerPage, setTotalItems } from '../actions';
import ExpensesReducer, { initialState } from '../reducer';

describe('ExpensesReducer', () => {
  it('returns default state if no state with unknow action is provided', () => {
    expect(ExpensesReducer(undefined, { type: 'adsfva' })).toBe(initialState);
  });

  it('sets the limit for setItemsPerPage action', () => {
    const limit = 32546;
    const state = ExpensesReducer(undefined, setItemsPerPage(limit));
    expect(state.get('itemsPerPage')).toBe(limit);
  });

  it('sets the total for setTotalItems action', () => {
    const total = 32546;
    const state = ExpensesReducer(undefined, setTotalItems(total));
    expect(state.get('totalItems')).toBe(total);
  });

  it('sets the page for setCurrentPage action', () => {
    const page = 32546;
    const state = ExpensesReducer(undefined, setCurrentPage(page));
    expect(state.get('currentPage')).toBe(page);
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
