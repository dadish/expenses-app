// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

// TODO handle loading errors when webpack v2 is stable

import { getAsyncInjectors } from 'utils/asyncInjectors';
import auth from 'auth';

export const redirectToLogin = (nextState, replace) => {
  const nextPathname = nextState.location.pathname;
  const nextAllowedPath = auth.allowedPath(nextPathname);
  if (nextAllowedPath === nextPathname) return;
  replace({
    pathname: nextAllowedPath,
    state: { nextPathname },
  });
};

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
      onEnter: redirectToLogin,
      getComponent(nextState, cb) {
        require.ensure([
          'containers/HomePage/reducer',
          'containers/HomePage',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectReducer('home', require('containers/HomePage/reducer').default);
          renderRoute(require('containers/HomePage').default);
        });
      },
    }, {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        require.ensure([
          'containers/LoginPage/sagas',
          'containers/LoginPage',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectSagas(require('containers/LoginPage/sagas').default);
          renderRoute(require('containers/LoginPage').default);
        });
      },
    }, {
      path: '/register',
      name: 'register',
      getComponent(nextState, cb) {
        require.ensure([
          'containers/RegisterPage/sagas',
          'containers/RegisterPage',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectSagas(require('containers/RegisterPage/sagas').default);
          renderRoute(require('containers/RegisterPage').default);
        });
      },
    }, {
      path: '/users',
      name: 'users',
      onEnter: redirectToLogin,
      getComponent(nextState, cb) {
        require.ensure([
          'containers/Users/reducer',
          'containers/Users/sagas',
          'containers/Users',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectReducer('users', require('containers/Users/reducer').default);
          injectSagas(require('containers/Users/sagas').default);
          renderRoute(require('containers/Users').default);
        });
      },
    }, {
      path: '/expenses',
      name: 'expenses',
      onEnter: redirectToLogin,
      getComponent(nextState, cb) {
        require.ensure([
          'containers/Expenses/reducer',
          'containers/Expenses/sagas',
          'containers/Expenses',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectReducer('expenses', require('containers/Expenses/reducer').default);
          injectSagas(require('containers/Expenses/sagas').default);
          renderRoute(require('containers/Expenses').default);
        });
      },
    }, {
      path: '/reports',
      name: 'reports',
      getComponent(nextState, cb) {
        require.ensure([
          'containers/Reports/reducer',
          'containers/Reports/sagas',
          'containers/Reports',
        ], (require) => {
          const renderRoute = loadModule(cb);
          injectReducer('reports', require('containers/Reports/reducer').default);
          injectSagas(require('containers/Reports/sagas').default);
          renderRoute(require('containers/Reports').default);
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
