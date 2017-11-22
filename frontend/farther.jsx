import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// test functions
import * as SessionAPIUtil from './util/session_api_util';
import { signup, login, logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  // test functions
  window.login = login;
  window.signup = signup;
  window.logout = logout;

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

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
