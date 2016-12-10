import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import ExpensesItemForm, { createForm } from './';

const props = {
  handleSubmit: () => {},
  initialValues: fromJS({
    saving: true,
  }),
  expenseRoleLabels: [
    [100, 'Expense'],
    [200, 'Manager'],
    [300, 'Admin'],
  ],
};

describe('ExpensesItemForm', () => {
  it('renders without errors', () => {
    shallow(<ExpensesItemForm {...props} />);
  });
});

describe('createForm()', () => {
  it('returns a React renderable component', () => {
    const Component = createForm('formName');
    shallow(<Component />);
  });
});
