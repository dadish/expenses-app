import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { api } from 'main/config';
import request from 'utils/request';
import { resetList } from './actions';

const url = `${api.url}${api.path.expenses}`;

export function* initialLoad() {
  const data = yield call(request, url);
  if (data.err) {
    yield call(alert, data.err);
  } else if (data.res) {
    yield put(resetList(fromJS(data.res.body)));
  }
}
