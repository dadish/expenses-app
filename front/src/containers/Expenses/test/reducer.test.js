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

  it('returns default state if state with unknow action is provided', () => {
    expect(ExpensesReducer(initialState, { type: 'adsfva' })).toBe(initialState);
  });

  describe('sets the itemsPerPage for setItemsPerPage action', () => {
    it('with provided state', () => {
      const limit = 32546;
      const state = ExpensesReducer(initialState, setItemsPerPage(limit));
      expect(state.get('itemsPerPage')).toBe(limit);
    });
    it('without provided state', () => {
      const limit = 32546;
      const state = ExpensesReducer(undefined, setItemsPerPage(limit));
      expect(state.get('itemsPerPage')).toBe(limit);
    });
  });

  describe('sets the totalItems for setTotalItems action', () => {
    it('with provided state', () => {
      const total = 32546;
      const state = ExpensesReducer(initialState, setTotalItems(total));
      expect(state.get('totalItems')).toBe(total);
    });
    it('without provided state', () => {
      const total = 32546;
      const state = ExpensesReducer(undefined, setTotalItems(total));
      expect(state.get('totalItems')).toBe(total);
    });
  });

  describe('sets the currentPage for setCurrentPage action', () => {
    it('with provided state', () => {
      const page = 32546;
      const state = ExpensesReducer(initialState, setCurrentPage(page));
      expect(state.get('currentPage')).toBe(page);
    });
    it('without provided state', () => {
      const page = 32546;
      const state = ExpensesReducer(undefined, setCurrentPage(page));
      expect(state.get('currentPage')).toBe(page);
    });
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
      it(`${methodName} action without errors when state provided`, () => {
        const method = actions[methodName];
        const state = ExpensesReducer(initialState, method());
        expect(state).toBeA(Map);
        expect(state.get('list')).toBeA(List);
      });
      it(`${methodName} action without errors when state is not provided`, () => {
        const method = actions[methodName];
        const state = ExpensesReducer(undefined, method());
        expect(state).toBeA(Map);
        expect(state.get('list')).toBeA(List);
      });
    });
  });
});
