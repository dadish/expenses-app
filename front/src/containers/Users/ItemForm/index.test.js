import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import UsersItemForm, { createForm } from './';

const props = {
  handleSubmit: () => {},
  initialValues: fromJS({
    saving: true,
  }),
  userRoleLabels: [
    [100, 'User'],
    [200, 'Manager'],
    [300, 'Admin'],
  ],
};

describe('UsersItemForm', () => {
  it('renders without errors', () => {
    shallow(<UsersItemForm {...props} />);
  });
});

describe('createForm()', () => {
  it('returns a React renderable component', () => {
    const Component = createForm('formName');
    shallow(<Component />);
  });
});
