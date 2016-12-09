import React from 'react';
import expect, { createSpy } from 'expect';
import uniqueId from 'lodash/uniqueId';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { Icons, mapDispatchToProps } from '../ActionIcons';
import { editModeOn, del } from '../actions';

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
  handleEdit: () => {},
  handleDelete: () => {},
};

describe('ActionIcons', () => {
  it('renders without errors with props.user.deleting=false', () => {
    shallow(<Icons {...props} />);
  });
  it('renders without errors with props.user.deleting=true', () => {
    const deletingProps = {
      ...props,
      user: user.set('deleting', true),
    };
    shallow(<Icons {...deletingProps} />);
  });
});

describe('mapDispatchToProps', () => {
  const dispatch = createSpy();
  const { handleEdit, handleDelete } = mapDispatchToProps(dispatch, props);
  it('handleEdit() dispatches the correct action', () => {
    handleEdit();
    expect(dispatch).toHaveBeenCalledWith(editModeOn(user));
  });
  it('handleEdit() dispatches the correct action', () => {
    handleDelete();
    expect(dispatch).toHaveBeenCalledWith(del(user));
  });
});
