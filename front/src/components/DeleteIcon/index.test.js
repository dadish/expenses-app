import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import Icon from 'material-ui/svg-icons/action/delete-forever';
import DeleteIcon from './';

const onClick = createSpy();
const props = { onClick };
const renderComponent = properties => shallow(<DeleteIcon {...properties} />);

test('renders without errors', () => {
  renderComponent(props);
});

test('renders cvg icon from material-ui', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find(Icon).length).toBe(1);
});

test('onClick property handles clicks', () => {
  const target = {};
  const wrapper = renderComponent(props);
  wrapper.simulate('click', target);
  expect(onClick).toHaveBeenCalledWith(target);
});
