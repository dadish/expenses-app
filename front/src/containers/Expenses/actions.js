/**
 * Expenses actions
 */

import {
  SET_PAGE,
  SET_LIMIT,
  SET_TOTAL,
} from './constants';

const action = type => payload => ({ type, payload });

export const setPage = action(SET_PAGE);
export const setLimit = action(SET_LIMIT);
export const setTotal = action(SET_TOTAL);
