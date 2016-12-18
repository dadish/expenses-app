import Hapi from 'hapi';
import Boom from 'boom';
import config from '../config';

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || config.port,
  routes: {
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
    validate: {
      failAction: (request, reply, source, error) => {
        reply(Boom.badRequest(JSON.stringify(error.data.details)));
      },
    },
  },
});

export default server;
