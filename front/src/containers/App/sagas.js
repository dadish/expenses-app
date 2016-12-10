import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { api } from 'main/config';
import { unsetUser } from './actions';
import { LOGOUT } from './constants';

const logoutUrl = `${api.url}${api.path.logout}`;

export function* logoutSaga() {
  yield put(unsetUser());
  yield put(push('/login'));
  yield call(request, logoutUrl);
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
