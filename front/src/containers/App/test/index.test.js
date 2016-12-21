import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../';

const props = {
  location: {
    pathname: 'poop',
  },
};

const renderComponent = p => shallow(<App {...p} />);

it('renders without crashing', () => {
  renderComponent(props);
});

it('renders it`s children', () => {
  const wrapper = shallow(<App {...props} ><h1>Child</h1></App>);
  expect(wrapper.contains(<h1>Child</h1>)).toBe(true);
});
