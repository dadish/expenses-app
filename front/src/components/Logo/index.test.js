import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Icon from 'material-ui/svg-icons/action/account-balance';
import Logo from './';

test('The Logo renders without errors', () => {
  shallow(<Logo />);
});

test('The Logo renders account-balance SVG icon from material-ui', () => {
  const wrapper = shallow(<Logo />);
  expect(wrapper.find(Icon).length).toBe(1);
});
