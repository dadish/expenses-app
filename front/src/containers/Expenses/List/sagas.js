import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { api } from 'main/config';
import request from 'utils/request';
import { resetList } from './actions';
import { setTotalItems, listUpdateStart, listUpdateStop } from '../actions';
import { selectQuery } from './selectors';

const url = `${api.url}${api.path.expenses}`;

export function* loadList() {
  const query = yield select(selectQuery());
  yield put(listUpdateStart());
  const data = yield call(request, url, null, 'get', query);
  if (data.err) {
    yield call(alert, data.err);
  } else if (data.res) {
    const { total, list } = data.res.body;
    yield put(setTotalItems(total));
    yield put(resetList(fromJS(list)));
  }
  yield put(listUpdateStop());
}
