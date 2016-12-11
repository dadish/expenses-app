import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import TextField from 'material-ui/TextField';
import InputTextarea from './';

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

const renderComponent = properties => shallow(<InputTextarea {...properties} />);

it('renders without errors', () => {
  renderComponent(props);
});

it('should render one TextField component', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find(TextField).length).toBe(1);
});

it('should have type=text property', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.prop('type')).toBe('text');
});

it('should have multiLine=true property', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.prop('multiLine')).toBe(true);
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
  const label = 'My awesome label....';
  const wrapper = renderComponent({
    ...props,
    label,
  });
  expect(wrapper.find(TextField).first().prop('floatingLabelText')).toBe(label);
});

it('should set disabled property as disabled property on TextField component', () => {
  const disabled = true;
  const wrapper = renderComponent({
    ...props,
    disabled,
  });
  expect(wrapper.find(TextField).first().prop('disabled')).toBe(disabled);
});

it('should set autofocus property as autoFocus property on TextField component', () => {
  const autofocus = true;
  const wrapper = renderComponent({
    ...props,
    autofocus,
  });
  expect(wrapper.find(TextField).first().prop('autoFocus')).toBe(autofocus);
});
