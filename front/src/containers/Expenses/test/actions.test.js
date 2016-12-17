import expect from 'expect';
import {
  SET_TOTAL_ITEMS,
  SET_CURRENT_PAGE,
  SET_ITEMS_PER_PAGE,
} from '../constants';
import {
  setTotalItems,
  setItemsPerPage,
  setCurrentPage,
} from '../actions';

const actionsMap = {
  setTotalItems: {
    name: 'setTotalItems',
    method: setTotalItems,
    constant: SET_TOTAL_ITEMS,
  },
  setItemsPerPage: {
    name: 'setItemsPerPage',
    method: setItemsPerPage,
    constant: SET_ITEMS_PER_PAGE,
  },
  setCurrentPage: {
    name: 'setCurrentPage',
    method: setCurrentPage,
    constant: SET_CURRENT_PAGE,
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
