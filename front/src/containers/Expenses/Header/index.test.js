import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesHeader } from './';

const role = 200;
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
  role,
  widths,
};

describe('ExpensesHeader', () => {
  it('renders without errors with role!=300', () => {
    shallow(<ExpensesHeader {...props} />);
  });
  it('renders without errors with role=300', () => {
    const newProps = {
      ...props,
      role: 300,
    };
    shallow(<ExpensesHeader {...newProps} />);
  });
});
