const route = {
  method: 'GET',
  path: '/hello',
  config: {
    auth: false,
    tags: ['api'],
    handler: (request, reply) => {
      reply('Hi!');
    },
  },
};

export default route;
