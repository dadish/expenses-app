import expect from 'expect';
import { fromJS } from 'immutable';
import appReducer, { initialState } from '../reducer';
import { setUser, unsetUser } from '../actions';

const payload = fromJS({
  id: 1,
  email: 'dada@da.da',
  role: 100,
});

describe('appReducer()', () => {
  it('returns default state if nothing is passed', () => {
    const state = appReducer(undefined, fromJS({ type: 'foo' }));
    expect(state).toExist();
    expect(state.get('user')).toBe(initialState.get('user'));
  });
  it('sets the payload object as user property for SET_USER action', () => {
    const state = appReducer(initialState, setUser(payload));
    expect(state).toExist();
    expect(state.get('user')).toEqual(payload);
  });
  it('sets the `user` to initialState for UNSET_USER action', () => {
    let state = appReducer(initialState, setUser(payload));
    expect(state).toExist();
    expect(state.get('user')).toEqual(payload);
    state = appReducer(state, unsetUser());
    expect(state.getIn(['user', 'id'])).toBe(initialState.getIn(['user', 'id']));
    expect(state.getIn(['user', 'email'])).toBe(initialState.getIn(['user', 'email']));
    expect(state.getIn(['user', 'role'])).toBe(initialState.getIn(['user', 'role']));
  });
});
