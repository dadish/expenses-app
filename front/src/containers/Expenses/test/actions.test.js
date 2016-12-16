import expect from 'expect';
import {
  SET_TOTAL,
  SET_PAGE,
  SET_LIMIT,
} from '../constants';
import {
  setTotal,
  setLimit,
  setPage,
} from '../actions';

const actionsMap = {
  setTotal: {
    name: 'setTotal',
    method: setTotal,
    constant: SET_TOTAL,
  },
  setLimit: {
    name: 'setLimit',
    method: setLimit,
    constant: SET_LIMIT,
  },
  setPage: {
    name: 'setPage',
    method: setPage,
    constant: SET_PAGE,
  },
};

Object.keys(actionsMap).forEach((key) => {
  const { method, name, constant } = actionsMap[key];
  describe(`action ${name}`, () => {
    it('returns the right type', () => {
      expect(method().type).toBe(constant);
    });
    it('sets the first argument to the payload property', () => {
      const target = {};
      expect(method(target).payload).toBe(target);
    });
  });
});
