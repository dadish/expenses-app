/* eslint-disable global-require */

export default [
  require('./hello').default,
  require('./login/get.js').default,
  require('./login/post.js').default,
  require('./logout/get.js').default,
  require('./register/post.js').default,
];
