import {
  toggleFilter,
  startFiltering,
  endFiltering,
} from '../actions';
import {
  TOGGLE_FILTER,
  START_FILTERING,
  END_FILTERING,
} from '../constants';

const actionsMap = {
  toggleFilter: {
    name: 'toggleFilter',
    method: toggleFilter,
    constant: TOGGLE_FILTER,
  },
  startFiltering: {
    name: 'startFiltering',
    method: startFiltering,
    constant: START_FILTERING,
  },
  endFiltering: {
    name: 'endFiltering',
    method: endFiltering,
    constant: END_FILTERING,
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
