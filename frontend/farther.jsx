import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

// test functions
import * as RouteApiUtil from './util/route_api_util';
import { requestRoutes, requestSingleRoute, createRoute, deleteRoute } from './actions/route_actions';

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
  window.requestRoutes = requestRoutes;
  window.requestSingleRoute = requestSingleRoute;
  window.createRoute = createRoute;
  window.deleteRoute = deleteRoute;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
