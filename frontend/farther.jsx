import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// test functions
import * as WorkoutApiUtil from './util/workout_api_util';
import { requestWorkouts,
  requestSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout }
from './actions/workout_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // test functions
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.requestWorkouts = requestWorkouts;
  window.requestSingleWorkout = requestSingleWorkout;
  window.createWorkout = createWorkout;
  window.updateWorkout = updateWorkout;
  window.deleteWorkout = deleteWorkout;


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
