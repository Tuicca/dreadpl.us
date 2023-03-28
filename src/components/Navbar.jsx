import React, { useState } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import './Navbar.css';

const Navbar = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('Frostmane');
  

/*
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const onCharacterSearch = async (query) => {
    //const result = await axios(`https://raider.io/api/v1/characters/profile?region=us&realm=${searchCategory}&name=${searchText}`);
    //props.onCharacterSearch(result.data);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Search Text:', searchText);
    console.log('Search Category:', searchCategory);

    props.onCharacterSearch(searchCategory, searchText);
  };
*/

  return (
    <nav className="navbar">
      <div className="nav-logo">Dread+</div>
      
      <div className="nav-banner-container">
        <div className="nav-banner">
          <h1>DF Season 1 Roster</h1>
        </div>
      </div>
     

      {}
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
            >About Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
