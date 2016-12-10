/**
 * Expenses actions
 */

import {
  RESET_LIST,
} from './constants';

const action = type => payload => ({ type, payload });

export const resetList = action(RESET_LIST);
