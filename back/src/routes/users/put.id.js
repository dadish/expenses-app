import Boom from 'boom';
import Joi from 'joi';
import co from 'co';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'PUT',

  path: '/users/{id}',

  config: {
    handler: (request, reply) => co(function* gen() {
      let user;
      const client = request.auth.credentials;
      const id = request.params.id;
      const { role } = client;
      const { payload } = request;
      const { email } = payload;

      // make sure the client is authorised
      if ([200, 300].indexOf(role) === -1) {
        reply(Boom.unauthorized());
        return;
      }

      // make sure that manager cannot update the admin
      // data
      user = yield User.findById(id);
      if (client.role === 200 && user.role === 300) {
        reply(Boom.unauthorized('Manager cannot update Administrator data.'));
        return;
      }

      // make sure that manager cannot assign a role 300
      // to a user
      if (client.role === 200 && payload.role === 300) {
        reply(Boom.unauthorized('Manager cannot grant to a user an Administrator access.'));
        return;
      }

      // make sure email does not conflict
      let users = yield User.find({ email });
      users = users.filter(item => item.id !== id); // remove the the target user
      if (users.length) {
        reply(Boom.conflict('The email is already taken.'));
        return;
      }

      // update the user and reply with it
      user = yield User.update(id, { ...payload });
      reply(user);
    }).catch((err) => {
      handleInternalError(err);
      reply(Boom.internal());
    }),

    tags: ['api'],

    validate: {
      params: {
        id: Joi.number().min(1).required(),
      },
      payload: Joi.object().keys({
        email: Joi.reach(User.rules, 'email'),
        role: Joi.reach(User.rules, 'role'),
      }),
    },
  },
};

export default route;
