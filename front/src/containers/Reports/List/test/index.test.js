import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { ReportList } from '../';

const props = {
  list: fromJS([
    { cid: 1 },
    { cid: 2 },
    { cid: 3 },
    { cid: 4 },
  ]),
};

describe('ReportList', () => {
  it('renders without errors', () => {
    shallow(<ReportList {...props} />);
  });
});
