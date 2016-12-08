import Hapi from 'hapi';
import config from '../config';

const server = new Hapi.Server();

server.connection({
  port: config.port,
  routes: {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  },
});

export default server;
