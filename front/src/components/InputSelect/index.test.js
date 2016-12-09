import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import InputSelect from './';

const onChange = createSpy();

const props = {
  label: 'string',
  input: {
    onChange,
  },
  meta: {
    touched: true,
    error: 'boob',
  },
  choices: [
    [1],
    [2],
    [3],
    [4],
  ],
};

describe('InputSelect', () => {
  it('renders without errors', () => {
    shallow(<InputSelect {...props} />);
  });
  it('invokes props.input.onChange with the new value', () => {
    const newValue = {};
    const wrapper = shallow(<InputSelect {...props} />);
    wrapper.simulate('change', {}, 0, newValue);
    expect(onChange).toHaveBeenCalledWith(newValue);
  });
});
