import React from 'react';
import { shallow } from 'enzyme';
import Users from './Users';

const props = {
  handleClick: () => {},
};

test('renders without errors', () => {
  shallow(<Users {...props} />);
});
