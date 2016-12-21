import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import ExpensesItemForm, { createForm, parseAmount } from './';

const userRole = 100;

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
  form: 'form',
  handleSubmit: () => {},
  initialValues: fromJS({
    saving: true,
  }),
  userRole,
  widths,
};

describe('ExpensesItemForm', () => {
  it('renders without errors with userRole!=300', () => {
    shallow(<ExpensesItemForm {...props} />);
  });
  it('renders without errors with userRole=300', () => {
    const newProps = {
      ...props,
      userRole: 300,
    };
    shallow(<ExpensesItemForm {...newProps} />);
  });
});

describe('createForm()', () => {
  it('returns without errors', () => {
    createForm('formName');
  });
});

describe('parseAmount()', () => {
  it('returns number without leading zero if there is not precision point', () => {
    expect(parseAmount('034')).toBe('34');
  });
  it('returns the string if no error', () => {
    expect(parseAmount('45')).toBe('45');
  });
});
