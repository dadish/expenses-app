import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesFilter, normalizeAmount } from '../';

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
  handleUpdate: () => {},
};

describe('ExpensesFilter', () => {
  it('renders without errors with role!=300', () => {
    shallow(<ExpensesFilter {...props} />);
  });
  it('renders without errors with role=300', () => {
    const newProps = {
      ...props,
      role: 300,
    };
    shallow(<ExpensesFilter {...newProps} />);
  });
});

describe('normalizeAmount()', () => {
  it('converts input into a number', () => {
    expect(normalizeAmount('234')).toBe(234);
  });
  it('returns 0 if cannot convert to number', () => {
    expect(normalizeAmount('strng')).toBe(0);
  });
});
