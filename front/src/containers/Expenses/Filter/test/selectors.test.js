import { fromJS } from 'immutable';
import { FORM_NAME } from '../constants';
import {
  selectFilter,
  selectFilterOn,
  selectFilterUpdating,
  selectFilteredQuery,
} from '../selectors';

const on = 'qalsdfjas,';
const updating = 'aksdfgnqkal';
const fields = fromJS({});
const filter = fromJS({
  on,
  updating,
  fields,
});

const userEmail = 'esdhndzsfaz';
const amountMin = 1233;
const amountMax = 2313245;
const dateFrom = new Date(1234567);
const dateTo = new Date(9876543);
const comment = '  qwrtfh';
const description = 'wrsg24weas';

const currentPage = 1234;
const totalItems = 123456789;
const itemsPerPage = 50;

const state = fromJS({
  expenses: {
    filter,
    currentPage,
    totalItems,
    itemsPerPage,
  },
  form: {
    [FORM_NAME]: {
      values: {
        userEmail,
        amount: {
          max: amountMax,
          min: amountMin,
        },
        date: {
          from: dateFrom,
          to: dateTo,
        },
        comment,
        description,
        foo: null,
      },
    },
  },
});

test('selectFilter selects state.expenses.filter', () => {
  const selector = selectFilter();
  expect(selector(state)).toBe(filter);
});

test('selectFilterOn selects state.expenses.filter.on', () => {
  const selector = selectFilterOn();
  expect(selector(state)).toBe(on);
});

test('selectFilterUpdating selects state.expenses.filter.updating', () => {
  const selector = selectFilterUpdating();
  expect(selector(state)).toBe(updating);
});

test('selectFilteredQuery builds the filtered query correctly', () => {
  const query = selectFilteredQuery()(state);
  expect(query.userEmail).toBe(userEmail);
  expect(query.amountMin).toBe(amountMin * 100);
  expect(query.amountMax).toBe(amountMax * 100);
  expect(query.dateFrom).toBe(dateFrom.toISOString());
  expect(query.dateTo).toBe(dateTo.toISOString());
  expect(query.comment).toBe(comment);
  expect(query.description).toBe(description);
  expect(query.limit).toBe(itemsPerPage);
  expect(query.page).toBe(currentPage);
  expect(query.foo).toBeFalsy();
});

describe('selectFilteredQuery builds the filtered query with variety of values combinations without error', () => {
  const variety = [
    { userEmail },
    { userEmail, comment },
    { userEmail, description },
    { userEmail, comment, description },
    {
      userEmail,
      amount: {
        min: amountMin,
      },
    },
    {
      userEmail,
      comment,
      amount: {
        max: amountMax,
      },
    },
    {
      description,
      amount: {
        min: amountMin,
        max: amountMax,
      },
      comment,
    },
    {
      comment,
      date: {},
      description,
    },
    {
      userEmail,
      comment,
      date: {
        from: dateFrom,
      },
    },
    {
      description,
      comment,
      date: {
        to: dateTo,
      },
    },
    {
      userEmail,
      comment: null,
      description,
      date: {
        from: dateFrom,
        to: dateTo,
      },
      amount: {
        min: amountMin,
      },
    },
  ];

  variety.forEach((variant, i) => {
    it(`case #${i}`, () => {
      const newState = state
                        .deleteIn(['form', FORM_NAME, 'values'])
                        .setIn(['form', FORM_NAME, 'values'], fromJS(variant));
      selectFilteredQuery()(newState);
    });
  });
});
