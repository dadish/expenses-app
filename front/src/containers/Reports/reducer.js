import { fromJS } from 'immutable';
import {
  SET_CURRENT_PAGE,
  SET_ITEMS_PER_PAGE,
  SET_TOTAL_ITEMS,
  LIST_UPDATE_START,
  LIST_UPDATE_STOP,
} from './constants';
import { RESET_LIST } from './List/constants';
import listReducer from './List/reducer';

export const initialState = fromJS({
  list: [],
  currentPage: 1,
  itemsPerPage: 25,
  totalItems: 120,
  updating: false,
});

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_LIST:
      return state.set('list', listReducer(state.get('list'), action));
    case SET_CURRENT_PAGE:
      return state.set('currentPage', payload);
    case SET_ITEMS_PER_PAGE:
      return state.set('itemsPerPage', payload);
    case SET_TOTAL_ITEMS:
      return state.set('totalItems', payload);
    case LIST_UPDATE_START:
      return state.set('updating', true);
    case LIST_UPDATE_STOP:
      return state.set('updating', false);
    default:
      return state;
  }
};

export default reducer;
