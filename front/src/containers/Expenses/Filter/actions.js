/**
 * Expenses Actions
 */

import {
  TOGGLE_FILTER,
  UPDATE_FILTER,
  START_UPDATE_FILTER,
  END_UPDATE_FILTER,
} from './constants';

const action = type => payload => ({ type, payload });

export const toggleFilter = action(TOGGLE_FILTER);
export const updateFilter = action(UPDATE_FILTER);
export const startUpdateFilter = action(START_UPDATE_FILTER);
export const endUpdateFilter = action(END_UPDATE_FILTER);
