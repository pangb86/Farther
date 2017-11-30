import {
  RECEIVE_WORKOUT_ERRORS,
  RECEIVE_ONE_WORKOUT
} from '../actions/workout_actions';

const workoutsErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_WORKOUT_ERRORS:
      return action.errors;
    case RECEIVE_ONE_WORKOUT:
      return [];
    default:
      return oldState;
  }
};

export default workoutsErrorsReducer;
