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
  switch (type) {
    case RESET_LIST:
      return (payload || initialState).map(item => itemReducer(undefined, create(item)));
    case EDIT_MODE_ON:
    case EDIT_MODE_OFF:
    case SAVE:
    case SAVE_SUCCESS:
    case SAVE_ERROR:
    case DELETE:
    case DELETE_ERROR:
      return state.map(item => itemReducer(item, action));
    case DELETE_SUCCESS:
      index = state.findIndex(item => item.get('id') === payload.get('id'));
      return state.remove(index);
    case CREATE:
      return state.push(itemReducer(undefined, action));
    default:
      return state;
  }
};

export default reducer;
