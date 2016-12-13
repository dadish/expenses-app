import { call, select, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import trimEnd from 'lodash/trimEnd';
import request from 'utils/request';
import { api } from 'main/config';
import { resetList } from 'containers/Expenses/List/actions';
import { selectFilterFields } from './selectors';
import { startUpdateFilter, endUpdateFilter } from './actions';

const url = `${api.url}${api.path.expensesFilter}`;

export function* filterExpenses() {
  yield delay(500); // this is how debounce the actions that occur when user types
  yield put(startUpdateFilter());
  let urlWithQuery = `${url}?`;
  const fields = yield select(selectFilterFields());
  urlWithQuery = fields.reduce((result, value, key) => {
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
  yield put(endUpdateFilter());
}
