import {
  resetList,
  loadList,
} from '../actions';
import {
  RESET_LIST,
  LOAD_LIST,
} from '../constants';

const actionsMap = {
  resetList: {
    name: 'resetList',
    method: resetList,
    constant: RESET_LIST,
  },
  loadList: {
    name: 'loadList',
    method: loadList,
    constant: LOAD_LIST,
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
