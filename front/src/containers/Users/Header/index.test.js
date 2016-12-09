import React from 'react';
import { shallow } from 'enzyme';
import UsersHeader from './';

describe('UsersHeader', () => {
  it('renders without errors', () => {
    shallow(<UsersHeader />);
  });
});
