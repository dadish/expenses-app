import Boom from 'boom';
import co from 'co';
import { Expense, User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'POST',

  path: '/expenses',

  config: {
    handler: (request, reply) => co(function* gen() {
      const client = request.auth.credentials;
      const { payload } = request;

      if (payload.user !== client.id) {
        // Regular user can only create their own expense records
        if (client.role !== 300) {
          reply(Boom.unauthorized('You can create only your own expense records.'));
          return;
        }

        // if admin is creating a record for some other user
        // make sure that user exists
        const user = yield User.findById(payload.user);
        if (!user) {
          reply(Boom.conflict('The `user` should be a registered user.'));
          return;
        }
      }

      const expense = yield Expense.create({ ...payload });
      reply(expense);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),

    tags: ['api'],

    validate: {
      payload: Expense.rules,
    },
  },
};

export default route;
