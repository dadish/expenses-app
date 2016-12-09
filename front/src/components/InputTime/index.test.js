import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import TimePicker from 'material-ui/TimePicker';
import InputText from './';

const props = {
  input: {
    onChange: () => {},
  },
  meta: {
    touched: true,
    error: 'boob',
  },
};

const renderComponent = properties => shallow(<InputText {...properties} />);

it('renders without errors', () => {
  renderComponent(props);
});

it('should render one TimePicker component', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find(TimePicker).length).toBe(1);
});

it('should not pass unknown props down to TimePicker component', () => {
  const wrapper = renderComponent({
    ...props,
    foo: 'bar',
  });
  expect(wrapper.find(TimePicker).first().prop('foo')).toBe(undefined);
});

it('should pass all props except onBlur and onChange under props.input down to TimePicker', () => {
  const onBlur = {};
  const onChange = {};
  const inputProps = {
    foo: 'bar',
    baz: 'foo',
    onBlur,
    onChange,
  };
  const wrapper = renderComponent({
    ...props,
    input: inputProps,
  });
  expect(wrapper.find(TimePicker).first().prop('foo')).toBe('bar');
  expect(wrapper.find(TimePicker).first().prop('baz')).toBe('foo');
  expect(wrapper.find(TimePicker).first().prop('onBlur')).toNotBe(onBlur);
  expect(wrapper.find(TimePicker).first().prop('onChange')).toNotBe(onChange);
});

it('should set disabled property to TimePicker if passed', () => {
  const wrapper = renderComponent({
    ...props,
    disabled: true,
  });
  expect(wrapper.find(TimePicker).first().prop('disabled')).toExist();
});

it('should set style property to TimePicker if passed', () => {
  const wrapper = renderComponent({
    ...props,
    style: {
      foo: 'bar',
    },
  });
  expect(wrapper.find(TimePicker).first().prop('style')).toExist();
});

it('properly handles onChange provided by redux-form via input.onChange', () => {
  const onChange = createSpy();
  const date = new Date();
  const wrapper = renderComponent({
    ...props,
    input: {
      onChange,
      value: date,
    },
  });
  wrapper.simulate('change', undefined, date);
  expect(onChange).toHaveBeenCalled();
  expect(onChange).toHaveBeenCalledWith(date.toISOString());
});
