import co from 'co';
import Joi from 'joi';
import Boom from 'boom';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/users/email/{match}',

  handler: (request, reply) => co(function* gen() {
    const client = request.auth.credentials;
    const match = request.params.match;
    let items;
    // make sure user is allowed to crud users
    if ([200, 300].indexOf(client.role) === -1) {
      reply(Boom.unauthorized('You are not authorised for this request.'));
      return;
    }

    // get the users
    items = yield User.findMatch('email', match);

    // make sure manager does not see the administrators
    if (client.role === 200) {
      items = items.filter(item => item.role !== 300);
    }

    reply(items);
  }).catch((err) => {
    handleInternalError(err);
    reply(Boom.internal());
  }),

  config: {
    tags: ['api'],
    validate: {
      params: {
        match: Joi.string().required().description('String that `email` should contain.'),
      },
    },
  },
};

export default route;
