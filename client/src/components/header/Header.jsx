import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';
import logo from "../../pages/image/logo.png";
import { AuthContext } from '../../pages/context/Authcontext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" />
        <h1>EducateKid</h1>
      </div>
      <div className={`menu-icon ${showLinks ? 'open' : ''}`} onClick={() => setShowLinks(!showLinks)}>
        <div className="menu-icon-bar"></div>
        <div className="menu-icon-bar"></div>
        <div className="menu-icon-bar"></div>
      </div>
      <ul className={`navbar-links ${showLinks ? 'show' : ''}`}>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        {/* Conditional rendering for Scholarshiphistory link */}
        {isLoggedIn && (
          <li><NavLink to="/scholarship-history">Scholarship History</NavLink></li>
        )}
        <li>
          {isLoggedIn ? (
            <NavLink to="/profile">Profile</NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
        {isLoggedIn && <li><NavLink to="/" onClick={logout}>Logout</NavLink></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
