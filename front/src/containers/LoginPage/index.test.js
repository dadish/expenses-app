import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { LoginPage, mapDispatchToProps } from './';
import { submit } from './actions';

const props = {
  handleSubmit: () => {},
  error: 'Poop',
  location: {
    state: {
      nextPathname: 'foo',
    },
  },
};

const renderComponent = properties => shallow(<LoginPage {...properties} />);

test('renders one form element', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find('form').length).toBe(1);
});

describe('mapDispatchToProps()', () => {
  it('returns object', () => {
    const dispatch = () => {};
    expect(mapDispatchToProps(dispatch, props)).toBeAn(Object);
  });

  describe('onSubmit()', () => {
    const dispatch = createSpy();
    const foo = 'asdkfdghjnm';
    const values = fromJS({
      foo,
    });
    const onSubmit = mapDispatchToProps(dispatch, props).onSubmit;
    it('returns promise', () => {
      expect(onSubmit(values)).toBeA(Promise);
    });
    it('calls a dispatch function with submit action', () => {
      onSubmit(values);
      expect(dispatch.calls[1].arguments[0].type).toBe(submit().type);
      expect(dispatch.calls[1].arguments[0].payload.get('foo')).toBe(foo);
    });
  });
});
