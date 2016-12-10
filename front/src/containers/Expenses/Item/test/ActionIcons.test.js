import React from 'react';
import expect, { createSpy } from 'expect';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Icons, mapDispatchToProps } from '../ActionIcons';
import { editModeOn, del } from '../actions';

const expense = fromJS({
  cid: uniqueId('expense_'),
  id: 0,
  email: '',
  role: 100,
  edit: false,
  updating: false,
  deleting: false,
});

const props = {
  expense,
  handleEdit: () => {},
  handleDelete: () => {},
};

describe('ActionIcons', () => {
  it('renders without errors with props.expense.deleting=false', () => {
    shallow(<Icons {...props} />);
  });
  it('renders without errors with props.expense.deleting=true', () => {
    const deletingProps = {
      ...props,
      expense: expense.set('deleting', true),
    };
    shallow(<Icons {...deletingProps} />);
  });
});

describe('mapDispatchToProps', () => {
  const dispatch = createSpy();
  const { handleEdit, handleDelete } = mapDispatchToProps(dispatch, props);
  it('handleEdit() dispatches the correct action', () => {
    handleEdit();
    expect(dispatch).toHaveBeenCalledWith(editModeOn(expense));
  });
  it('handleEdit() dispatches the correct action', () => {
    handleDelete();
    expect(dispatch).toHaveBeenCalledWith(del(expense));
  });
});
