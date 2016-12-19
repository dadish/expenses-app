import Hapi from 'hapi';
import Boom from 'boom';
import config from '../config';

const server = new Hapi.Server();

server.connection({
  port: config.port,
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

if (config.debug) {
  server.on('response', (request) => {
    console.log(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`); // eslint-disable-line no-console
  });
}

export default server;
