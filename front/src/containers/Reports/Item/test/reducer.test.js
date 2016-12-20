import expect from 'expect';
import { fromJS } from 'immutable';
import itemReducer, { initialState } from '../reducer';
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
} from '../actions';

const payload = fromJS({});

describe('itemReducer', () => {
  it('returns default initialState if state is not given', () => {
    const state = itemReducer(undefined, { payload });
    expect(state.delete('cid').delete('date')).toEqual(initialState().delete('cid').delete('date'));
  });
  it('returns default initialState if state is given but type is unknown', () => {
    const initial = initialState();
    const state = itemReducer(initial, { payload: initial });
    expect(state).toBe(initial);
  });
  it('returns default initialState if state with id is given but type is unknown', () => {
    const initial = initialState().set('id', 1);
    const state = itemReducer(initial, { payload: initial });
    expect(state).toBe(initial);
  });
  it('sets edit=true for editModeOn() action', () => {
    const initial = initialState();
    expect(initial.get('edit')).toBe(false);
    const state = itemReducer(initial, editModeOn(initial));
    expect(state.get('edit')).toBe(true);
  });
  it('set edit=false for editModeOff() action', () => {
    const initial = initialState().set('edit', true);
    expect(initial.get('edit')).toBe(true);
    const state = itemReducer(initial, editModeOff(initial));
    expect(state.get('edit')).toBe(false);
  });
  it('sets saving=true for save() action', () => {
    const initial = initialState();
    expect(initial.get('saving')).toBe(false);
    const state = itemReducer(initial, save(initial));
    expect(state.get('saving')).toBe(true);
  });
  it('sets saving=false for saveError() action', () => {
    const initial = initialState().set('saving', true);
    expect(initial.get('saving')).toBe(true);
    const state = itemReducer(initial, saveError(initial));
    expect(state.get('saving')).toBe(false);
  });
  it('set saving=false and merges the action.payload for saveSuccess() action', () => {
    const initial = initialState().set('saving', true);
    expect(initial.get('saving')).toBe(true);
    const email = 'adkvmhfbnda';
    const role = 21454213;
    const state = itemReducer(initial, saveSuccess(initial.merge({ email, role })));
    expect(state.get('saving')).toBe(false);
    expect(state.get('email')).toBe(email);
    expect(state.get('role')).toBe(role);
  });
  it('sets deleting=true for del() action', () => {
    const initial = initialState();
    expect(initial.get('deleting')).toBe(false);
    const state = itemReducer(initial, del(initial));
    expect(state.get('deleting')).toBe(true);
  });
  it('sets deleting=false for deleteSuccess() action', () => {
    const initial = initialState().set('delete', true);
    expect(initial.get('delete')).toBe(true);
    const state = itemReducer(initial, deleteSuccess(initial));
    expect(state.get('deleting')).toBe(false);
  });
  it('sets deleting=false for deleteError() action', () => {
    const initial = initialState().set('delete', true);
    expect(initial.get('delete')).toBe(true);
    const state = itemReducer(initial, deleteError(initial));
    expect(state.get('deleting')).toBe(false);
  });
  it('returns defualt initialState for create() action if not state provided', () => {
    const state = itemReducer(undefined, create());
    expect(state.delete('cid').delete('date')).toEqual(initialState().delete('cid').delete('date'));
  });
  it('merges payload with initialState for create() action', () => {
    const comment = 'adkvmhfbnda';
    const amount = 21454213;
    const initial = initialState();
    const modified = initial.merge({
      comment,
      amount,
    });
    const state = itemReducer(initial, create(modified));
    expect(state).toEqual(modified);
  });
});
