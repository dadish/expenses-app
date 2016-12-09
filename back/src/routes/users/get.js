import co from 'co';
import Boom from 'boom';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/users',

  handler: (request, reply) => co(function* gen() {
    const client = request.auth.credentials;
    let items;
    // make sure user is allowed to crud users
    if ([200, 300].indexOf(client.role) === -1) {
      reply(Boom.unauthorized('You are not authorised for this action.'));
      return;
    }

    // get the users
    items = yield User.find();

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
  },
};

export default route;
