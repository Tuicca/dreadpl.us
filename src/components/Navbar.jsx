import React, { useState } from 'react';
import { Link } from 'react-scroll';

import './Navbar.css';

const Navbar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Dread+</div>
      
      <div className="nav-banner-container">
        <div className="nav-banner">
          <h1>Dragonflight: Season 2</h1>
        </div>
      </div>
      
    
      <ul className="nav-links">
      <li className="nav-item-dropdown">
          <button onClick={toggleDropdown} className="nav-dropdown-button">
            Useful Links
          </button>
          {dropdownOpen && (
            <ul className="nav-dropdown">
                <li>
                <a href="https://keystone-calculator.com" target="_blank" rel="noreferrer">
                  Keystone Calculator
                </a>
              </li>
              <li>
                <a href="https://raider.io/" target="_blank" rel="noreferrer">
                  RaiderIO
                </a>
              </li>
              <li>
                <a href="https://www.warcraftlogs.com/" target="_blank" rel="noreferrer">
                  Warcraft Logs
                </a>
              </li>
              <li>
                <a href="https://www.raidbots.com/simbot" target="_blank" rel="noreferrer">
                  RAIDBOTS Simming
                </a>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item-mpc">
          <a href="https://keystone-calculator.com" target="_blank" rel="noreferrer">
            Mythic Plus Calculator
          </a>
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
