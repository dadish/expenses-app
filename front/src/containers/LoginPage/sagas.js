/**
 * Gets the repositories of the user from Github
 */
import { takeLatest } from 'redux-saga';
import { fork, take, cancel, call, put } from 'redux-saga/effects';
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

const url = `${api.url}${api.path.login}`;

export function* submit(action) {
  const { payload } = action;
  const resolve = payload.get('res');
  const reject = payload.get('rej');
  const nextPathname = payload.get('nextPathname');
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
    if (auth.loggedIn()) {
      yield put(replace(nextPathname));
    } else {
      yield put(change(FORM_NAME, FORM_FIELD_SUBMIT, SUBMIT_END));
    }
  }
}

export function* cookieLogin(action) {
  const data = yield call(request, url);
  if (!data.err && data.res) {
    yield put(setUser(data.res.body));
    if (auth.loggedIn()) {
      yield put(replace(action.payload));
    }
  }
}

export function* submitWatcher() {
  yield fork(takeLatest, SUBMIT, submit);
  yield fork(takeLatest, COOKIE_LOGIN, cookieLogin);
}

export function* main() {
  // start the SUBMIT action watcher
  const watcher = yield fork(submitWatcher);

  // continue watching until the LOCATION_CHANGE
  // action is dispatched with pathname other than
  // login
  let action = false;
  while (!action || (action.payload.pathname && action.payload.pathname !== 'login')) {
    action = yield take(LOCATION_CHANGE);
  }

  // If react-router-redux dispatched the LOCATION_CHANGE
  // action then the LoginPage container no longer relevant
  // and SUBMIT actions from it will not dispatched
  // thus stop watching for SUBMIT actions from LoginPage
  // container
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  main,
];
