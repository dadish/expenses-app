import { fromJS } from 'immutable';
import { SET_PAGE, SET_LIMIT, SET_TOTAL } from './constants';
import { RESET_LIST } from './List/constants';
import listReducer from './List/reducer';
import { TOGGLE_FILTER, START_FILTERING, END_FILTERING } from './Filter/constants';
import filterReducer, { initialState as initialFilterState } from './Filter/reducer';
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
} from './Item/constants';

export const initialState = fromJS({
  list: [],
  filter: initialFilterState(),
  page: 1,
  limit: 25,
  total: 120,
});

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_LIST:
    case EDIT_MODE_ON:
    case EDIT_MODE_OFF:
    case SAVE:
    case SAVE_SUCCESS:
    case SAVE_ERROR:
    case CREATE:
    case DELETE:
    case DELETE_SUCCESS:
    case DELETE_ERROR:
      return state.set('list', listReducer(state.get('list'), action));
    case TOGGLE_FILTER:
    case START_FILTERING:
    case END_FILTERING:
      return state.set('filter', filterReducer(state.get('filter'), action));
    case SET_PAGE:
      return state.set('page', payload);
    case SET_LIMIT:
      return state.set('limit', payload);
    case SET_TOTAL:
      return state.set('total', payload);
    default:
      return state;
  }
};

export default reducer;
