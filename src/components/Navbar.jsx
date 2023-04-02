import React, { useState } from 'react';
import { Link } from 'react-scroll';

import './Navbar.css';

const Navbar = (props) => {

  return (
    <nav className="navbar">
      <div className="nav-logo">Dread+</div>
      
      <div className="nav-banner-container">
        <div className="nav-banner">
          <h1>Dragonflight: Season 1</h1>
        </div>
      </div>
    
      <ul className="nav-links">
        <li className="nav-item-mpc">
          <Link
            activeClass="active"
            to="mythic-plus-calculator"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            >Mythic Plus Calculator
          </Link>
        </li>
        <li className="nav-item-about">
        <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            >About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
