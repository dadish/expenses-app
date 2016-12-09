import React from 'react';
import { shallow } from 'enzyme';
import Users from '../';

test('Users renders without errors', () => {
  shallow(<Users />);
});
