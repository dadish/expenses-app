import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import InputPassword from './';

const props = {
  label: 'string',
  input: {
    onChange: () => {},
  },
  meta: {
    touched: true,
    error: 'boob',
  },
};

const renderComponent = properties => shallow(<InputPassword {...properties} />);

it('should render without errors', () => {
  renderComponent(props);
});

it('should render one TextField', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find(TextField).length).toBe(1);
});

it('should have type=password property', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.prop('type')).toBe('password');
});

it('should not pass unknown props down to TextField component', () => {
  const wrapper = renderComponent({
    ...props,
    foo: 'bar',
  });
  expect(wrapper.find(TextField).first().prop('foo')).toBe(undefined);
});

it('should pass all props under props.input down to TextField', () => {
  const inputProps = {
    foo: 'bar',
    baz: 'foo',
  };
  const wrapper = renderComponent({
    ...props,
    input: inputProps,
  });
  expect(wrapper.find(TextField).first().prop('foo')).toBe('bar');
  expect(wrapper.find(TextField).first().prop('baz')).toBe('foo');
});

it('should set label property as floatingLabelText property on TextField component', () => {
  const label = 'wesrdkufjnkdm';
  const wrapper = renderComponent({
    ...props,
    label,
  });
  expect(wrapper.find(TextField).first().prop('floatingLabelText')).toBe(label);
});
