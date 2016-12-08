/**
 * Gets the repositories of the user from Github
 */

import { call } from 'redux-saga/effects';

function* defaultSaga() {
  yield call(console.log, 'hello HomePage Saga!'); // eslint-disable-line no-console
}

// Bootstrap sagas
export default [
  defaultSaga,
];
