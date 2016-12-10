import co from 'co';
import Boom from 'boom';
import { Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/expenses',

  handler: (request, reply) => co(function* gen() {
    const client = request.auth.credentials;
    let items;

    // admin user gets all expenses
    if (client.role === 300) {
      items = yield Expense.find();

    // everybody else gets their own expenses
    } else {
      items = yield Expense.find({ id: client.id });
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
