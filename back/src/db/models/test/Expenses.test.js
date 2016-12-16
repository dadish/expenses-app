import expect from 'expect';
import Lab from 'lab';
import 'babel-polyfill';

import { sync as syncDB } from '../../table';
import Expense from '../Expense';
import User from '../User';

const {
  validate,
  create,
  update,
  find,
  normalizeSelectors,
  findById,
  del,
  delForUser,
} = Expense;

// export lab
const lab = module.exports.lab = Lab.script();

const {
  describe,
  it,
  before,
  after,
} = lab;

describe('Expense Model', () => {
  const createdExpenseIds = [];
  const user = 1;
  const amount = 30 * 60 * 60 * 1000;
  const description = 'Description';
  const comment = 'Comment';
  const date = '2016-11-13 23:23';
  const attributes = {
    user,
    amount,
    date,
    description,
    comment,
  };

  // make sure table is created before starting to test it
  before(() => syncDB());

  describe('validate()', () => {
    it('returns promise', (done) => {
      expect(validate(attributes)).toBeA(Promise);
      done();
    });
    it('fails if nothing is provided', () => validate().then((result) => {
      expect(result.error).toExist();
      expect(result.error.message).toContain('required');
    }));
  });

  describe('create()', () => {
    it('returns a promise', () => {
      const creation = create(attributes);
      expect(creation).toBeA(Promise);
      creation.then(expense => createdExpenseIds.push(expense.id));
      return creation;
    });
    it('resolves to an object when created', () => create(attributes)
    .then((expense) => {
      expect(expense).toBeAn(Object);
      expect(expense.id).toBeA('number');
      createdExpenseIds.push(expense.id);
    }));
    it('rejects when invalid attributes are passed', () => create({
      foo: 'bar',
    }).catch((err) => {
      expect(err).toExist();
      expect(err.message).toContain('required');
    }));
  });

  describe('find()', () => {
    it('returns promise', (done) => {
      expect(find()).toBeA(Promise);
      done();
    });
    it('resolves to an object with `page`, `limit`, `total` and `list` properties', () => find()
    .then((result) => {
      expect(result).toExist();
      expect(result).toBeAn(Object);
      expect(result.page).toExist();
      expect(result.limit).toExist();
      expect(result.total).toExist();
      expect(result.list).toExist();
    }));
    it('accepts page and limit options', () => {
      const page = 3;
      const limit = 10;
      return find({}, page, limit).then((result) => {
        expect(result.page).toBe(page);
        expect(result.limit).toBe(limit);
      });
    });
    it('the list property is an empty array if nothing found', () => find({
      id: 1230,
    }).then((result) => {
      expect(result).toExist();
      expect(result.list).toBeAn(Array);
      expect(result.list.length).toBe(0);
    }));
  });

  describe('normalizeSelectors()', () => {
    describe('for userEmail', () => {
      const field = 'userEmail';
      const value = 'foo';
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to User.tableName.email', (done) => {
        expect(normalizedSelector.field).toBe(`${User.tableName}.email`);
        done();
      });
      it('sets the operator to `LIKE`', (done) => {
        expect(normalizedSelector.operator).toBe('LIKE');
        done();
      });
      it('sets the value to `%value%`', (done) => {
        expect(normalizedSelector.value).toBe(`"%${value}%"`);
        done();
      });
    });
    describe('for amountMax', () => {
      const field = 'amountMax';
      const value = 120;
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to Expense.tableName.amount', (done) => {
        expect(normalizedSelector.field).toBe(`${Expense.tableName}.amount`);
        done();
      });
      it('sets the operator to `<=`', (done) => {
        expect(normalizedSelector.operator).toBe('<=');
        done();
      });
      it('sets the value to value', (done) => {
        expect(normalizedSelector.value).toBe(value);
        done();
      });
    });
    describe('for amountMin', () => {
      const field = 'amountMin';
      const value = 120;
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to Expense.tableName.amount', (done) => {
        expect(normalizedSelector.field).toBe(`${Expense.tableName}.amount`);
        done();
      });
      it('sets the operator to `>=`', (done) => {
        expect(normalizedSelector.operator).toBe('>=');
        done();
      });
      it('sets the value to value', (done) => {
        expect(normalizedSelector.value).toBe(value);
        done();
      });
    });
    describe('for dateFrom', () => {
      const field = 'dateFrom';
      const value = new Date();
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to Expense.tableName.date', (done) => {
        expect(normalizedSelector.field).toBe(`${Expense.tableName}.date`);
        done();
      });
      it('sets the operator to `>=`', (done) => {
        expect(normalizedSelector.operator).toBe('>=');
        done();
      });
      it('sets the value to STR_TO_DATE("value", "%Y-%m-%dT%T")', (done) => {
        expect(normalizedSelector.value).toBe(`STR_TO_DATE("${value.toISOString().slice(0, -5)}", "%Y-%m-%dT%T")`);
        done();
      });
    });
    describe('for dateTo', () => {
      const field = 'dateTo';
      const value = new Date();
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to Expense.tableName.date', (done) => {
        expect(normalizedSelector.field).toBe(`${Expense.tableName}.date`);
        done();
      });
      it('sets the operator to `>=`', (done) => {
        expect(normalizedSelector.operator).toBe('<=');
        done();
      });
      it('sets the value to STR_TO_DATE("value", "%Y-%m-%dT%T")', (done) => {
        expect(normalizedSelector.value).toBe(`STR_TO_DATE("${value.toISOString().slice(0, -5)}", "%Y-%m-%dT%T")`);
        done();
      });
    });
    describe('for comment', () => {
      const field = 'comment';
      const value = 'foo';
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to Expense.tableName.comment', (done) => {
        expect(normalizedSelector.field).toBe(`${Expense.tableName}.comment`);
        done();
      });
      it('sets the operator to `LIKE`', (done) => {
        expect(normalizedSelector.operator).toBe('LIKE');
        done();
      });
      it('sets the value to `%value%`', (done) => {
        expect(normalizedSelector.value).toBe(`"%${value}%"`);
        done();
      });
    });
    describe('for description', () => {
      const field = 'description';
      const value = 'foo';
      const normalizedSelector = normalizeSelectors({ [field]: value })[0];
      it('sets the field to Expense.tableName.description', (done) => {
        expect(normalizedSelector.field).toBe(`${Expense.tableName}.description`);
        done();
      });
      it('sets the operator to `LIKE`', (done) => {
        expect(normalizedSelector.operator).toBe('LIKE');
        done();
      });
      it('sets the value to `%value%`', (done) => {
        expect(normalizedSelector.value).toBe(`"%${value}%"`);
        done();
      });
    });
  });

  describe('findById()', () => {
    it('returns a promise', (done) => {
      expect(findById(createdExpenseIds[0])).toBeA(Promise);
      done();
    });
    it('resolves to expense json object if finds it', () => findById(createdExpenseIds[0])
    .then((expense) => {
      expect(expense).toBeAn(Object);
      expect(expense.id).toBe(createdExpenseIds[0]);
    }));
    it('resolves to null if it does not find the expense', () => findById(1000)
    .then((expense) => {
      expect(expense).toBe(null);
    }));
    it('rejects if not valid id is provided', () => findById({
      foo: 'bar',
    }).catch((err) => {
      expect(err).toExist();
    }));
  });

  describe('update()', () => {
    it('returns a promise', () => {
      const updater = update(createdExpenseIds[0], { ...attributes, comment: 'new comment' });
      expect(updater).toBeA(Promise);
      return updater;
    });
    it('resolves to expense json object', () => update(createdExpenseIds[0], attributes)
    .then((expense) => {
      expect(expense).toExist();
      expect(expense).toBeAn(Object);
      expect(expense.comment).toBe(attributes.comment);
    }));
    it('rejects if attributes are not valid', () => update(1, {
      comment: 33443,
    }).catch((err) => {
      expect(err).toExist(err);
      expect(err).toBeAn(Error);
    }));
    it('rejects if id is not valid', () => update(1234, attributes)
    .catch((err) => {
      expect(err).toExist(err);
      expect(err).toBeAn(Error);
    }));
    it('will not update the user attribute', () => update(createdExpenseIds[0], {
      ...attributes,
      user: 2,
    }).then((expense) => {
      expect(attributes.user).toNotBe(2);
      expect(expense.user).toBe(attributes.user);
    }));
    it('does not allow to update attributes partially', () => update(1, {
      comment: 'some text',
      amount: 4676,
    }).catch((err) => {
      expect(err).toExist();
      expect(err.message).toContain('required');
    }));
  });

  describe('del()', () => {
    it('returns a promise', () => {
      const deletion = del(createdExpenseIds.pop());
      expect(deletion).toBeA(Promise);
      return deletion;
    });
    it('returns 0 if could not delete', () => del(1230).then((rows) => {
      expect(rows).toBe(0);
    }));
    it('returns id of the deleted expense when successful', () => {
      const id = createdExpenseIds.pop();
      return del(id).then((deletedId) => {
        expect(deletedId).toBe(id);
      });
    });
  });

  describe('delForUser()', () => {
    it('resolves to 0 if nothing was deleted', () => delForUser(1000)
    .then((rows) => {
      expect(rows).toBe(0);
    }));
  });

  after(() => Promise.all(createdExpenseIds.map(del)));
});
