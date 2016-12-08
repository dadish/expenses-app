import Joi from 'joi';
import Boom from 'boom';
import co from 'co';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'POST',
  path: '/login',
  config: {
    tags: ['api'],
    auth: {
      strategy: 'base',
      mode: 'try',
    },
    validate: {
      payload: Joi.object().keys({
        email: Joi.reach(User.rules, 'email'),
        password: Joi.reach(User.rules, 'password'),
      }),
    },
    handler: (request, reply) => co(function* gen() {
      if (request.auth.isAuthenticated) {
        return reply(request.auth.credentials);
      }
      const { email, password } = request.payload;
      const user = yield User.findAndValidate({ email }, password);
      if (user) {
        request.cookieAuth.set(user);
        return reply(user);
      }
      return reply(Boom.unauthorized('Bad email or password'));
    }).catch((err) => {
      handleInternalError(err);
      return reply(Boom.badImplementation());
    }),
  },
};

export default route;
