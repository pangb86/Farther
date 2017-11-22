import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionAPIUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
  // test functions
  window.login = SessionAPIUtil.login;
  window.signup = SessionAPIUtil.signup;
  window.logout = SessionAPIUtil.logout;

  const root = document.getElementById('root');
  ReactDOM.render(<h1>Welcome to Farther</h1>, root);
});
