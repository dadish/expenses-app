import React from 'react';
import { shallow } from 'enzyme';
import ExpensesItemRow from './';

it('renders without errors', () => {
  shallow(<ExpensesItemRow />);
});
