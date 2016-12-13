/**
 * Expenses Filter reducer
 */
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER,
} from './constants';

export const initialState = () => fromJS({
  on: false,
});

const reducer = (state = initialState(), action) => {
  const { type } = action;
  switch (type) {
    case TOGGLE_FILTER:
      return state.set('on', !state.get('on'));
    default:
      return state;
  }
};

export default reducer;
