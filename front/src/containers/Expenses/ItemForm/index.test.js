import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import ExpensesItemForm, { createForm } from './';

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

const props = {
  handleSubmit: () => {},
  initialValues: fromJS({
    saving: true,
  }),
  user,
  widths,
};

describe('ExpensesItemForm', () => {
  it('renders without errors with user.role!=300', () => {
    shallow(<ExpensesItemForm {...props} />);
  });
  it('renders without errors with user.role=300', () => {
    const newProps = {
      ...props,
      user: user.set('role', 300),
    };
    shallow(<ExpensesItemForm {...newProps} />);
  });
});

describe('createForm()', () => {
  it('returns without errors', () => {
    createForm('formName');
  });
});
