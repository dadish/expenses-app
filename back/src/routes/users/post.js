import Boom from 'boom';
import Joi from 'joi';
import co from 'co';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'POST',

  path: '/users',

  config: {
    handler: (request, reply) => co(function* gen() {
      const client = request.auth.credentials;
      const { role } = client;
      if ([200, 300].indexOf(role) === -1) {
        reply(Boom.unauthorized());
        return;
      }

      const { payload } = request;
      const { email } = payload;
      const items = yield User.find({ email });
      if (items.length) {
        reply(Boom.conflict('Email is already registred.'));
        return;
      }

      // make sure user administrator cannot create an admin user`
      if (client.role === 200 && payload.role === 300) {
        reply(Boom.unauthorized('Manager cannot create an administrator account.'));
        return;
      }

      const user = yield User.create({ ...payload });
      reply(user);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),

    tags: ['api'],

    validate: {
      payload: Joi.object().keys({
        email: Joi.reach(User.rules, 'email'),
        role: Joi.reach(User.rules, 'role'),
      }),
    },
  },
};

export default route;
