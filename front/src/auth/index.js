let store = null;

const setStore = (reduxStore) => {
  if (store !== null) throw Error('Auth Module: The store could be set only once in life!');
  store = reduxStore;
};

const loggedIn = () => Boolean(store.getState().getIn(['global', 'user', 'id']));

export default {
  setStore,
  loggedIn,
};
