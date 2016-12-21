import { fromJS } from 'immutable';
import rootSelector, {
  selectTotalItems,
  selectCurrentPage,
  selectItemsPerPage,
  selectTotalPages,
  selectPaginationData,
  selectUpdating,
} from '../selectors';

const role = 300;
const totalItems = 358319873;
const currentPage = 54;
const itemsPerPage = 373;
const updating = '1324356rygdfds';
const user = fromJS({
  role,
});
const globalState = fromJS({
  user,
});
const reports = fromJS({
  totalItems,
  currentPage,
  itemsPerPage,
  updating,
});
const state = fromJS({
  global: globalState,
  reports,
});

test('rootSelector selects the `reports` from the root state', () => {
  expect(rootSelector()(state)).toBe(reports);
});

test('selectTotalItems() selects state.reports.totalItems', () => {
  expect(selectTotalItems()(state)).toBe(totalItems);
});

test('selectCurrentPage() selects state.reports.currentPage', () => {
  expect(selectCurrentPage()(state)).toBe(currentPage);
});

test('selectItemsPerPage() selects state.reports.', () => {
  expect(selectItemsPerPage()(state)).toBe(itemsPerPage);
});

test('selectTotalPages() calculates the totalPages number', () => {
  expect(selectTotalPages()(state)).toBe(Math.ceil(totalItems / itemsPerPage));
});

test('selectUpdating() calculates the totalPages number', () => {
  expect(selectUpdating()(state)).toBe(updating);
});

test('selectPaginationData() return { totalPages, currentPage }.', () => {
  expect(selectPaginationData()(state)).toEqual({
    currentPage: selectCurrentPage()(state),
    totalPages: selectTotalPages()(state),
  });
});
