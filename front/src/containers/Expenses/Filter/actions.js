/**
 * Expenses Actions
 */

import {
  TOGGLE_FILTER,
  UPDATE_FILTER,
} from './constants';

const action = type => payload => ({ type, payload });

export const toggleFilter = action(TOGGLE_FILTER);
export const updateFilter = action(UPDATE_FILTER);
