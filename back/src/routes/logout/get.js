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
      request.cookieAuth.set({
        id: 0,
        email: '',
        role: 0,
      });
      return reply('Logout Successful!');
    },
  },
};

export default route;
