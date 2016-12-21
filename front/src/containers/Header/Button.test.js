import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

const props = {
  handleClick: () => {},
  label: 'string',
  active: true,
};

test('Button renders without errors with active=true', () => {
  shallow(<Button {...props} />);
});
test('Button renders without errors with active=false', () => {
  props.active = true;
  shallow(<Button {...props} />);
});
