import co from 'co';
import knex from './knex';
import User from './models/User';
import Expense from './models/Expense';
import {
  generateAdminUsers,
  generateManagerUsers,
  generateRegularUsers,
  generateExpenses,
} from './generator';

let bootPromise = null;

export const dropTables = () => co(function* gen() {
  yield knex.schema.dropTableIfExists(Expense.tableName);
  yield knex.schema.dropTableIfExists(User.tableName);
});

export const createTables = () => co(function* gen() {
  yield knex.schema.createTableIfNotExists(User.tableName, User.tableCreation);
  yield knex.schema.createTableIfNotExists(Expense.tableName, Expense.tableCreation);
});

export const sync = () => {
  if (bootPromise !== null) return bootPromise;
  bootPromise = dropTables()
    .then(() => createTables())
    .then(() => Promise.all(generateAdminUsers().map(user => User.create(user))))
    .then(() => Promise.all(generateManagerUsers().map(user => User.create(user))))
    .then(() => Promise.all(generateRegularUsers().map(user => User.create(user))))
    .then(() => Promise.all(generateExpenses().map(expense => Expense.create(expense))));
  return bootPromise;
};
