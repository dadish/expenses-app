import { call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { api } from 'main/config';
import { change } from 'redux-form/immutable';

const url = `${api.url}${api.path.usersEmailMatch}`;

export function* updateMatches({ payload: { formId, matchStr } }) {
  if (!matchStr) return;
  const data = yield request(`${url}/${matchStr}`);
  if (data.err) yield call(alert, data.err.message);
  else if (data.res) {
    yield put(change(formId, 'userDataSource', data.res.body));
  }
}
