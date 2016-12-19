const config = {
  port: process.env.PORT || 3001,
  debug: Boolean(process.env.DEBUG),
  db: {
    host: '127.0.0.1',
    user: 'expenses',
    password: 'expenses-mysql',
    database: 'expenses',
  },
};

export default config;
