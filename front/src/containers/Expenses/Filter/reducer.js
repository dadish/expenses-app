/**
 * Expenses Filter reducer
 */
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER,
  UPDATE_FILTER,
} from './constants';

export const initialState = () => fromJS({
  on: false,
  fields: {
    user: '',
    comment: '',
    description: '',
    amount: '',
    date: '',
  },
});

const reducer = (state = initialState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_FILTER:
      return state.set('on', !state.get('on'));
    case UPDATE_FILTER:
      if (!payload) return state;
      return state.setIn(['fields', payload.field], payload.value);
    default:
      return state;
  }
};

export default reducer;
