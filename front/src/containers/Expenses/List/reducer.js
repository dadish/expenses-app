import { fromJS } from 'immutable';
import { RESET_LIST } from './constants';
import { create } from '../Item/actions';
import itemReducer from '../Item/reducer';
import {
  EDIT_MODE_ON,
  EDIT_MODE_OFF,
  SAVE,
  SAVE_SUCCESS,
  SAVE_ERROR,
  CREATE,
  DELETE,
  DELETE_SUCCESS,
  DELETE_ERROR,
} from '../Item/constants';

const initialState = fromJS([]);

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  let index;
  let itemState;
  switch (type) {
    case RESET_LIST:
      return (payload || initialState).map(item => itemReducer(undefined, create(item)));
    case EDIT_MODE_ON:
    case SAVE:
    case SAVE_SUCCESS:
    case SAVE_ERROR:
    case DELETE:
    case DELETE_ERROR:
      index = state.findIndex(item => item.get('cid') === payload.get('cid'));
      if (index === -1) return state;
      return state.set(index, itemReducer(state.get(index), action));
    case EDIT_MODE_OFF:
      index = state.findIndex(item => item.get('cid') === payload.get('cid'));
      if (index === -1) return state;
      itemState = state.get(index);
      if (itemState.get('id')) return state.set(index, itemReducer(itemState, action));
      return state.remove(index);
    case DELETE_SUCCESS:
      index = state.findIndex(item => item.get('cid') === payload.get('cid'));
      return state.remove(index);
    case CREATE:
      return state.unshift(itemReducer(undefined, action));
    default:
      return state;
  }
};

export default reducer;
