/**
 * Expenses Actions
 */

import {
  TOGGLE_FILTER,
} from './constants';

const action = type => payload => ({ type, payload });

export const toggleFilter = action(TOGGLE_FILTER);
