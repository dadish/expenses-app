import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { api } from 'main/config';
import { unsetUser } from './actions';
import { LOGOUT } from './constants';

const logoutUrl = `${api.url}${api.path.logout}`;

export function* logoutSaga() {
  const data = yield call(request, logoutUrl);
  if (data.err) {
    alert(data); // eslint-disable-line no-alert
  } else {
    yield put(unsetUser());
    yield put(push('/login'));
  }
}

export function* watcherSaga() {
  yield fork(takeLatest, LOGOUT, logoutSaga);
}

export function* main() {
  yield fork(watcherSaga);
}

export default [
  main,
];
