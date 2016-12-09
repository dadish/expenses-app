import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ExpensesItemColumn, {
  ExpensesItemColumnId,
  ExpensesItemColumnExpensener,
  ExpensesItemColumnDistance,
  ExpensesItemColumnDuration,
  ExpensesItemColumnDate,
  ExpensesItemColumnEdit,
} from './';

describe('ExpensesItemColumn', () => {
  it('renders without errors', () => {
    shallow(<ExpensesItemColumn />);
  });
  it('renders it`s children', () => {
    const message = 'Hello World!';
    const wrapper = shallow(<ExpensesItemColumn>{message}</ExpensesItemColumn>);
    expect(wrapper.contains(message)).toBe(true);
  });
});

const columns = [
  ExpensesItemColumnId,
  ExpensesItemColumnExpensener,
  ExpensesItemColumnDistance,
  ExpensesItemColumnDuration,
  ExpensesItemColumnDate,
  ExpensesItemColumnEdit,
];

columns.forEach((Column, name) => {
  describe(name, () => {
    it('renders without errors', () => {
      shallow(<Column />);
    });
    it('renders it`s children', () => {
      const child = 'The World is Mine!';
      const wrapper = shallow(<Column>{child}</Column>);
      expect(wrapper.contains(child)).toBe(true);
    });
  });
});
