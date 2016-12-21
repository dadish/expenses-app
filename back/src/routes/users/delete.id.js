import co from 'co';
import Joi from 'joi';
import Boom from 'boom';
import { User, Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'DELETE',

  path: '/users/{id}',

  handler: (request, reply) => co(function* gen() {
    const client = request.auth.credentials;
    const id = request.params.id;
    // If the client is not manager or admin
    // do not obey
    if ([200, 300].indexOf(client.role) === -1) {
      reply(Boom.unauthorized());
      return;
    }

    // Client cannot delete herself
    if (client.id === id) {
      reply(Boom.conflict('Not allowed to delete yourself!'));
      return;
    }

    // manager cannot delete admin
    const user = yield User.findById(id);
    if (user.role === 300 && client.role !== 300) {
      reply(Boom.unauthorized());
      return;
    }

    // first we need to delete victim user`s expenses
    yield Expense.delForUser(id);

    const deletedItemId = yield User.del(id);
    if (deletedItemId) reply(deletedItemId);
    else reply(Boom.notFound());
  }).catch((err) => {
    handleInternalError(err);
    reply(Boom.internal());
  }),

  config: {
    tags: ['api'],
    validate: {
      params: {
        id: Joi.number().min(1).required(),
      },
    },
  },
};

export default route;
