import expect from 'expect';
import { fromJS } from 'immutable';
import validate from './validate';

const email = 'bob@li.bob';
const password = '12345678';
const values = fromJS({
  email,
  password,
});

describe('validate', () => {
  it('returns an object', () => {
    expect(validate(values)).toBeAn(Object);
  });
  it('returns an empty object if there are no errors', () => {
    expect(validate(values)).toEqual({});
  });
  describe('returns error if password', () => {
    it('is not provided', () => {
      expect(validate(fromJS({ email })).password).toContain('required');
    });
    it('is an empty string', () => {
      expect(validate(values.set('password', '')).password).toContain('required');
    });
    it('is less that 6 characters', () => {
      expect(validate(values.set('password', '12345')).password).toContain('6');
    });
    it('is more than 128 characters', () => {
      expect(validate(values.set('password', Array(130).join('a'))).password).toContain('128');
    });
  });
  describe('returns error if email', () => {
    it('is not provided', () => {
      expect(validate(fromJS({ password })).email).toContain('required');
    });
    it('is an empty string', () => {
      expect(validate(values.set('email', '')).email).toContain('required');
    });
    it('is not valid email', () => {
      expect(validate(values.set('email', 'da@da')).email).toContain('Invalid');
    });
  });
});
