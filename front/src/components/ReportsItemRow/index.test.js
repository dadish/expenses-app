import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ReportsItemRow from './';

it('renders without errors', () => {
  shallow(<ReportsItemRow />);
});

it('renders it`s children', () => {
  const child = 'eisufdhnj';
  const wrapper = shallow(<ReportsItemRow>{child}</ReportsItemRow>);
  expect(wrapper.contains('child')).toBe(false);
  expect(wrapper.contains(child)).toBe(true);
});
