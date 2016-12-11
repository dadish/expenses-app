import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import {
  CREATE,
  EDIT_MODE_ON,
  EDIT_MODE_OFF,
  SAVE_SUCCESS,
  SAVE_ERROR,
  SAVE,
  DELETE,
  DELETE_ERROR,
  DELETE_SUCCESS,
} from './constants';

export const initialState = () => fromJS({
  cid: uniqueId('expense_'),
  id: 0,
  user: 0,
  amount: 0,
  date: new Date().toISOString(),
  comment: '',
  description: '',
  userEmail: '',
  edit: false,
  saving: false,
  deleting: false,
});

const reducer = (state = initialState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE:
      break;
    default:
      if (!state.get('id') || state.get('id') !== payload.get('id')) {
        if (state.get('cid') !== payload.get('cid')) return state;
      }
      break;
  }
  switch (type) {
    case EDIT_MODE_ON:
      return state.set('edit', true);
    case EDIT_MODE_OFF:
      return state.set('edit', false);
    case SAVE:
      return state.set('saving', true);
    case SAVE_SUCCESS:
      return state.merge(payload).set('saving', false);
    case SAVE_ERROR:
      return state.set('saving', false);
    case CREATE:
      return state.merge(payload || {});
    case DELETE:
      return state.set('deleting', true);
    case DELETE_SUCCESS:
    case DELETE_ERROR:
      return state.set('deleting', false);
    default:
      return state;
  }
};

export default reducer;
