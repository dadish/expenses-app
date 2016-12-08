import co from 'co';
import cookie from './cookie';

const setupAuth = server => co(function* gen() {
  yield cookie(server); // add the cookie strategy
  // ...add additional strategies here
}).catch((err) => {
  if (err) throw err;
});

export default setupAuth;
