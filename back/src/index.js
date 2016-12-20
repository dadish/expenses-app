import 'babel-polyfill'; // for generators support
import co from 'co';
import pify from 'pify';
import server from './server';
import auth from './auth';
import routes from './routes';
import swagger from './swagger';

const start = app => pify(app.start.bind(app))()
  .then(() => console.log(`Serving at: ${server.info.uri}`)); // eslint-disable-line no-console

co(function* gen() {
  yield auth(server);
  yield swagger(server);
  server.route(routes);
  yield start(server);
}).catch((err) => {
  throw err;
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason); // eslint-disable-line no-console
});
