import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { api } from 'main/config';
import request from 'utils/request';
import { resetList } from './actions';
import { setCurrentPage, setItemsPerPage, setTotalItems } from '../actions';
import { selectItemsPerPage } from '../selectors';

const url = `${api.url}${api.path.expenses}`;

export function* initialLoad() {
  const perPage = yield select(selectItemsPerPage());
  const data = yield call(request, url, null, 'get', { limit: perPage });
  if (data.err) {
    yield call(alert, data.err);
  } else if (data.res) {
    const { page, total, limit, list } = data.res.body;
    yield put(setCurrentPage(page));
    yield put(setItemsPerPage(limit));
    yield put(setTotalItems(total));
    yield put(resetList(fromJS(list)));
  }
}
