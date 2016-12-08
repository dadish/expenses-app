import expect from 'expect';
import { fromJS } from 'immutable';
import validate from '../validate';

const email = 'bobli@bob.lo';
const password = 'wesuh32e[a]';
const passwordConfirm = password;
const values = fromJS({
  email,
  password,
  passwordConfirm,
});

describe('validate()', () => {
  describe('it returns errors if email', () => {
    it('is empty', () => {
      const errors = validate(values.delete('email'));
      expect(errors.email).toExist();
      expect(errors.email).toContain('required');
    });
    it('is not valid', () => {
      const errors = validate(values.set('email', 'bob@li'));
      expect(errors.email).toExist();
      expect(errors.email).toContain('valid');
    });
  });
  describe('it returns error if password', () => {
    it('is empty', () => {
      const errors = validate(values.delete('password'));
      expect(errors.password).toExist();
      expect(errors.password).toContain('required');
    });
    it('is less than 6 characters', () => {
      const errors = validate(values.set('password', '12345'));
      expect(errors.password).toExist();
      expect(errors.password).toContain('more');
    });
    it('is more than 128 characters', () => {
      const errors = validate(values.set('password', Array(130).join('a')));
      expect(errors.password).toExist();
      expect(errors.password).toContain('less');
    });
  });
  describe('returns errors if passwordConfirm', () => {
    it('is not the same as password', () => {
      const errors = validate(values.set('passwordConfirm', 'another'));
      expect(errors.passwordConfirm).toExist();
      expect(errors.passwordConfirm).toContain('same');
    });
  });
  it('returns empty object if there are no error', () => {
    const errors = validate(values);
    expect(errors).toEqual({});
  });
});
