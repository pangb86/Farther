import {
  RECEIVE_ROUTE_ERRORS,
  RECEIVE_ONE_ROUTE
} from '../actions/route_actions';

const routesErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_ROUTE_ERRORS:
      return action.errors;
    case RECEIVE_ONE_ROUTE:
      return [];
    default:
      return oldState;
  }
};

export default routesErrorsReducer;
