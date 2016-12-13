import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesFilter, mapDispatchToProps } from '../';
import { updateFilter } from '../actions';

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
  handleUpdate: () => {},
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
  const { handleUpdate } = mapDispatchToProps(dispatch);
  it('handleUpdate creates a function that dispatches updateFilter action', () => {
    const value = 'sdfjdnmmas';
    const ev = {
      target: { value },
    };
    const user = 'user';
    const comment = 'comment';
    const updateUser = handleUpdate(user);
    const updateComment = handleUpdate(comment);
    updateUser(ev);
    expect(dispatch.mock.calls[0][0]).toEqual(updateFilter({ field: user, value }));

    updateComment(ev);
    expect(dispatch.mock.calls[1][0]).toEqual(updateFilter({ field: comment, value }));
  });
});
