import React from 'react';
import expect, { createSpy } from 'expect';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { save } from 'containers/Users/Item/actions';
import ActionIcons, {
  handleClick,
} from './ActionIcons';

const props = {
  handleSubmit: () => {},
  saving: false,
};

describe('ActionIcons()', () => {
  it('renders without errors when saving=false', () => {
    shallow(<ActionIcons {...props} />);
  });
  it('renders without errors when saving=true', () => {
    const modifiedProps = {
      ...props,
      saving: true,
    };
    shallow(<ActionIcons {...modifiedProps} />);
  });
});

describe('handleClick()', () => {
  it('returns a promise', () => {
    expect(handleClick()).toBeA(Promise);
  });
  it('dispatches save() action', () => {
    const dispatch = createSpy();
    const values = fromJS({ foo: 'bar' });
    handleClick(values, dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch.calls[0].arguments[0].type).toBe(save().type);
    expect(dispatch.calls[0].arguments[0].payload.get('foo')).toBe('bar');
    expect(dispatch.calls[0].arguments[0].payload.get('res')).toExist();
    expect(dispatch.calls[0].arguments[0].payload.get('rej')).toExist();
  });
});
