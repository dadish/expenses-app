/**
 * Gets the repositories of the user from Github
 */
import { takeEvery } from 'redux-saga';
import { fork, cancel, call, put } from 'redux-saga/effects';
import { LOCATION_CHANGE, replace } from 'react-router-redux';
import { SubmissionError, change } from 'redux-form/immutable';
import { api } from 'main/config';
import request from 'utils/request';
import boomToReduxForm from 'utils/boomToReduxForm';
import auth from 'auth';
import { setUser } from 'containers/App/actions';
import { SUBMIT_START, SUBMIT_END } from 'containers/App/constants';
import {
  SUBMIT,
  FORM_NAME,
  FORM_FIELD_SUBMIT,
  COOKIE_LOGIN,
} from './constants';

let watcher = null;
const url = `${api.url}${api.path.login}`;

export function* submit(action) {
  const { payload } = action;
  const resolve = payload.get('res');
  const reject = payload.get('rej');
  const nextPathname = payload.get('nextPathname') || '/';
  const body = {
    email: payload.get('email'),
    password: payload.get('password'),
  };
  yield put(change(FORM_NAME, FORM_FIELD_SUBMIT, SUBMIT_START));
  const data = yield call(request, url, body);
  if (data.err) {
    if (data.err.status === 401) {
      yield call(reject, new SubmissionError({ _error: data.err.response.body.message }));
    } else if (data.err.status === 400) {
      yield call(reject, boomToReduxForm(data.err.response.body));
    } else {
      yield call(reject, new SubmissionError({ _error: data.err.message }));
    }
    yield put(change(FORM_NAME, FORM_FIELD_SUBMIT, SUBMIT_END));
  } else if (data.res) {
    yield put(setUser(data.res.body));
    yield call(resolve, data.res.body);
    yield put(replace(auth.allowedPath(nextPathname)));
    yield put(change(FORM_NAME, FORM_FIELD_SUBMIT, SUBMIT_END));
  }
}

export function* cookieLogin(action) {
  const data = yield call(request, url);
  if (!data.err && data.res) {
    yield put(setUser(data.res.body));
    if (auth.loggedIn()) {
      const user = auth.getUser();
      if ([200, 300].indexOf(user.role) === -1) yield put(replace('/expenses'));
      else yield put(replace(action.payload || '/'));
    }
  }
}

function* onLocationChange(action) {
  if (action.payload.pathname !== '/login') {
    yield cancel(watcher);
    watcher = null;
  }
}

export function* actionsWatcher() {
  yield fork(takeEvery, SUBMIT, submit);
  yield fork(takeEvery, COOKIE_LOGIN, cookieLogin);
  yield fork(takeEvery, LOCATION_CHANGE, onLocationChange);
}

export function* main() {
  // Do not execute any code if watcher is already is expensening
  if (watcher) return;

  // start the SAVE action watcher
  watcher = yield fork(actionsWatcher);
}

// Bootstrap sagas
export default [
  main,
];
