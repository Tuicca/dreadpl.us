import React, { useState } from 'react';
import { Link } from 'react-scroll';
import axios from 'axios';
import './Navbar.css';

const Navbar = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState('Frostmane');
  const dungeons = ["SBG","COS","TJS","HOV","AA","AV","NO","RLP"];

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
      
      <div className="nav-banner">
        <h1>DF Season 1 Roster</h1>
        </div>

      {/*I may want to put this back in later. But Right now it's useless for this use case*/}
      {/*<div className="search-elements-wrapper">
        <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="searchCategory" className="search-label">Realm:</label>
          <select value={searchCategory} onChange={handleCategoryChange} className="search-select">
            <option value="Ner'zhul">Ner'zhul</option>
            <option value="Frostmane">Frostmane</option>
            <option value="Cairne">Cairne</option>
            <option value="Cenarius">Cenarius</option>
            <option value="Perenolde">Perenolde</option>
            <option value="Tortheldrin">Tortheldrin</option>
            <option value="Tichondrius">Tichondrius</option>
            <option value="Mal'ganis">Mal'ganis</option>
            <option value="Illidan">Illidan</option>
          </select>
          <input 
            type="text" 
            value={searchText} 
            onChange={handleSearchChange} 
            className="search-input"
            placeholder="Character Name" />
          <button type="submit" className="search-btn">Search Character</button>
          </form>
      </div>*/}

      {/*Links Start Here*/}
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
            to=""
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
