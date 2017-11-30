import { combineReducers } from 'redux';
import routesReducer from './routes_reducer';
import workoutsReducer from './workouts_reducer';

const entitiesReducer = combineReducers({
  routes: routesReducer,
  workouts: workoutsReducer
});

export default entitiesReducer;
