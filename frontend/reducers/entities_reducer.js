import { combineReducers } from 'redux';
import routesReducer from './routes_reducer';

const entitiesReducer = combineReducers({
  routes: routesReducer
});

export default entitiesReducer;
