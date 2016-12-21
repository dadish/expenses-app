import { fromJS } from 'immutable';
import { selectPeriod } from '../selectors';

const weekStart = new Date().toISOString();
const report = fromJS({
  weekStart,
});
const state = {};

describe('selectPeriod()', () => {
  it('returns string', () => {
    const period = selectPeriod()(state, { report });
    expect(typeof period).toBe("string");
  });
});
