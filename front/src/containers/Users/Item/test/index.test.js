import React from 'react';
import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import UsersItem from '../';

const user = fromJS({
  cid: uniqueId('user_'),
  id: 0,
  email: '',
  role: 100,
  edit: false,
  updating: false,
  deleting: false,
});

const props = {
  user,
  userRoleLabels: [
    [100, 'User'],
    [200, 'Manager'],
    [300, 'Admin'],
  ],
};

describe('UsersItem', () => {
  it('renders without errors', () => {
    shallow(<UsersItem {...props} />);
  });
});
