import co from 'co';
import Boom from 'boom';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/users',

  handler: (request, reply) => co(function* gen() {
    const client = request.auth.credentials;
    const { role } = client;
    let items;
    if ([200, 300].indexOf(role) === -1) {
      items = [];
    } else {
      items = yield User.find();
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
