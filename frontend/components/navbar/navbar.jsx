import React from 'react';
import { Link } from 'react-router-dom';

const sessionButtons = () => (
  <div className="nav-login-signup">
    <Link to="/signup">
      <button className="nav-signup">
        Sign Up
      </button>
    </Link>
    <Link to="/login">
      <button className="nav-login">
        Log In
      </button>
    </Link>
  </div>
);

const userGreeting = (currentUser, logout) => (
	<div className="nav-greeting">
    <h2 className="nav-username">{currentUser.username}</h2>
    <button className="nav-logout" onClick={logout}>Log Out</button>
	</div>
);

const Navbar = ({ currentUser, logout}) => (
  currentUser ? userGreeting(currentUser, logout) : sessionButtons()
);

export default Navbar;
