/**
 * Expenses Filter reducer
 */
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER,
  START_FILTERING,
  END_FILTERING,
} from './constants';

export const initialState = () => fromJS({
  on: false,
  updating: false,
});

const reducer = (state = initialState(), action) => {
  const { type } = action;
  switch (type) {
    case TOGGLE_FILTER:
      return state.set('on', !state.get('on'));
    case START_FILTERING:
      return state.set('updating', true);
    case END_FILTERING:
      return state.set('updating', false);
    default:
      return state;
  }
};

export default reducer;
