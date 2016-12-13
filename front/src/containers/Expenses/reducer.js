import { fromJS } from 'immutable';
import { RESET_LIST } from './List/constants';
import listReducer from './List/reducer';
import { TOGGLE } from './Filter/constants';
import filterReducer, {
  initialState as initialFilterState,
} from './Filter/reducer';
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
});

const reducer = (state = initialState, action) => {
  const { type } = action;
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
    case TOGGLE:
      return state.set('filter', filterReducer(state.get('filter'), action));
    default:
      return state;
  }
};

export default reducer;
