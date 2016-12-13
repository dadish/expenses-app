import {
  UPDATE_MATCHES,
} from './constants';
import { updateMatches } from './actions';

describe('updateMatches()', () => {
  it('should create the correct type', () => {
    expect(updateMatches().type).toBe(UPDATE_MATCHES);
  });
  it('should set the first argument as the payload of the action', () => {
    const target = {};
    expect(updateMatches(target).payload).toBe(target);
  });
});
