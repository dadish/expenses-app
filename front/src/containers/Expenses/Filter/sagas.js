import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { FORM_NAME } from './constants';
import { setCurrentPage } from '../actions';
import { loadList } from '../List/sagas';

export function* filterExpenses(action) {
  const { meta } = action;
  if (meta.form !== FORM_NAME) return;
  // debounce the actions that occur while user is typing
  yield delay(500);
  yield put(setCurrentPage(1));
  yield call(loadList);
}

export function* onFilterDestroy(action) {
  const { meta } = action;
  if (meta.form !== FORM_NAME) return;
  yield put(setCurrentPage(1));
  yield call(loadList);
}
