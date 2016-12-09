import React from 'react';
import expect, { createSpy } from 'expect';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { save, editModeOff } from 'containers/Users/Item/actions';
import {
  Icons,
  mapDispatchToProps,
} from './ActionIcons';

const user = fromJS({ saving: false });

const props = {
  handleSubmit: () => {},
  handleCancel: () => {},
  handleDone: () => {},
  user,
};

describe('ActionIcons()', () => {
  it('renders without errors when saving=false', () => {
    shallow(<Icons {...props} />);
  });
  it('renders without errors when saving=true', () => {
    const modifiedProps = {
      ...props,
      user: user.set('saving', true),
    };
    shallow(<Icons {...modifiedProps} />);
  });
});

describe('mapDispatchToProps()', () => {
  const dispatch = createSpy();
  const { handleDone, handleCancel } = mapDispatchToProps(dispatch, props);
  describe('handleDone()', () => {
    it('returns promise', () => {
      expect(handleDone(user)).toBeA(Promise);
    });
    it('dispatches a save action', () => {
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch.calls[0].arguments[0].type).toBe(save().type);
    });
  });
  describe('handleCancel()', () => {
    it('dispatches a editModeOff action', () => {
      handleCancel();
      expect(dispatch).toHaveBeenCalled();
      expect(dispatch.calls[1].arguments[0].type).toBe(editModeOff().type);
    });
  });
});
