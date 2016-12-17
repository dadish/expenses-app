import { fromJS } from 'immutable';
import rootSelector, {
  selectTotalItems,
  selectCurrentPage,
  selectItemsPerPage,
  selectTotalPages,
  selectPaginationData,
  selectColumnWidths,
} from '../selectors';

const role = 300;
const totalItems = 358319873;
const currentPage = 54;
const itemsPerPage = 373;
const user = fromJS({
  role,
});
const globalState = fromJS({
  user,
});
const expenses = fromJS({
  totalItems,
  currentPage,
  itemsPerPage,
});
const state = fromJS({
  global: globalState,
  expenses,
});

test('rootSelector selects the `expenses` from the root state', () => {
  expect(rootSelector()(state)).toBe(expenses);
});

test('selectTotalItems() selects state.expenses.totalItems', () => {
  expect(selectTotalItems()(state)).toBe(totalItems);
});

test('selectCurrentPage() selects state.expenses.currentPage', () => {
  expect(selectCurrentPage()(state)).toBe(currentPage);
});

test('selectItemsPerPage() selects state.expenses.', () => {
  expect(selectItemsPerPage()(state)).toBe(itemsPerPage);
});

test('selectTotalPages() calculates the totalPages number', () => {
  expect(selectTotalPages()(state)).toBe(Math.ceil(totalItems / itemsPerPage));
});

test('selectPaginationData() return { totalPages, currentPage }.', () => {
  expect(selectPaginationData()(state)).toEqual({
    currentPage: selectCurrentPage()(state),
    totalPages: selectTotalPages()(state),
  });
});

describe('selectColumnWidths()', () => {
  it('selects object widths when role=300', () => {
    const selector = selectColumnWidths();
    expect(selector(state)).toBeInstanceOf(Object);
  });
  it('selects object of widths with user=18 when role=300', () => {
    const selector = selectColumnWidths();
    const widths = selector(state);
    expect(widths).toBeInstanceOf(Object);
    expect(widths.user).toBe(18);
  });
  it('selects object of widths with user=0 when role!=300', () => {
    const selector = selectColumnWidths();
    const widths = selector(state.setIn(['global', 'user', 'role'], 200));
    expect(widths).toBeInstanceOf(Object);
    expect(widths.user).toBe(0);
  });
});
