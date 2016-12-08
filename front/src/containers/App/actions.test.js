import expect from 'expect';
import {
  setUser,
  unsetUser,
  logout,
} from './actions';
import {
  SET_USER,
  UNSET_USER,
  LOGOUT,
} from './constants';

const actionsMap = {
  setUser: { constant: SET_USER, method: setUser },
  unsetUser: { constant: UNSET_USER, method: unsetUser },
  logout: { constant: LOGOUT, method: logout },
};

Object.keys(actionsMap).forEach((key) => {
  const { constant, method } = actionsMap[key];
  describe(`${key}()`, () => {
    it('creates an object', () => {
      expect(method()).toBeAn(Object);
    });
    it('creates the right type', () => {
      expect(method().type).toBe(constant);
    });
    it('sets the first argument as a payload', () => {
      const target = {};
      expect(method(target).payload).toBe(target);
    });
  });
});
