module.exports = {
  coverage: true,
  threshold: 100, // coverage percentage
  transform: './node_modules/lab-babel',
  sourcemaps: true,
  rejections: true,
  timeout: 4000,
  globals: 'core,__core-js_shared__,System,asap,Observable,regeneratorRuntime,_babelPolyfill',
};
