import Joi from 'joi';
import co from 'co';
import knex from '../knex';
import User from './User';

const tableName = 'expenses';
const querySelectProps = knex.raw(`${tableName}.*, ${User.tableName}.email AS userEmail`);
const queryJoinUsers = knex.raw(`${User.tableName} ON ${tableName}.user = ${User.tableName}.id`);
const querySelectCount = knex.raw('COUNT(*) AS rows');
const groupByWeek = 'STR_TO_DATE(CONCAT(YEARWEEK(date)," Monday"), "%X%V %W")';

const rules = Joi.object().keys({
  user: Joi.number().integer().required()
          .description('The id of the user.'),
  amount: Joi.number().integer().required()
            .description('The amount of the expense in US cents.'),
  date: Joi.date().required()
          .description('When the expense has happened.'),
  description: Joi.string().required()
                 .description('The description of the expenditure.'),
  comment: Joi.string().optional()
             .description('Optional comments on the expenditure.'),
});

/**
 * Validates the expense json object
 * @param  {Object} [attributes={}] The expense json object
 * @return {Promise}                The reolved object contains error proprty
 *                                  if the validation failed. Or values property
 *                                  if the validation successful.
 *                                  Please note that the values in the value
 *                                  property could be different from those passed
 *                                  into function because Joi rules might be defined
 *                                  as such.
 */
const validate = (attributes = {}) => Promise.resolve(Joi.validate(attributes, rules));

const normalizeSelectors = selector => Object.keys(selector)
  .filter(key => ['sortDirection', 'sortField'].indexOf(key) === -1)
  .map((key) => {
    let field = `${tableName}.${key}`;
    let operator = '=';
    let value = selector[key];

    // userEmail
    if (key === 'userEmail') {
      field = `${User.tableName}.email`;
      operator = 'LIKE';
      value = `"%${value}%"`;
    }

    // amountMax
    if (key === 'amountMax') {
      field = `${tableName}.amount`;
      operator = '<=';
    }

    // amountMin
    if (key === 'amountMin') {
      field = `${tableName}.amount`;
      operator = '>=';
    }

    // dateFrom
    if (key === 'dateFrom') {
      field = `${tableName}.date`;
      operator = '>=';
      value = value.toISOString().slice(0, -5);
      value = `STR_TO_DATE("${value}", "%Y-%m-%dT%T")`;
    }

    // dateTo
    if (key === 'dateTo') {
      field = `${tableName}.date`;
      operator = '<=';
      value = value.toISOString().slice(0, -5);
      value = `STR_TO_DATE("${value}", "%Y-%m-%dT%T")`;
    }

    // comment
    if (key === 'comment') {
      operator = 'LIKE';
      value = `"%${value}%"`;
    }

    // description
    if (key === 'description') {
      operator = 'LIKE';
      value = `"%${value}%"`;
    }

    return { field, operator, value };
  });

const counTotal = q => co(function* get() {
  const query = q.clone().first(querySelectCount);
  const total = yield query;
  return total.rows;
});

/**
 * Finds the expenses
 * @param  {Object} [selector={}] The rules for selecting the expenses
 * @return {Promise}              Resolves to an array of expenses found.
 */
const find = (selector = {}, page = 1, limit = 50) => co(function* gen() {
  // calculate the offset
  const offset = (page - 1) * limit;

  // create the query builder and set where from
  // we are going to select the data
  const query = knex(tableName).leftJoin(queryJoinUsers);

  // set the selecting rules
  normalizeSelectors(selector).forEach(({ field, operator, value }) => {
    query.whereRaw(`${field} ${operator} ${value}`);
  });

  // count the total rows for this query
  const total = yield counTotal(query);

  // select the default properties
  query.select(querySelectProps);

  // set offset and limit
  query.limit(limit).offset(offset);

  // set the sorting
  query.orderBy(selector.sortField || 'date', selector.sortDirection || 'desc');

  // query the data
  const list = yield query;

  // return what we have
  return { list, total, page, limit };
});

/**
 * Find a expense by id
 * @param  {integer} id The id of the expense you are looking for.
 * @return {object}     The expense json object.
 */
const findById = id => co(function* gen() {
  const query = knex(tableName)
                  .first(querySelectProps)
                  .leftJoin(queryJoinUsers);
  const { field, value } = normalizeSelectors({ id })[0];
  query.where(field, value);
  const item = yield query;
  if (!item) return null;
  return item;
});

/**
 * buildQuery
 * @return {object}
 */
const buildReport = (selector = {}, page = 1, limit = 50) => co(function* gen() {
  // calculate the offset
  const offset = (page - 1) * limit;

  // create the query
  const query = knex(tableName);

  // select and alias the start of the week as weekSart
  query.select(knex.raw(`${groupByWeek} AS weekStart`));

  // set the selecting rules
  // for now this is used only for `user` field
  normalizeSelectors(selector).forEach(({ field, operator, value }) => {
    query.whereRaw(`${field} ${operator} ${value}`);
  });

  // sort the query by weekStart
  query.orderBy('weekStart', 'desc');

  // group the query by start of the week aliased as weekStart
  query.groupBy('weekStart');

  const { rows } = yield knex.first(querySelectCount).from(knex.raw(`(${query.toString()}) AS t1`));

  // select and alias the total spent amount per selected group as totalSpent
  query.select(knex.raw('SUM(amount) as totalSpent'));

  // set offset and limit
  query.limit(limit).offset(offset);

  // execute the query
  const list = yield query;

  return { list, total: rows, page, limit };
});

/**
 * Transforms attributes object into values that will be stored
 * in users table. For user the only thing that changes is the
 * password attribute. The password is hashed with bcrypt module.
 * @param  {object} attributes The attributes of the user.
 *                             { email, password }.
 * @return {Promise}           Promise that resolves to transformed attributes.
 */
const attributesToSleep = (attributes) => {
  const sleepAttributes = {};
  sleepAttributes.user = attributes.user;
  sleepAttributes.amount = attributes.amount;
  sleepAttributes.date = attributes.date;
  sleepAttributes.description = attributes.description;
  sleepAttributes.comment = attributes.comment;
  return Promise.resolve(sleepAttributes);
};

/**
 * Creates a expense object in database
 * @param  {object} attributes The attributes of the new object
 * @return {Promise}           Resolves to the id of the newly created expense
 */
const create = attributes => co(function* gen() {
  const validation = yield validate(attributes);
  if (validation.error) yield Promise.reject(validation.error);
  const sleepAttributes = yield attributesToSleep(attributes);
  const ids = yield knex(tableName).insert(sleepAttributes);
  return findById(ids[0]);
});

/**
 * Update the expense object in database
 * @param  {integer} id         The id of the expense
 * @param  {object} attributes  A key & value pairs of properties to update
 * @return {object}             The updated expense object
 */
const update = (id, attributes) => co(function* gen() {
  const validation = yield validate(attributes);
  if (validation.error) yield Promise.reject(validation.error);
  const sleepAttributes = yield attributesToSleep(attributes);
  delete sleepAttributes.user; // user should not be modified once created
  const rows = yield knex(tableName).where({ id }).update(sleepAttributes);
  if (!rows) yield Promise.reject(new Error(`Could not update the expense with id:${id}`));
  return findById(id);
});

/**
 * Delete the expense object from the database
 * @param  {integer} id  The id of the expense to be deleted
 * @return {integer}     Returns the id of the deleted expense, or 0 if
 *                       could not delete.
 */
const del = id => co(function* gen() {
  const rows = yield knex(tableName).where({ id }).del();
  if (rows) return id;
  return rows;
});

/**
 * Deletes the expenses for given user.
 * @param  {integer} id  The id of the user
 * @return {integer}     Resolves to the number of rows deleted.
 */
const delForUser = id => co(function* gen() {
  const rows = yield knex(tableName).where({ user: id }).del();
  return rows;
});

/**
 * Creates the table in the database.
 * @type {helper}
 */
const tableCreation = (table) => {
  table.increments('id');
  table.integer('user').unsigned().notNullable();
  table.bigInteger('amount').notNullable();
  table.dateTime('date').notNullable();
  table.text('comment').notNullable();
  table.text('description').notNullable();
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  table.index(['user', 'date']);
  table.foreign('user').references('users.id').onDelete('RESTRICT');
  table.engine('InnoDB');
  table.collate('utf8_unicode_ci');
};

export default {
  tableName,
  tableCreation,
  rules,
  validate,
  normalizeSelectors,
  find,
  findById,
  buildReport,
  create,
  update,
  del,
  delForUser,
  attributesToSleep,
};
