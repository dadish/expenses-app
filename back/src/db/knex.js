import knex from 'knex';
import config from '../config';

export default knex({
  client: 'mysql',
  connection: config.db,
});
