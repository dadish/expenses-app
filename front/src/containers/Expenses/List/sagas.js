import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { api } from 'main/config';
import request from 'utils/request';
import { resetList } from './actions';
import { setPage, setLimit, setTotal } from '../actions';

const url = `${api.url}${api.path.expenses}`;

export function* initialLoad() {
  const data = yield call(request, url);
  if (data.err) {
    yield call(alert, data.err);
  } else if (data.res) {
    const { page, total, limit, list } = data.res.body;
    yield put(setPage(page));
    yield put(setLimit(limit));
    yield put(setTotal(total));
    yield put(resetList(fromJS(list)));
  }
}
