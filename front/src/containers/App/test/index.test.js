import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../';

const renderComponent = () => shallow(<App />);

it('renders without crashing', () => {
  renderComponent();
});

it('renders it`s children', () => {
  const wrapper = shallow(<App><h1>Child</h1></App>);
  expect(wrapper.contains(<h1>Child</h1>)).toBe(true);
});
