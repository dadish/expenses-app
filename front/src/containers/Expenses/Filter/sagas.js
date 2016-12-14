import { call, select, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form/immutable';
import trimEnd from 'lodash/trimEnd';
import request from 'utils/request';
import { api } from 'main/config';
import { resetList } from 'containers/Expenses/List/actions';
import { FORM_NAME } from './constants';
import { startFiltering, endFiltering } from './actions';

const url = `${api.url}${api.path.expensesFilter}`;

const selectFormValue = formValueSelector(FORM_NAME);

export function* filterExpenses(action) {
  const { meta } = action;
  yield delay(500); // this is how debounce the actions that occur when user types
  if (meta.form !== FORM_NAME) return;
  yield put(startFiltering());
  const values = yield select(selectFormValue, 'user', 'comment', 'description');
  let urlWithQuery = `${url}?`;
  urlWithQuery = Object.keys(values).reduce((result, key) => {
    const value = values[key];
    if (value) return `${result}${key}=${value}&`;
    return result;
  }, urlWithQuery);
  urlWithQuery = trimEnd(urlWithQuery, '&');
  const data = yield call(request, urlWithQuery);
  if (data.err) {
    yield call(alert, data.err.message);
  } else if (data.res) {
    yield put(resetList(fromJS(data.res.body)));
  }
  yield put(endFiltering());
}
