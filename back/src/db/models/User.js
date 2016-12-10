import Joi from 'joi';
import co from 'co';
import bcrypt from 'bcrypt';
import knex from '../knex';

const tableName = 'users';

/* eslint-disable newline-per-chained-call */
const rules = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().min(6).max(128)
    .when('confirmed', { is: true, then: Joi.required() }),
  role: Joi.number().valid([100, 200, 300]).required(),
  confirmed: Joi.boolean().valid([true, false]).default(false),
});
/* eslint-enable newline-per-chained-call */

/**
 * Validates the attributes of the user.
 * @param  {Object} [attributes={}] The attributes for the user table.
 *                                  { email, password }
 * @return {Promise}                Resolves to validation object. { error }
 *                                  If 'error' is empty, it means validation has
 *                                  passed
 */
const validate = (attributes = {}) => Promise.resolve(Joi.validate(attributes, rules));

/**
 * Hashes the string with bcypt module
 * @param  {string} pass The string to be hashed
 * @return {Promise}     Resolves to the hash string.
 */
const hashPassword = pass => bcrypt.hash(pass, 10);

/**
 * Verifies the password string againts it's hash string
 * @param  {string} pass The password string
 * @param  {string} hash The hash string
 * @return {Promise}      Resolves to boolean. True if verified, false otherwise
 */
const verifyPassword = (pass, hash) => bcrypt.compare(pass, hash);

/**
 * Removes the sensitive info from the user object
 * @param  {object} user The user json object
 * @return {user}        The filtered user json object.
 *                       Removes password, created_at, updated_at.
 */
const cleanUser = (user) => {
  const clean = {
    ...user,
  };
  delete clean.password;
  delete clean.created_at;
  delete clean.updated_at;
  return clean;
};

/**
 * Transforms attributes object into values that will be stored
 * in users table. For user the only thing that changes is the
 * password attribute. The password is hashed with bcrypt module.
 * @param  {object} attributes The attributes of the user.
 *                             { email, password }.
 * @return {Promise}           Promise that resolves to transformed attributes.
 */
const attributesToSleep = attributes => co(function* gen() {
  const sleepAttributes = {};
  const hash = yield hashPassword(attributes.password || '1U78dHX558dG5WTBidFnrfTUrjm18dL5');
  sleepAttributes.password = hash;
  sleepAttributes.email = attributes.email;
  sleepAttributes.role = attributes.role;
  sleepAttributes.confirmed = attributes.confirmed || false;
  return sleepAttributes;
});

/**
 * Find the users by given selector
 * @param  {object} selector Selector key & value pairs
 * @return {array}           An array of user json objects
 */
const find = (selector = {}, clean = true) => co(function* gen() {
  const items = yield knex(tableName).where(selector);
  if (clean) return items.map(cleanUser);
  return items;
});

/**
 * Find user by id
 * @param  {integer} id The user id
 * @return {object}    The user json object or null if not found
 */
const findById = id => co(function* gen() {
  const items = yield find({ id });
  if (items.length) return items[0];
  return null;
});

/**
 * Creates the user in database
 * @param  {object} attributes The values to be created in the database.
 *                             { email, password }.
 * @return {Promise}           Returns promise. Resolves to user id in the database.
 */
const create = attributes => co(function* gen() {
  const validation = yield validate(attributes);
  if (validation.error) yield Promise.reject(validation.error);
  const sleepAttributes = yield attributesToSleep(attributes);
  const ids = yield knex(tableName).insert(sleepAttributes);
  return findById(ids[0]);
});

const findAndValidate = (selector, password) => co(function* gen() {
  const users = yield find(selector, false);
  if (!users.length) return false;
  const user = users[0];
  const valid = yield verifyPassword(password, user.password);
  if (!valid) return false;
  return cleanUser(user);
});

/**
 * Delete the user object from the database
 * @param  {integer} id  The id of the user to be deleted
 * @return {integer}     Returns the id of the deleted user, or 0 if
 *                       could not delete.
 */
const del = id => co(function* gen() {
  const rows = yield knex(tableName).where({ id }).del();
  if (rows) return id;
  return rows;
});

/**
 * Update the user object in database
 * @param  {integer} id         The id of the user
 * @param  {object} attributes  A key & value pairs of properties to update
 * @return {object}             The updated user object
 */
const update = (id, attributes) => co(function* gen() {
  const validation = yield validate(attributes);
  if (validation.error) yield Promise.reject(validation.error);
  const sleepAttributes = yield attributesToSleep(attributes);
  const rows = yield knex(tableName).where({ id }).update(sleepAttributes);
  if (!rows) yield Promise.reject(new Error(`Could not update the user with id:${id}`));
  return findById(id);
});

/**
 * Creates the table in the database and enters the first demo user.
 * @type {helper}
 */
const tableCreation = (table) => {
  table.increments('id'); // id, auto increment, primaryKey
  table.string('email').notNullable(); // email, STRING 255
  table.string('password').notNullable(); // password, STRING 255
  table.integer('role').notNullable(); // role, INTEGER, either 300, 200, 100
  table.boolean('confirmed').defaultTo(false).notNullable(); // confirmed, BOOLEAN
  table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable(); // created_at
  table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable(); // updated_at
  table.unique(['email']); // email is unique
  table.index(['email']); // email is indexed
  table.engine('InnoDB');
};

export default {
  rules,
  validate,
  hashPassword,
  verifyPassword,
  cleanUser,
  attributesToSleep,
  create,
  update,
  del,
  find,
  findById,
  findAndValidate,
  tableCreation,
  tableName,
};
