const route = {
  method: 'GET',
  path: '/hello',
  config: {
    handler: (request, reply) => {
      reply('Hi!');
    },
  },
};

export default route;
