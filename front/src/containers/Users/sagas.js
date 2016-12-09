import { call, put, fork, cancel } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { fromJS } from 'immutable';
import { SubmissionError } from 'redux-form/immutable';
import { api } from 'main/config';
import request from 'utils/request';
import boomToReduxForm from 'utils/boomToReduxForm';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SAVE, DELETE } from './Item/constants';
import { resetList } from './List/actions';
import {
  saveError,
  saveSuccess,
  editModeOff,
  deleteError,
  deleteSuccess,
} from './Item/actions';

let watcher = null;
const url = `${api.url}${api.path.users}`;

function* saveItem(action) {
  const { payload } = action;
  const resolve = payload.get('res');
  const reject = payload.get('rej');
  let user = payload;
  const body = {
    email: user.get('email'),
    role: user.get('role'),
  };

  let data;
  if (user.get('id')) {
    data = yield call(request, `${url}/${user.get('id')}`, body, 'put');
  } else {
    data = yield call(request, url, body);
  }

  if (data.err) {
    if (data.err.status === 401) {
      yield call(alert, data.err.response.body.message);
    } else if (data.err.status === 400) {
      yield call(reject, boomToReduxForm(data.err.response.body));
    } else {
      yield call(reject, new SubmissionError({ _error: data.err.message }));
    }
    yield put(saveError(user));
  } else if (data.res) {
    user = user.merge(data.res.body);
    yield call(resolve, user);
    yield put(saveSuccess(user));
    yield put(editModeOff(user));
  }
}

function* deleteItem(action) {
  const expense = action.payload;
  const data = yield call(request, `${url}/${expense.get('id')}`, null, 'del');
  if (data.err) {
    yield call(alert, data.err.response.body.message);
    yield put(deleteError(expense));
  } else if (data.res) {
    yield put(deleteSuccess(expense));
  }
}

function* onLocationChange(action) {
  if (action.payload.pathname !== '/users') {
    yield cancel(watcher);
    watcher = null;
  }
}

function* actionsWatcher() {
  yield fork(takeEvery, SAVE, saveItem);
  yield fork(takeEvery, DELETE, deleteItem);
  yield fork(takeEvery, LOCATION_CHANGE, onLocationChange);
}

function* main() {
  // Do not execute any code if watcher is already is expensening
  if (watcher) return;

  // start the SAVE action watcher
  watcher = yield fork(actionsWatcher);
}

function* initialLoad() {
  const data = yield call(request, url);
  if (data.err) {
    yield call(alert, data.err);
  } else if (data.res) {
    yield put(resetList(fromJS(data.res.body)));
  }
}

export default [
  initialLoad,
  main,
];
