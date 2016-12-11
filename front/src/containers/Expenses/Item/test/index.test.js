import React from 'react';
import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import { ExpensesItem } from '../';

const user = fromJS({
  cid: uniqueId('user_'),
  id: 0,
  email: '',
  role: 100,
  edit: false,
  saving: false,
  deleting: false,
});

const widths = {
  id: 5,
  user: 18,
  amount: 7,
  date: 20,
  description: 20,
  comment: 22,
  edit: 8,
};

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
  widths,
  user,
};

describe('ExpensesItem', () => {
  it('renders without errors', () => {
    shallow(<ExpensesItem {...props} />);
  });
});
