const route = {
  method: 'GET',
  path: '/logout',
  config: {
    tags: ['api'],
    auth: {
      strategy: 'base',
      mode: 'try',
    },
    handler: (request, reply) => {
      request.cookieAuth.ttl(0);
      return reply('Logout Successful!');
    },
  },
};

export default route;
