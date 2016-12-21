import React from 'react';
import { shallow } from 'enzyme';
import { ReportsHeader } from './';

test('ReportsHeader renders without errors with role=300', () => {
  shallow(<ReportsHeader />);
});
