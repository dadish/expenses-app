import React from 'react';
import { shallow } from 'enzyme';
import FilterAmount, { normalizeAmount } from './';

test('FilterAmount renders without errors', () => {
  shallow(<FilterAmount />);
});

describe('normalizeAmount()', () => {
  it('converts input into a number', () => {
    expect(normalizeAmount('234')).toBe(234);
  });
  it('returns 0 if cannot convert to number', () => {
    expect(normalizeAmount('strng')).toBe(0);
  });
});
