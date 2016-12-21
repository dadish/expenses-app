import React from 'react';
import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import { ReportItem } from '../';

const report = fromJS({
  cid: uniqueId('report_'),
  weekStart: new Date().toISOString(),
  totalSpent: 0,
});

const period = 'strin';

const props = {
  report,
  period,
};

describe('ReportItem', () => {
  it('renders without errors', () => {
    shallow(<ReportItem {...props} />);
  });
});
