
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo from '../images/logopokemon.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-pokemon-user">Create Pokemon User</Link>
        </li>
        <li>
          <Link to="/list-pokemon-users">List Pokemon Users</Link>
        </li>
        <li>
          <Link to="/add-pokemon">Add Pokemon</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
