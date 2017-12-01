import {
  RECEIVE_WORKOUTS,
  RECEIVE_ONE_WORKOUT,
  REMOVE_WORKOUT
} from '../actions/workout_actions';
import { REMOVE_ROUTE } from '../actions/route_actions';
import merge from 'lodash/merge';

const workoutsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState;

  switch (action.type) {
    case RECEIVE_WORKOUTS:
      newState = merge({}, action.payload.workouts);
      return newState;
    case RECEIVE_ONE_WORKOUT:
      newState = merge({}, oldState);
      newState[action.payload.workout.id] = action.payload.workout;
      return newState;
    case REMOVE_WORKOUT:
      newState = merge({}, oldState);
      delete newState[action.workoutId];
      return newState;
    default:
      return oldState;
  }
};

export default workoutsReducer;
