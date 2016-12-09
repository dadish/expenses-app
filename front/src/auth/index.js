let store = null;

const setStore = (reduxStore) => {
  if (store !== null) throw Error('Auth Module: The store could be set only once in life!');
  store = reduxStore;
};

const loggedIn = () => Boolean(store.getState().getIn(['global', 'user', 'id']));

const getUser = () => store.getState().getIn(['global', 'user']);

const allowedPath = (requestedPath) => {
  const { role } = getUser().toJS();

  if (loggedIn()) {
    // the regular user can only access the /expenses page
    if (role === 100) {
      return '/expenses';

    // managers and admins can access /users and /expenses pages
    // that defaults to expenses
    } else if (['/users', '/expenses'].indexOf(requestedPath) !== -1) {
      return requestedPath;
    }
    return '/expenses';
  }

  // redirect to login if not logged in
  return '/login';
};

export default {
  setStore,
  loggedIn,
  getUser,
  allowedPath,
};
