import React from 'react';
import { shallow } from 'enzyme';
import InputTime, { handleChange } from '../InputTime';

const props = {
  style: {},
  disabled: false,
  input: {
    value: null,
  },
  label: 'label',
  meta: {
    touched: true,
    error: 'error',
  },
};

test('InputTime renders without errors', () => {
  shallow(<InputTime {...props} />);
});

test('InputTime renders without errors when input.value!=null', () => {
  props.input.value = '2016-11-11 12:13';
  shallow(<InputTime {...props} />);
});

describe('handleChange()', () => {
  const value = new Date(0);
  const date = new Date();
  const change = jest.fn();
  const ev = {};
  const newDate = handleChange(change, value)(ev, date);
  it('does not change the provided date object', () => {
    expect(newDate).not.toBe(date);
  });
  it('invokes the change function with the Date object', () => {
    expect(change.mock.calls[0][0]).toBeInstanceOf(Date);
  });
  it('handles the case without the value argument', () => {
    handleChange(change)(ev, date);
  });
});
