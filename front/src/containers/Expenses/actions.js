/**
 * Expenses actions
 */

import {
  SET_CURRENT_PAGE,
  SET_ITEMS_PER_PAGE,
  SET_TOTAL_ITEMS,
  LIST_UPDATE_START,
  LIST_UPDATE_STOP,
} from './constants';

const action = type => payload => ({ type, payload });

export const setCurrentPage = action(SET_CURRENT_PAGE);
export const setItemsPerPage = action(SET_ITEMS_PER_PAGE);
export const setTotalItems = action(SET_TOTAL_ITEMS);
export const listUpdateStart = action(LIST_UPDATE_START);
export const listUpdateStop = action(LIST_UPDATE_STOP);
