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
  const values = yield select(selectFormValue, 'user', 'comment', 'description', 'amount.min', 'amount.max');
  let urlWithQuery = `${url}?`;
  urlWithQuery = Object.keys(values).reduce((memo, key) => {
    let result = memo;
    const value = values[key];
    if (key === 'amount') {
      if (value.min) result += `${key}Min=${value.min * 100}&`;
      if (value.max) result += `${key}Max=${value.max * 100}&`;
      return result;
    }
    return `${result}${key}=${value}&`;
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
