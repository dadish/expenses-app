import Cookie from 'hapi-auth-cookie';
import co from 'co';
import { registerScheme } from './utils';

const setupCookieStrategy = (server) => {
  server.auth.strategy('base', 'cookie', true, {
    password: 'zhg236tadgk@#GDjkq2}kawyd324w@$EW3pJSDGF2jsbcznow', // cookie secret
    cookie: 'expenses-sid', // the cookie name
    ttl: 6 * 60 * 60 * 1000, // Set session to 1 day
    keepAlive: true,
    isSecure: false,
  });
  return Promise.resolve();
};

const setupCookie = server => co(function* gen() {
  yield registerScheme(server, Cookie);
  yield setupCookieStrategy(server);
});

export default setupCookie;
