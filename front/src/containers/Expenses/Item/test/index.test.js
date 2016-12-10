import React from 'react';
import expect from 'expect';
import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import ExpensesItem, { roleToRoleLabel } from '../';

const expense = fromJS({
  cid: uniqueId('expense_'),
  id: 0,
  email: '',
  role: 100,
  edit: false,
  updating: false,
  deleting: false,
});

const props = {
  expense,
  expenseRoleLabels: [
    [100, 'Expense'],
    [200, 'Manager'],
    [300, 'Admin'],
  ],
};

describe('ExpensesItem', () => {
  it('renders without errors', () => {
    shallow(<ExpensesItem {...props} />);
  });
});

describe('roleToRoleLabel', () => {
  it('returns an empty string if labels is an empty array', () => {
    expect(roleToRoleLabel(200, [])).toBe('');
  });
  it('returns a label that corrsponds to the role', () => {
    expect(roleToRoleLabel(200, [
      [100, 'foo'],
      [200, 'bar'],
      [300, 'baz'],
    ])).toBe('bar');
  });
});
