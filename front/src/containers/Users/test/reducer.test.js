import expect from 'expect';
import { List, Map } from 'immutable';
import { resetList } from 'containers/Users/List/actions';
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
} from 'containers/Users/Item/actions';
import UsersReducer, { initialState } from '../reducer';

describe('UsersReducer', () => {
  it('returns default state if no state with unknow action is provided', () => {
    expect(UsersReducer(undefined, { type: 'adsfva' })).toBe(initialState);
  });

  describe('UsersReducer handles', () => {
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
        const state = UsersReducer(undefined, method());
        expect(state).toBeA(Map);
        expect(state.get('list')).toBeA(List);
      });
    });
  });
});
