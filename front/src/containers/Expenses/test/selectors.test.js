import { fromJS } from 'immutable';
import rootSelector, {
  selectColumnWidths,
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

describe('selectColumnWidths()', () => {
  it('selects object widths when role=300', () => {
    expect(selectColumnWidths()(state)).toBeInstanceOf(Object);
  });
  it('selects object of widths with user=18 when role=300', () => {
    const widths = selectColumnWidths()(state);
    expect(widths).toBeInstanceOf(Object);
    expect(widths.user).toBe(18);
  });
  it('selects object of widths with user=0 when role!=300', () => {
    const widths = selectColumnWidths()(state.setIn(['global', 'user', 'role'], 200));
    expect(widths).toBeInstanceOf(Object);
    expect(widths.user).toBe(0);
  });
});
