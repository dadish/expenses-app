import Boom from 'boom';
import Joi from 'joi';
import co from 'co';
import { Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'PUT',

  path: '/expenses/{id}',

  config: {
    handler: (request, reply) => co(function* gen() {
      let expense;
      const client = request.auth.credentials;
      const id = request.params.id;
      const { payload } = request;

      expense = yield Expense.findById(id);
      // regular user can modify only her own expense record
      if (client.role !== 300) {
        if (!expense) {
          reply(Boom.notFound());
          return;
        } else if (expense.user !== client.id) {
          reply(Boom.unauthorized('You can modify only your own expense records.'));
          return;
        }
      }

      // tell the API consumer that you cannot modify the user property once created
      if (expense.user !== payload.user) {
        reply(Boom.conflict('You cannot modify the `user` property once created.'));
        return;
      }

      // update the user and reply with it
      expense = yield Expense.update(id, { ...payload });
      reply(expense);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),

    tags: ['api'],

    validate: {
      params: {
        id: Joi.number().min(1).required(),
      },
      payload: Expense.rules,
    },
  },
};

export default route;
