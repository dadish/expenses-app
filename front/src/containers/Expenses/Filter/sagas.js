import { call, select, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import { formValueSelector } from 'redux-form/immutable';
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
  if (meta.form !== FORM_NAME) return;
  // debounce the actions that occur while user is typing
  yield delay(500);
  yield put(startFiltering());
  const values = yield select(selectFormValue, ...filterableFields);
  const query = Object.keys(values).reduce((memo, key) => {
    const result = memo;
    const value = values[key];
    if (!value) return result;
    if (key === 'amount') {
      if (value.min) result[`${key}Min`] = value.min * 100;
      if (value.max) result[`${key}Max`] = value.max * 100;
      return result;
    }
    if (key === 'date') {
      if (value.from) result[`${key}From`] = value.from.toISOString();
      if (value.to) result[`${key}To`] = value.to.toISOString();
      return result;
    }
    result[key] = value;
    return result;
  }, {});
  const data = yield call(request, url, null, 'get', query);
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
