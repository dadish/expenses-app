import {
  toggleFilter,
} from '../actions';
import {
  TOGGLE_FILTER,
} from '../constants';

const actionsMap = {
  toggleFilter: {
    name: 'toggleFilter',
    method: toggleFilter,
    constant: TOGGLE_FILTER,
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
