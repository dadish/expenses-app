import React from 'react';
import expect, { createSpy } from 'expect';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';
import { RegisterPage, mapDispatchToProps } from '../';

const props = {
  handleSubmit: () => {},
  error: 'error',
};

describe('RegisterPage', () => {
  it('renders without errors', () => {
    shallow(<RegisterPage {...props} />);
  });
});

describe('mapDispatchToProps()', () => {
  const dispatch = createSpy();
  const { onSubmit } = mapDispatchToProps(dispatch);

  it('onSubmit() dispatches a submit action', () => {
    onSubmit(fromJS({}));
    expect(dispatch).toHaveBeenCalled();
  });
});
