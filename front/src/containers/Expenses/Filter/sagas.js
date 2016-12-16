import { call, select, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form/immutable';
import trimEnd from 'lodash/trimEnd';
import request from 'utils/request';
import { api } from 'main/config';
import { resetList } from 'containers/Expenses/List/actions';
import { setTotal, setPage, setLimit } from 'containers/Expenses/actions';
import { FORM_NAME } from './constants';
import { startFiltering, endFiltering } from './actions';

const url = `${api.url}${api.path.expenses}`;

const selectFormValue = formValueSelector(FORM_NAME);

const filterableFields = [
  'user',
  'comment',
  'description',
  'amount.min',
  'amount.max',
  'date.from',
  'date.to',
];

export function* filterExpenses(action) {
  const { meta } = action;
  yield delay(500); // this is how debounce the actions that occur when user types
  if (meta.form !== FORM_NAME) return;
  yield put(startFiltering());
  const values = yield select(selectFormValue, ...filterableFields);
  let urlWithQuery = `${url}?`;
  urlWithQuery = Object.keys(values).reduce((memo, key) => {
    let result = memo;
    const value = values[key];
    if (!value) return result;
    if (key === 'amount') {
      if (value.min) result += `${key}Min=${value.min * 100}&`;
      if (value.max) result += `${key}Max=${value.max * 100}&`;
      return result;
    }
    if (key === 'date') {
      if (value.from) result += `${key}From=${value.from.toISOString()}&`;
      if (value.to) result += `${key}To=${value.to.toISOString()}&`;
      return result;
    }
    return `${result}${key}=${value}&`;
  }, urlWithQuery);
  urlWithQuery = trimEnd(urlWithQuery, '&');
  const data = yield call(request, urlWithQuery);
  if (data.err) {
    if (data.err.status === 400) yield call(alert, data.err.res.body);
    else yield call(alert, data.err.mesage);
  } else if (data.res) {
    const { page, list, total, limit } = data.res.body;
    yield put(resetList(fromJS(list)));
    yield put(setPage(page));
    yield put(setLimit(limit));
    yield put(setTotal(total));
  }
  yield put(endFiltering());
}
