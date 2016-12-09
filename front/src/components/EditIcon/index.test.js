import expect, { createSpy } from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import EditIcon from './';

const renderComponent = props => shallow(<EditIcon {...props} />);
const onClick = createSpy();
const props = {
  onClick,
};

test('EditIcon renders without errors', () => {
  renderComponent();
});

it('EditIcon invokes onClick prop when recieves onClick event', () => {
  const wrapper = renderComponent(props);
  wrapper.simulate('click');
  expect(onClick).toHaveBeenCalled();
});
