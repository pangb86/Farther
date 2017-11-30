import {
  RECEIVE_ROUTES,
  RECEIVE_ONE_ROUTE,
  REMOVE_ROUTE
} from '../actions/route_actions';
import {
  RECEIVE_WORKOUTS,
  RECEIVE_ONE_WORKOUT
} from '../actions/workout_actions';

import merge from 'lodash/merge';

const routesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_ROUTES:
      newState = merge({}, action.routes);
      return newState;
    case RECEIVE_WORKOUTS:
      // Clear route state with routes associated with workouts
      // Will this work?
      // newState = merge({}, action.payload.routes);

      // merge with existing routes
      newState = merge({}, oldState);
      newState = merge(newState, action.payload.routes);
      return newState;
    case RECEIVE_ONE_ROUTE:
      newState = merge({}, oldState);
      newState[action.route.id] = action.route;
      return newState;
    case RECEIVE_ONE_WORKOUT:
      newState = merge({}, oldState);
      newState[action.payload.route.id] = action.payload.route;
      return newState;
    case REMOVE_ROUTE:
      newState = merge({}, oldState);
      delete newState[action.routeId];
      return newState;
    default:
      return oldState;
  }
};

export default routesReducer;
