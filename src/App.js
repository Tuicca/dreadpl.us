import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Member from './components/Member';
import teamMembers from './teamMembers';
import MemberDetails from './components/MemberDetails';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchteamMembers = async () => {
      const fetchedCharacters = [];

      for (const defaultCharacter of teamMembers) {
        console.log(defaultCharacter.server);
        console.log(defaultCharacter.name);
        const result = await axios(
          `https://raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_scores_by_season%3Acurrent`
        );
        console.log("API Response: ",result);
        fetchedCharacters.push(result.data);
      }
      setCharacters(fetchedCharacters);
    };
  
    fetchteamMembers();
  }, []);

  const handleMemberClick = (character) => {
    setSelectedMember(character);
  };
  const handleCharacterSearch = (newCharacter) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
  };

  return (
    <div className="page-container">
    <div className="App">
      <Navbar onCharacterSearch={handleCharacterSearch} />
      <div className="content">
        <div className="members-container">
        {characters.map((character, index) => (
          <Member key={index} 
          character={character} 
          onMemberClick={handleMemberClick}/>
        ))}
        </div>
        {selectedMember && ( // Step 7
          <MemberDetails character={selectedMember} />
        )}
        <Home />
        {/* Your other components and content */}
      </div>
    </div>
    </div>
  );
}

export default App;
