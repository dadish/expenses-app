import expect from 'expect';
import { fromJS } from 'immutable';
import rootSelector, {
  selectExpenseRoleLabels,
  expenseRoleLabels,
} from '../selectors';

const role = 300;
const user = fromJS({
  role,
});
const globalState = fromJS({
  user,
});
const expenses = fromJS({});
const state = fromJS({
  global: globalState,
  expenses,
});

test('rootSelector selects the `expenses` from the root state', () => {
  expect(rootSelector()(state)).toBe(expenses);
});

describe('selectExpenseRoleLabels()', () => {
  it('returns all the options if the expenseRole is 300', () => {
    expect(selectExpenseRoleLabels()(state)).toEqual(expenseRoleLabels);
  });
  it('returns only two options without Admin if expenseRole is 200', () => {
    const newState = state.setIn(['global', 'user', 'role'], 200);
    const newExpenseRoleLabels = expenseRoleLabels.filter(label => label[0] !== 300);
    expect(selectExpenseRoleLabels()(newState)).toEqual(newExpenseRoleLabels);
  });
  it('returns an empty array if expenseRole is 0', () => {
    const newState = state.setIn(['global', 'user', 'role'], 0);
    expect(selectExpenseRoleLabels()(newState)).toEqual([]);
  });
});
