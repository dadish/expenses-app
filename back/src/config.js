const db = {
  host: '127.0.0.1',
  user: 'expenses',
  password: 'expenses-mysql',
  database: 'expenses',
};

const testDb = {
  host: '127.0.0.1',
  user: 'expenses',
  password: 'expenses-mysql',
  database: 'expenses',
};

/* $lab:coverage:off$ */
const config = {
  port: process.env.PORT || 3010,
  debug: Boolean(process.env.DEBUG),
  db: process.env.TEST ? testDb : db,
};
/* $lab:coverage:on$ */

export default config;
