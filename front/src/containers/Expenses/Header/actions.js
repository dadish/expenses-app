/**
 * Expenses Item actions
 */
import {
  SET_SORT_FIELD,
  SET_SORT_DIRECTION,
} from './constants';

const action = type => payload => ({ type, payload });

export const setSortField = action(SET_SORT_FIELD);
export const setSortDirection = action(SET_SORT_DIRECTION);
