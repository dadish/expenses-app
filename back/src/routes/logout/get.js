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
      request.cookieAuth.clear();
      return reply('Logout Successful!');
    },
  },
};

export default route;
