import Boom from 'boom';

const route = {
  method: 'GET',
  path: '/login',
  config: {
    tags: ['api'],
    auth: {
      strategy: 'base',
      mode: 'try',
    },
    handler: (request, reply) => {
      if (request.auth.isAuthenticated) {
        return reply(request.auth.credentials);
      }
      return reply(Boom.unauthorized());
    },
  },
};

export default route;
