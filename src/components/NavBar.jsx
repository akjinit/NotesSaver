import React from 'react';
import { NavLink } from 'react-router';
import './NavBar.css'
const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-item" activeClassName="active">
        Home
      </NavLink>

      <NavLink to="/pastes" className="nav-item" activeClassName="active">
        Pastes
      </NavLink>
    </nav>
  );
};

export default NavBar;
