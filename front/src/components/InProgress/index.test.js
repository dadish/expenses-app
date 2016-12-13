import React from 'react';
import { shallow } from 'enzyme';
import CircularProgress from 'material-ui/CircularProgress';
import InProgress from './';

test('it renders without errors', () => {
  shallow(<InProgress />);
});

test('it renders CircularProgress', () => {
  const wrapper = shallow(<InProgress />);
  expect(wrapper.find(CircularProgress).length).toBe(1);
});
