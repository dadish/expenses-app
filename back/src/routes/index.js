/* eslint-disable global-require */

export default [
  // hello world
  require('./hello').default,

  // authentication API
  require('./login/get.js').default,
  require('./login/post.js').default,
  require('./logout/get.js').default,
  require('./register/post.js').default,

  // users API
  require('./users/get.js').default,
  require('./users/post.js').default,
  require('./users/put.id.js').default,
  require('./users/delete.id.js').default,

  // expenses API
  require('./expenses/get.js').default,
  require('./expenses/post.js').default,
];
