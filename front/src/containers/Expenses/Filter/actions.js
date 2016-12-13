/**
 * Expenses Actions
 */

import {
  TOGGLE,
} from './constants';

const action = type => payload => ({ type, payload });

export const toggle = action(TOGGLE);
