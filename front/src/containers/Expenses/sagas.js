import { fork, cancel } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SAVE, DELETE } from './Item/constants';
import { saveItem, deleteItem } from './Item/sagas';
import { initialLoad } from './List/sagas';
import { updateMatches } from './ItemForm/UserAutoComplete/sagas';
import { UPDATE_MATCHES } from './ItemForm/UserAutoComplete/constants';
import { filterExpenses } from './Filter/sagas';
import { UPDATE_FILTER } from './Filter/constants';

let watcher = null;

function* onLocationChange(action) {
  if (action.payload.pathname !== '/expenses') {
    yield cancel(watcher);
    watcher = null;
  }
}

function* actionsWatcher() {
  yield fork(takeLatest, SAVE, saveItem);
  yield fork(takeLatest, DELETE, deleteItem);
  yield fork(takeLatest, UPDATE_MATCHES, updateMatches);
  yield fork(takeLatest, UPDATE_FILTER, filterExpenses);
  yield fork(takeLatest, LOCATION_CHANGE, onLocationChange);
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
