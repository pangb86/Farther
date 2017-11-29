// fetchWorkouts()
// fetchSingleWorkout(workoutId)
// createWorkout(workout)
// updateWorkout(workout)
// deleteWorkout(workoutId)

import * as WorkoutAPIUtil from '../util/workout_api_util';

export const RECEIVE_WORKOUTS = "RECEIVE_WORKOUTS";
export const RECEIVE_ONE_WORKOUT = "RECEIVE_ONE_WORKOUT";
export const REMOVE_WORKOUT = "REMOVE_WORKOUT";
export const RECEIVE_WORKOUT_ERRORS = "RECEIVE_WORKOUT_ERRORS";

export const receiveWorkouts = payload => ({
  type: RECEIVE_WORKOUTS,
  payload
});

export const receiveOneWorkout = payload => ({
  type: RECEIVE_ONE_WORKOUT,
  payload
});

export const receiveWorkoutErrors = errors => ({
  type: RECEIVE_WORKOUT_ERRORS,
  errors
});

export const removeWorkout = workoutId => ({
  type: REMOVE_WORKOUT,
  workoutId
});

export const requestWorkouts = () => dispatch => (
  WorkoutAPIUtil.fetchWorkouts()
  .then(payload => dispatch(receiveWorkouts(payload)))
);

export const requestSingleWorkout = workoutId => dispatch => (
  WorkoutAPIUtil.fetchSingleWorkout(workoutId)
  .then(payload => dispatch(receiveOneWorkout(payload)))
);

export const createWorkout = workout => dispatch => (
  WorkoutAPIUtil.createWorkout(workout)
  .then(payload => dispatch(receiveOneWorkout(payload)),
  error => dispatch(receiveWorkoutErrors(error.responseJSON)))
);

export const updateWorkout = workout => dispatch => (
  WorkoutAPIUtil.updateWorkout(workout)
  .then(payload => dispatch(receiveOneWorkout(payload)),
  error => dispatch(receiveWorkoutErrors(error.responseJSON)))
);

export const deleteWorkout = workoutId => dispatch => (
  WorkoutAPIUtil.deleteWorkout(workoutId)
  .then(payload => dispatch(removeWorkout(payload.workout.id)))
);
