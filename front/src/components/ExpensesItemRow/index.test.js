import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ExpensesItemRow from './';

it('renders without errors', () => {
  shallow(<ExpensesItemRow />);
});

it('renders it`s children', () => {
  const child = 'eisufdhnj';
  const wrapper = shallow(<ExpensesItemRow>{child}</ExpensesItemRow>);
  expect(wrapper.contains('child')).toBe(false);
  expect(wrapper.contains(child)).toBe(true);
});
