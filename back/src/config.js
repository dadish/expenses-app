import dotenv from 'dotenv';

dotenv.config();

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const testDb = {
  host: process.env.DB_TEST_HOST || process.env.DB_HOST,
  user: process.env.DB_TEST_USER || process.env.DB_USER,
  password: process.env.DB_TEST_PASS || process.env.DB_PASS,
  database: process.env.DB_TEST_NAME || process.env.DB_NAME,
};

/* $lab:coverage:off$ */
const config = {
  port: process.env.PORT || 3010,
  debug: Boolean(process.env.DEBUG),
  db: process.env.TEST ? testDb : db,
};
/* $lab:coverage:on$ */

export default config;
