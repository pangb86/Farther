import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import routesErrorsReducer from './routes_errors_reducer';
import workoutsErrorsReducer from './workouts_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  routes: routesErrorsReducer,
  workouts: workoutsErrorsReducer
});

export default errorsReducer;
