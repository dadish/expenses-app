/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => state => state.get('global');

const selectRoute = () => state => state.get('route');

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route
    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectNextLocationPathname = () => createSelector(
  selectRoute(),
  route => route.getIn(['locationBeforeTransition', 'state', 'pathname']),
);

export {
  selectGlobal,
  selectLocationState,
  selectNextLocationPathname,
};
