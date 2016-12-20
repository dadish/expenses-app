import co from 'co';
import Joi from 'joi';
import Boom from 'boom';
import { Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/expenses/report',

  config: {
    tags: ['api'],
    validate: {
      query: {
        limit: Joi.number().positive().max(500).min(1)
                .default(50)
                .optional()
                .description('The number of items to return. Default 50.'),
        page: Joi.number().positive().default(1).optional()
                .description('The page of the items. Default 1.'),
      },
    },

    handler: (request, reply) => co(function* gen() {
      const { page, limit } = request.query;
      const items = yield Expense.buildReport(page, limit);
      reply(items);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),
  },
};

export default route;
