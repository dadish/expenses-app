/**
 * Registers the user for the app
 */
import { takeEvery } from 'redux-saga';
import { fork, cancel, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { SubmissionError } from 'redux-form/immutable';
import { api } from 'main/config';
import request from 'utils/request';
import boomToReduxForm from 'utils/boomToReduxForm';
import auth from 'auth';
import { setUser } from 'containers/App/actions';
import { SUBMIT } from './constants';

let watcher = null;
const url = `${api.url}${api.path.register}`;

export function* submit(action) {
  const { payload } = action;
  const resolve = payload.get('res');
  const reject = payload.get('rej');
  const body = {
    email: payload.get('email'),
    password: payload.get('password'),
    passwordConfirm: payload.get('passwordConfirm'),
  };
  const data = yield call(request, url, body);
  if (data.err) {
    if (data.err.status === 401) {
      yield call(reject, new SubmissionError({ _error: data.err.response.body.message }));
    } else if (data.err.status === 400) {
      yield call(reject, boomToReduxForm(data.err.response.body));
    } else {
      yield call(reject, new SubmissionError({ _error: data.err.response.body.message }));
    }
  } else if (data.res) {
    yield put(setUser(data.res.body));
    yield call(resolve, data.res.body);
    if (auth.loggedIn()) {
      yield put(push('/'));
    }
  }
}

function* onLocationChange(action) {
  if (action.payload.pathname !== '/register') {
    yield cancel(watcher);
    watcher = null;
  }
}

export function* actionsWatcher() {
  yield fork(takeEvery, SUBMIT, submit);
  yield fork(takeEvery, LOCATION_CHANGE, onLocationChange);
}

export function* main() {
  // Do not execute any code if watcher is already is running
  if (watcher) return;

  // start the SAVE action watcher
  watcher = yield fork(actionsWatcher);
}

// Bootstrap sagas
export default [
  main,
];
