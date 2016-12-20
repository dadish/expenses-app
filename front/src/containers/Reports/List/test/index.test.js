import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { ExpensesList } from '../';

const props = {
  list: fromJS([
    { cid: 1 },
    { cid: 2 },
    { cid: 3 },
    { cid: 4 },
  ]),
};

describe('ExpensesList', () => {
  it('renders without errors', () => {
    shallow(<ExpensesList {...props} />);
  });
});
