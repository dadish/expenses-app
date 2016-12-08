import 'babel-polyfill';
import expect from 'expect';
import Lab from 'lab';
import bcrypt from 'bcrypt';

import User from '../User';
import { sync as syncDB } from '../../table';

const {
  validate,
  hashPassword,
  verifyPassword,
  cleanUser,
  create,
  update,
  del,
  find,
  findById,
  findAndValidate,
} = User;

// export lab
const lab = module.exports.lab = Lab.script();

const {
  describe,
  it,
  before,
  after,
} = lab;

describe('User module', () => {
  const createdIds = [];
  const email = 'blob@bb.vo';
  const password = '123#4^67_Fd';
  const role = 300;
  const confirmed = true;
  const attributes = {
    email,
    password,
    role,
    confirmed,
  };

  // boot the DB before starting to test
  before(() => syncDB());

  describe('validate()', () => {
    it('validate function is exported', (done) => {
      expect(validate).toExist();
      done();
    });

    it('passes with proper attribues', () => validate(attributes));

    it('fails if no attribute is provided', () => validate()
    .then((result) => {
      expect(result.error.message).toContain('required');
    }));

    it('fails if email is omitted', () => validate({
      password,
      role,
    }).then((result) => {
      expect(result.error.message).toContain('required');
      expect(result.error.message).toContain('email');
    }));

    it('fails if email is not valid email', () => validate({
      password,
      role,
      email: 'ddd@ddd',
    }).then((result) => {
      expect(result.error.message).toContain('valid');
      expect(result.error.message).toContain('email');
    }));

    it('fails if password length is less than 6', () => validate({
      email,
      role,
      password: '12345',
    }).then((result) => {
      expect(result.error.message).toContain('length');
      expect(result.error.message).toContain('password');
    }));

    it('fails if password length is more than 128', () => validate({
      email,
      role,
      password: Array(130).join('a'),
    }).then((result) => {
      expect(result.error.message).toContain('length');
      expect(result.error.message).toContain('password');
    }));
  });

  describe('hashPassword()', () => {
    it('returns a promise', (done) => {
      const promise = hashPassword('password');
      expect(promise).toBeA(Promise);
      done();
    });
    it('hashes a password with the bcyrpt hash with ten rounds salt', () => {
      const pass = 'password';
      return hashPassword(pass).then((hash) => {
        expect(bcrypt.compareSync(pass, hash)).toBe(true);
      });
    });
  });

  describe('verifyPassword()', () => {
    const hash = bcrypt.hashSync(password, 10);
    it('returns a promise', (done) => {
      expect(verifyPassword(password, hash)).toBeA(Promise);
      done();
    });
    it('resolves to true if password is correct', () => verifyPassword(password, hash).then((valid) => {
      expect(valid).toBe(true);
    }));
    it('resolves to false if password is not correct', () => verifyPassword('incorrectPassword', hash).then((valid) => {
      expect(valid).toBe(false);
    }));
  });

  describe('cleanUser()', () => {
    it('removes the `password` attribute from an object', (done) => {
      const user = {
        password,
      };
      expect(user.password).toExist();
      expect(cleanUser(user).password).toNotExist();
      done();
    });
    it('removes the `created_at` attribute from an object', (done) => {
      const user = {
        created_at: 'asdkxjnr',
      };
      expect(user.created_at).toExist();
      expect(cleanUser(user).created_at).toNotExist();
      done();
    });
    it('removes the `updated_at` attribute from an object', (done) => {
      const user = {
        updated_at: 'adskfhnma',
      };
      expect(user.updated_at).toExist();
      expect(cleanUser(user).updated_at).toNotExist();
      done();
    });
  });

  describe('create()', () => {
    it('is exported', (done) => {
      expect(create).toExist();
      done();
    });

    it('creates a user if good attributes are passed', () => create(attributes)
    .then((user) => {
      expect(user).toExist();
      expect(user).toBeAn(Object);
      expect(user.id).toBeA('number');
      createdIds.push(user.id);
    }));

    it('creates a user without password', () => create({
      ...attributes,
      email: 'bob@oden.kirk',
      password: undefined,
      confirmed: false,
    }).then((user) => {
      expect(user).toExist();
      expect(user.id).toBeA('number');
      createdIds.push(user.id);
    }));

    it('creates a user with password and coach', () => create({
      ...attributes,
      email: 'bobby@oden.kirk',
    }).then((user) => {
      expect(user).toExist();
      expect(user.id).toBeA('number');
      createdIds.push(user.id);
    }));

    it('throws if attributes are not good', (done) => {
      create({ password }).catch((err) => {
        expect(err.message).toContain('required');
        expect(err.message).toContain('email');
        done();
      });
    });
  });

  describe('update()', () => {
    it('returns a promise', (done) => {
      expect(update(createdIds[0], attributes)).toBeA(Promise);
      done();
    });
    it('updates the attributes', () => update(createdIds[1], {
      ...attributes,
      email: 'no-dupe@ema.il',
      role: 200,
    }).then((user) => {
      expect(user).toExist();
      expect(user.role).toBe(200);
    }));
    it('rejects if the id is invalid', () => update(3400, attributes)
    .catch((err) => {
      expect(err).toExist();
      expect(err.message).toContain('id');
    }));
    it('rejects if the attributes are invalid', () => update(createdIds[0], {
      ...attributes,
      role: 0,
    }).catch((err) => {
      expect(err).toExist();
      expect(err.message).toContain('role');
    }));
  });

  describe('find()', () => {
    it('is exported', (done) => {
      expect(find).toExist();
      done();
    });
    it('returns an empty array if finds nothing', () => find({ id: 1000 })
    .then((items) => {
      expect(items).toBeAn('array');
      expect(items.length).toBe(0);
    }));

    it('returns an array of users when finds them', () => find({ id: 1 })
    .then((items) => {
      expect(items.length).toBe(1);
      expect(items[0].id).toBe(1);
    }));

    it('returns everything if no selector is provided', () => find()
    .then((items) => {
      expect(items).toBeAn('array');
      expect(items.length).toBeGreaterThan(1);
    }));

    it('strips the user`s password by default', () => find()
    .then((items) => {
      expect(items[0].email).toExist();
      expect(items[0].password).toNotExist();
    }));

    it('returns raw user json data if second argument `clean` set to false', () => find({}, false)
    .then((items) => {
      expect(items[0].email).toExist();
      expect(items[0].password).toExist();
    }));
  });

  describe('findById()', () => {
    it('is exported', (done) => {
      expect(findById).toExist();
      done();
    });
    it('returns a Promise', (done) => {
      expect(findById(1)).toBeA(Promise);
      done();
    });
    it('resolves to a user object for given id', () => {
      const id = createdIds[0];
      return findById(id).then((user) => {
        expect(user).toExist();
        expect(user.id).toBe(id);
        expect(user.email).toBe(email);
      });
    });
    it('resolves to null if no user is found', () => findById(1000)
    .then((user) => {
      expect(user).toBe(null);
    }));
  });

  describe('findAndValidate()', () => {
    it('returns a promise', (done) => {
      expect(findAndValidate({ email }, password)).toBeA(Promise);
      done();
    });
    it('resolves to false if user is not found', () => findAndValidate({
      email: 'bob@example.com',
    }, password).then((valid) => {
      expect(valid).toBe(false);
    }));
    it('resolves to false if password is wrong', () => findAndValidate({
      email,
    }, 'badPassword').then((valid) => {
      expect(valid).toBe(false);
    }));
    it('resolves to user json data if user and it`s password are valid', () => findAndValidate({
      email,
    }, password).then((user) => {
      expect(user).toExist();
      expect(user).toBeAn(Object);
      expect(user.email).toBe(email);
    }));
    it('the resolved user is a clean user json data, without password', () => findAndValidate({
      email,
    }, password).then((user) => {
      expect(user).toExist();
      expect(user.id).toExist();
      expect(user.email).toExist();
      expect(user.password).toNotExist();
    }));
  });

  describe('del()', () => {
    it('returns a promise', (done) => {
      expect(del(createdIds.pop(), attributes)).toBeA(Promise);
      done();
    });
    it('returns 0 if could not delete', () => del(1230).then((rows) => {
      expect(rows).toBe(0);
    }));
    it('returns id of the deleted run when successful', () => {
      const id = createdIds.pop();
      return del(id).then((deletedId) => {
        expect(deletedId).toBe(id);
      });
    });
  });

  after(() => Promise.all(createdIds.map(del)));
});
