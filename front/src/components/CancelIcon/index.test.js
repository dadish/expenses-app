import expect, { createSpy } from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import CancelIcon from './';

const renderComponent = props => shallow(<CancelIcon {...props} />);
const onClick = createSpy();
const props = {
  onClick,
};

test('CancelIcon renders without errors', () => {
  renderComponent();
});

it('CancelIcon invokes onClick prop when recieves onClick event', () => {
  const wrapper = renderComponent(props);
  wrapper.simulate('click');
  expect(onClick).toHaveBeenCalled();
});
