import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import {
  CREATE,
} from './constants';

export const initialState = () => fromJS({
  cid: uniqueId('report_'),
  weekStart: new Date().toISOString(),
  totalSpent: 0,
});

const reducer = (state = initialState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE:
      return state.merge(payload || {});
    default:
      return state;
  }
};

export default reducer;
