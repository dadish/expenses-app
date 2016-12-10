import React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';

const props = {
  handleClick: () => {},
};

test('renders without errors', () => {
  shallow(<Logout {...props} />);
});
