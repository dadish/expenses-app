import expect from 'expect';
import { fromJS } from 'immutable';
import rootSelector, {
  selectUserRoleLabels,
  userRoleLabels,
} from '../selectors';

const role = 300;
const user = fromJS({
  role,
});
const globalState = fromJS({
  user,
});
const users = fromJS({});
const state = fromJS({
  global: globalState,
  users,
});

test('rootSelector selects the `users` from the root state', () => {
  expect(rootSelector()(state)).toBe(users);
});

describe('selectUserRoleLabels()', () => {
  it('returns all the options if the userRole is 300', () => {
    expect(selectUserRoleLabels()(state)).toEqual(userRoleLabels);
  });
  it('returns only two options without Admin if userRole is 200', () => {
    const newState = state.setIn(['global', 'user', 'role'], 200);
    const newUserRoleLabels = userRoleLabels.filter(label => label[0] !== 300);
    expect(selectUserRoleLabels()(newState)).toEqual(newUserRoleLabels);
  });
  it('returns an empty array if userRole is 200', () => {
    const newState = state.setIn(['global', 'user', 'role'], 0);
    expect(selectUserRoleLabels()(newState)).toEqual([]);
  });
});
