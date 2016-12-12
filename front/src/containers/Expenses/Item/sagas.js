import { call, put } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form/immutable';
import { api } from 'main/config';
import request from 'utils/request';
import boomToReduxForm from 'utils/boomToReduxForm';
import {
  saveError,
  saveSuccess,
  editModeOff,
  deleteError,
  deleteSuccess,
} from './actions';

const url = `${api.url}${api.path.expenses}`;

export function* saveItem(action) {
  const { payload } = action;
  const resolve = payload.get('res');
  const reject = payload.get('rej');
  let expense = payload;
  const body = {
    user: expense.get('user'),
    amount: expense.get('amount'),
    date: expense.get('date'),
    description: expense.get('description'),
    comment: expense.get('comment'),
  };

  let data;
  if (expense.get('id')) {
    data = yield call(request, `${url}/${expense.get('id')}`, body, 'put');
  } else {
    data = yield call(request, url, body);
  }

  if (data.err) {
    if (data.err.status === 401) {
      yield call(alert, data.err.response.body.message);
    } else if (data.err.status === 400) {
      yield call(reject, boomToReduxForm(data.err.response.body));
    } else {
      yield call(reject, new SubmissionError({ _error: data.err.message }));
    }
    yield put(saveError(expense));
  } else if (data.res) {
    expense = expense.merge(data.res.body);
    yield call(resolve, expense);
    yield put(saveSuccess(expense));
    yield put(editModeOff(expense));
  }
}

export function* deleteItem(action) {
  const expense = action.payload;
  const data = yield call(request, `${url}/${expense.get('id')}`, null, 'del');
  if (data.err) {
    yield call(alert, data.err.response.body.message);
    yield put(deleteError(expense));
  } else if (data.res) {
    yield put(deleteSuccess(expense));
  }
}
