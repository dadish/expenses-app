import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ExpensesItem from './';

it('renders without errors', () => {
  shallow(<ExpensesItem />);
});

it('renders it`s children', () => {
  const child = 'eisufdhnj';
  const wrapper = shallow(<ExpensesItem>{child}</ExpensesItem>);
  expect(wrapper.contains('child')).toBe(false);
  expect(wrapper.contains(child)).toBe(true);
});
