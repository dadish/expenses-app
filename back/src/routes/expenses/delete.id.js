import co from 'co';
import Joi from 'joi';
import Boom from 'boom';
import { Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'DELETE',

  path: '/expenses/{id}',

  handler: (request, reply) => co(function* gen() {
    const client = request.auth.credentials;
    const id = request.params.id;

    // regular user can only delete it's own expense records
    if (client.role !== 300) {
      const expense = yield Expense.findById(id);
      if (!expense) {
        reply(Boom.notFound());
        return;
      } else if (expense.user !== client.id) {
        reply(Boom.unauthorized('You can delete only your own expense records.'));
        return;
      }
    }

    const deletedItemId = yield Expense.del(id);
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
