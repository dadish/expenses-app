/**
 * Expenses Filter reducer
 */
import { fromJS } from 'immutable';
import {
  TOGGLE_FILTER,
  UPDATE_FILTER,
  START_UPDATE_FILTER,
  END_UPDATE_FILTER,
} from './constants';

export const initialState = () => fromJS({
  on: false,
  updating: false,
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
    case START_UPDATE_FILTER:
      return state.set('updating', true);
    case END_UPDATE_FILTER:
      return state.set('updating', false);
    default:
      return state;
  }
};

export default reducer;
