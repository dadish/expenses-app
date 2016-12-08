import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import { SUBMIT_START } from 'containers/App/constants';
import InputSubmit from './';

const props = {
  label: 'string',
  input: {
    onChange: () => {},
  },
};

const renderComponent = properties => shallow(<InputSubmit {...properties} />);

it('renders without errors', () => {
  renderComponent(props);
});

it('renders without errors when input.value=SUBMIT_START', () => {
  renderComponent({
    ...props,
    input: {
      ...props.input,
      value: SUBMIT_START,
    },
  });
});

it('render a FlatButton component', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find(FlatButton).length).toBe(1);
});

it('should set type=submit on the FlatButton component', () => {
  const wrapper = renderComponent(props);
  expect(wrapper.find(FlatButton).first().prop('type')).toBe('submit');
});

it('sets the label property as label on the FlatButton component', () => {
  const label = 'adfhmnasg';
  const wrapper = renderComponent({
    ...props,
    label,
  });
  expect(wrapper.find(FlatButton).first().prop('label')).toBe(label);
});

it('passes all properties from props.input down to FlatButton component', () => {
  const input = {
    foo: 'bar',
    baz: 'foo',
  };
  const wrapper = renderComponent({
    ...props,
    input,
  });
  expect(wrapper.find(FlatButton).first().prop('foo')).toBe('bar');
  expect(wrapper.find(FlatButton).first().prop('baz')).toBe('foo');
});
