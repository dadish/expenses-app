import React from 'react';
import { shallow } from 'enzyme';
import Expenses from '../';

test('Expenses renders without errors', () => {
  shallow(<Expenses />);
});
