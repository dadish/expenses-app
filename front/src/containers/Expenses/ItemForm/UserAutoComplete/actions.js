/**
 * Expenses Item actions
 */
import {
  UPDATE_MATCHES,
} from './constants';

const action = type => payload => ({ type, payload });

export const updateMatches = action(UPDATE_MATCHES);
