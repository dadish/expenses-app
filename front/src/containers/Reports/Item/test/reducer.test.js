import expect from 'expect';
import { fromJS } from 'immutable';
import itemReducer, { initialState } from '../reducer';
import {
  create,
} from '../actions';

const payload = fromJS({});

describe('itemReducer', () => {
  it('returns default initialState if state is not given', () => {
    const state = itemReducer(undefined, { payload });
    expect(state.delete('cid').delete('weekStart')).toEqual(initialState().delete('cid').delete('weekStart'));
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
  it('returns defualt initialState for create() action if not state provided', () => {
    const state = itemReducer(undefined, create());
    expect(state.delete('cid').delete('weekStart')).toEqual(initialState().delete('cid').delete('weekStart'));
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
