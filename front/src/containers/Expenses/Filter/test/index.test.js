import React from 'react';
import { shallow } from 'enzyme';
import { reset } from 'redux-form/immutable';
import { ExpensesFilter, mapDispatchToProps } from '../';
import { FORM_NAME } from '../constants';

const role = 200;
const widths = {
  id: 5,
  user: 18,
  amount: 7,
  date: 20,
  description: 20,
  comment: 22,
  edit: 8,
};

const props = {
  role,
  widths,
  dirty: false,
  handleCancelClick: () => {},
};

describe('ExpensesFilter', () => {
  it('renders without errors with role!=300', () => {
    shallow(<ExpensesFilter {...props} />);
  });
  it('renders without errors with role=300', () => {
    const newProps = {
      ...props,
      role: 300,
    };
    shallow(<ExpensesFilter {...newProps} />);
  });
});

describe('mapDispatchToProps()', () => {
  const dispatch = jest.fn();
  const { handleCancelClick } = mapDispatchToProps(dispatch);
  it('produces handleCancelClick that dispatches the redux-form.reset action with FORM_NAME', () => {
    handleCancelClick();
    expect(dispatch.mock.calls[0][0]).toEqual(reset(FORM_NAME));
  });
});
