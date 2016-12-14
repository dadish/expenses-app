/**
 * Expenses Actions
 */

import {
  TOGGLE_FILTER,
  START_FILTERING,
  END_FILTERING,
} from './constants';

const action = type => payload => ({ type, payload });

export const toggleFilter = action(TOGGLE_FILTER);
export const startFiltering = action(START_FILTERING);
export const endFiltering = action(END_FILTERING);
