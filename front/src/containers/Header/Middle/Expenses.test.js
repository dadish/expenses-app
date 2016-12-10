import React from 'react';
import { shallow } from 'enzyme';
import Expenses from './Expenses';

const props = {
  handleClick: () => {},
};

test('renders without errors', () => {
  shallow(<Expenses {...props} />);
});
