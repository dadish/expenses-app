import { call, put, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { api } from 'main/config';
import request from 'utils/request';
import { resetList } from './actions';
import { setTotalItems } from '../actions';
import { selectItemsPerPage, selectCurrentPage } from '../selectors';

const url = `${api.url}${api.path.expenses}`;

export function* loadList() {
  const itemsPerPage = yield select(selectItemsPerPage());
  const currentPage = yield select(selectCurrentPage());
  const data = yield call(request, url, null, 'get', {
    limit: itemsPerPage,
    page: currentPage,
  });
  if (data.err) {
    yield call(alert, data.err);
  } else if (data.res) {
    const { total, list } = data.res.body;
    yield put(setTotalItems(total));
    yield put(resetList(fromJS(list)));
  }
}
