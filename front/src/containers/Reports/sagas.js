import { fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { loadList } from './List/sagas';
import { LOAD_LIST } from './List/constants';

let watcher = null;

function* onLocationChange(action) {
  if (action.payload.pathname !== '/expenses') {
    yield cancel(watcher);
    watcher = null;
  }
}

function* actionsWatcher() {
  yield fork(takeLatest, LOCATION_CHANGE, onLocationChange);
  yield fork(takeLatest, LOAD_LIST, loadList);
}

function* main() {
  // Do not execute any code if watcher is already is expensening
  if (watcher) return;

  // start the SAVE action watcher
  watcher = yield fork(actionsWatcher);
}

export default [
  loadList,
  main,
];
