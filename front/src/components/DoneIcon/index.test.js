import expect, { createSpy } from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DoneIcon from './';

const renderComponent = props => shallow(<DoneIcon {...props} />);
const onClick = createSpy();
const props = {
  onClick,
};

test('DoneIcon renders without errors', () => {
  renderComponent();
});

it('DoneIcon invokes onClick prop when recieves onClick event', () => {
  const wrapper = renderComponent(props);
  wrapper.simulate('click');
  expect(onClick).toHaveBeenCalled();
});
