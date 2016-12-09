/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { SET_USER, UNSET_USER } from './constants';

// The initial state of the App
export const initialState = fromJS({
  user: {
    id: 0,
    email: '',
    role: 0,
  },
});

const appReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return state.set('user', state.get('user').merge(payload));
    case UNSET_USER:
      return state.set('user', initialState.get('user'));
    default:
      return state;
  }
};

export default appReducer;
