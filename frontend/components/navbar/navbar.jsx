import React from 'react';
import { Link } from 'react-router-dom';

const sessionButtons = () => (
  <div className="nav-login-signup">
      <Link to="/" className="nav-login-header">
        <h1>
          Farther
        </h1>
      </Link>
    <div className="nav-buttons">
      <Link className="nav-button-link" to="/signup">
        <button className="nav-signup">
          <span className="nav-signup-icon"></span>
          <div>
            SIGN UP
          </div>
        </button>
      </Link>
      <Link className="nav-button-link" to="/login">
        <button className="nav-login">
          <span className="nav-login-icon"></span>
          <div>
            LOG IN
          </div>
        </button>
      </Link>
    </div>
  </div>
);

const userGreeting = (currentUser, logout) => (
	<div className="nav-login-signup">
    <Link to="/" className="nav-login-header">
      <h1>
        Farther
      </h1>
    </Link>
    <div className="nav-buttons">
      <h2 className="nav-username">{currentUser.username}</h2>
      <button className="nav-logout-button" onClick={logout}>
        <span className="nav-logout-icon"></span>
        <div>
          LOG OUT
        </div>
      </button>
    </div>
	</div>
);

const Navbar = ({ currentUser, logout}) => (
  currentUser ? userGreeting(currentUser, logout) : sessionButtons()
);

export default Navbar;
