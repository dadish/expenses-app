import co from 'co';
import Joi from 'joi';
import Boom from 'boom';
import { Expense } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'GET',

  path: '/expenses',

  config: {
    tags: ['api'],

    validate: {
      query: {
        userEmail: Joi
          .string()
          .optional()
          .description('String that is present in user`s email.'),

        comment: Joi
          .string()
          .optional()
          .description('String that is present in comment of the expense.'),

        description: Joi
          .string()
          .optional()
          .description('String that is present in description of the expense.'),

        amountMax: Joi
          .number()
          .optional()
          .description('The maximum amount spent. In Cents.'),

        amountMin: Joi
          .number()
          .optional()
          .description('The minimum amount spent. In Cents.'),

        dateFrom: Joi
          .date()
          .optional()
          .description('The expenses made after this date inclusive.'),

        dateTo: Joi
          .date()
          .optional()
          .description('The expenses made before this date inclusive.'),

        limit: Joi
          .number()
          .positive()
          .max(500)
          .min(1)
          .default(50)
          .optional()
          .description('The number of items to return. Default 50.'),

        page: Joi
          .number()
          .positive()
          .default(1)
          .optional()
          .description('The page of the items. Default 1.'),

        sortField: Joi
          .string()
          .valid(['userEmail', 'comment', 'description', 'amount', 'date'])
          .optional()
          .default('date')
          .description('The field which the result set should be sorted by'),

        sortDirection: Joi
          .string()
          .optional()
          .valid(['asc', 'desc'])
          .default('desc')
          .description('The direction of the sorting.'),
      },
    },

    handler: (request, reply) => co(function* gen() {
      const client = request.auth.credentials;
      const { page, limit, ...query } = request.query;

      // if not admin user show only their own records
      if (client.role !== 300) {
        query.user = client.id;
      }

      const items = yield Expense.find(query, page, limit);
      reply(items);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),
  },
};

export default route;
