/**
 * Expenses List actions
 */

import {
  RESET_LIST,
  LOAD_LIST,
} from './constants';

const action = type => payload => ({ type, payload });

export const resetList = action(RESET_LIST);
export const loadList = action(LOAD_LIST);
