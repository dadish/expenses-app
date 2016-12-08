import Joi from 'joi';
import Boom from 'boom';
import co from 'co';
import { User } from '../../db';
import { handleInternalError } from '../utils';

const route = {
  method: 'POST',
  path: '/register',
  config: {
    tags: ['api'],
    auth: false,
    validate: {
      payload: Joi.object().keys({
        email: Joi.reach(User.rules, 'email'),
        password: Joi.reach(User.rules, 'password'),
        // make sure the confirmPassword is the same as password
        passwordConfirm: Joi.any().valid(Joi.ref('password')).required(),
      }),
    },
    handler: (request, reply) => co(function* gen() {
      const { email, password } = request.payload;
      const users = yield User.find({ email });
      if (users.length) {
        return reply(Boom.conflict('The Email is already registered.'));
      }
      const registeredUser = yield User.create({ email, password, role: 100 });
      request.cookieAuth.clear();
      request.cookieAuth.set(registeredUser);
      return reply(registeredUser);
    }).catch((err) => {
      handleInternalError(err);
      return reply(Boom.badImplementation());
    }),
  },
};

export default route;
