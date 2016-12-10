import React from 'react';
import { shallow } from 'enzyme';
import ExpensesHeader from './';

describe('ExpensesHeader', () => {
  it('renders without errors', () => {
    shallow(<ExpensesHeader />);
  });
});
