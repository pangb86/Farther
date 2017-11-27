// fetchRoutes()
// fetchSingleRoute(routeId)
// createRoute(route)
// deleteRoute(routeId)

import * as RouteAPIUtil from '../util/route_api_util';

export const RECEIVE_ROUTES = "RECEIVE_ROUTES";
export const RECEIVE_ONE_ROUTE = "RECEIVE_ONE_ROUTE";
export const REMOVE_ROUTE = "REMOVE_ROUTE";
export const RECEIVE_ROUTE_ERRORS = "RECEIVE_ROUTE_ERRORS";

export const receiveRoutes = routes => ({
  type: RECEIVE_ROUTES,
  routes
});

export const receiveOneRoute = route => ({
  type: RECEIVE_ONE_ROUTE,
  route
});

export const removeRoute = routeId => ({
  type: REMOVE_ROUTE,
  routeId
});

export const receiveRouteErrors = errors => ({
  type: RECEIVE_ROUTE_ERRORS,
  errors
});

export const requestRoutes = () => dispatch => (
  RouteAPIUtil.fetchRoutes()
  .then(routes => dispatch(receiveRoutes(routes)))
);

export const requestSingleRoute = routeId => dispatch => (
  RouteAPIUtil.fetchSingleRoute(routeId)
  .then(route => dispatch(receiveOneRoute(route)))
);

export const createRoute = route => dispatch => (
  RouteAPIUtil.createRoute(route)
  .then(newRoute => dispatch(receiveOneRoute(newRoute)),
  error => dispatch(receiveRouteErrors(error.responseJSON)))
);

export const deleteRoute = routeId => dispatch => (
  RouteAPIUtil.deleteRoute(routeId)
  .then(removedRoute => dispatch(removeRoute(removedRoute.id)))
);
