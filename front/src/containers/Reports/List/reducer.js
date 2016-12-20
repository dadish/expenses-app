import { fromJS } from 'immutable';
import { RESET_LIST } from './constants';
import { create } from '../Item/actions';
import itemReducer from '../Item/reducer';

const initialState = fromJS([]);

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_LIST:
      return (payload || initialState).map(item => itemReducer(undefined, create(item)));
    default:
      return state;
  }
};

export default reducer;
