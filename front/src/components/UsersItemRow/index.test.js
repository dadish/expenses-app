import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UsersItemRow from './';

it('renders without errors', () => {
  shallow(<UsersItemRow />);
});

it('renders it`s children', () => {
  const child = 'eisufdhnj';
  const wrapper = shallow(<UsersItemRow>{child}</UsersItemRow>);
  expect(wrapper.contains('child')).toBe(false);
  expect(wrapper.contains(child)).toBe(true);
});
