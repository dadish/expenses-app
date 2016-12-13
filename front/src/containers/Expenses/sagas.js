import { fork, cancel } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SAVE, DELETE } from './Item/constants';
import { saveItem, deleteItem } from './Item/sagas';
import { initialLoad } from './List/sagas';
import { updateMatches } from './ItemForm/UserAutoComplete/sagas';
import { UPDATE_MATCHES } from './ItemForm/UserAutoComplete/constants';

let watcher = null;

function* onLocationChange(action) {
  if (action.payload.pathname !== '/expenses') {
    yield cancel(watcher);
    watcher = null;
  }
}

function* actionsWatcher() {
  yield fork(takeEvery, SAVE, saveItem);
  yield fork(takeEvery, DELETE, deleteItem);
  yield fork(takeEvery, UPDATE_MATCHES, updateMatches);
  yield fork(takeEvery, LOCATION_CHANGE, onLocationChange);
}

function* main() {
  // Do not execute any code if watcher is already is expensening
  if (watcher) return;

  // start the SAVE action watcher
  watcher = yield fork(actionsWatcher);
}

export default [
  initialLoad,
  main,
];
