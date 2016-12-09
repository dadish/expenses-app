import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ItemColumn from './';

describe('ItemColumn', () => {
  it('renders without errors', () => {
    shallow(<ItemColumn />);
  });
  it('renders it`s childred', () => {
    const child = <h1>Hello World!</h1>;
    const wrapper = shallow(<ItemColumn>{child}</ItemColumn>);
    expect(wrapper.contains(child)).toBe(true);
  });
});
