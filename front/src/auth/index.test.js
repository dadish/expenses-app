import expect from 'expect';
import { fromJS } from 'immutable';
import auth from './index';

describe('Auth module', () => {
  let state = fromJS({
    global: {
      user: {
        id: 0,
        email: '',
        role: 0,
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

  describe('allowedPath()', () => {
    it('returns `/login` if user is not logged in', () => {
      const requestedPath = '/loon';
      state = state.setIn(['global', 'user', 'id'], 0);
      expect(auth.allowedPath(requestedPath)).toBe('/login');
    });
    it('returns `/expenses` if logged in and role is 100', () => {
      const requestedPath = '/loon';
      state = state.setIn(['global', 'user'], fromJS({
        id: 1,
        role: 100,
      }));
      expect(auth.allowedPath(requestedPath)).toBe('/expenses');
    });
    it('returns `/expenses` by default if logged in and role is other than 100', () => {
      const requestedPath = '/loon';
      state = state.setIn(['global', 'user'], fromJS({
        id: 1,
        role: 200,
      }));
      expect(auth.allowedPath(requestedPath)).toBe('/expenses');
    });
    it('returns requestedPath if it is either `/expenses` or `/users` and logged in user has a role other than 100', () => {
      const requestedPath = '/users';
      state = state.setIn(['global', 'user'], fromJS({
        id: 1,
        role: 200,
      }));
      expect(auth.allowedPath(requestedPath)).toBe(requestedPath);
    });
  });
});
