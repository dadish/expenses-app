import expect from 'expect';
import { fromJS } from 'immutable';
import auth from './index';

describe('Auth module', () => {
  let state = fromJS({
    global: {
      user: {
        id: null,
      },
    },
  });

  const store = {
    getState() {
      return state;
    },
  };

  auth.setStore(store);

  it('throws if setStore is called more that once', () => {
    const test = () => auth.setStore(store);
    expect(test).toThrow();
  });

  describe('loggedIn()', () => {
    it('returns false if global.user.id is falsy', () => {
      expect(auth.loggedIn()).toBe(false);
    });
    it('returns true if global.user.id is truethy', () => {
      state = state.setIn(['global', 'user', 'id'], 1);
      expect(auth.loggedIn()).toBe(true);
    });
  });
});
