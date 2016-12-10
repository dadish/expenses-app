import React from 'react';
import expect from 'expect';
import { fromJS } from 'immutable';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import UsersItem, { roleToRoleLabel } from '../';

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

describe('roleToRoleLabel', () => {
  it('returns an empty string if labels is an empty array', () => {
    expect(roleToRoleLabel(200, [])).toBe('');
  });
  it('returns a label that corrsponds to the role', () => {
    expect(roleToRoleLabel(200, [
      [100, 'foo'],
      [200, 'bar'],
      [300, 'baz'],
    ])).toBe('bar');
  });
});
