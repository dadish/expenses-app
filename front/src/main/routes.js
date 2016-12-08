// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

// TODO handle loading errors when webpack v2 is stable

import { getAsyncInjectors } from 'utils/asyncInjectors';
// const errorLoading = (err) => {
//   console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
// };

const loadModule = cb => (componentModule) => {
  cb(null, componentModule);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        require.ensure([
          'containers/HomePage/reducer',
          'containers/HomePage/sagas',
          'containers/HomePage',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectReducer('home', require('containers/HomePage/reducer').default);
          injectSagas(require('containers/HomePage/sagas').default);
          renderRoute(require('containers/HomePage').default);
        });
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        require.ensure([
          'containers/NotFoundPage',
        ], (require) => {
          const renderRoute = loadModule(cb);
          renderRoute(require('containers/NotFoundPage').default);
        });
      },
    },
  ];
}
