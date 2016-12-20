/**
 * Expenses Item actions
 */
import {
  CREATE,
} from './constants';

const action = type => payload => ({ type, payload });

export const create = action(CREATE);
