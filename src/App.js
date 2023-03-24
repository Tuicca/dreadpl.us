import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loadingScreen.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Member from './components/Member';
import teamMembers from './teamMembers';
import MemberDetails from './components/MemberDetails';
import useDocumentTitle from './useDocumentTitle';
import DungeonBreakdown from './components/DungeonBreakdown';


function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useDocumentTitle('Dread Mythic Plus');

  useEffect(() => {
    const fetchteamMembers = async () => {
      const fetchedCharacters = [];

      for (const defaultCharacter of teamMembers) {
        const result = await axios(
          `https://raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_scores_by_season%3Acurrent`
        );
        console.log("API Response: ",result);
        fetchedCharacters.push(result.data);
      }
      setCharacters(fetchedCharacters);
    };
    fetchteamMembers();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleMemberClick = (character) => {
    if(selectedMember && character.id === selectedMember.id){
      setSelectedMember(null);
    } else {
      setSelectedMember(character);
    }
  };

  const handleCharacterSearch = (newCharacter) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
  };

  return (
    <div className="page-container">
      {isLoading ? (
        <div className="loading-screen">
        <div className="lds-ring-container">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      ) : (
        <>
          <div className="App">
            <Navbar onCharacterSearch={handleCharacterSearch} />
            <div className="content">
              <div className="members-container">
                {characters.map((character, index) => (
                  <Member
                    key={index}
                    character={character}
                    onMemberClick={handleMemberClick}
                  />
                ))}
              </div>
              {selectedMember && (
                <MemberDetails character={selectedMember} />
              )}
              <Home />
              {/* Your other components and content */}
            </div>
          </div>
  
          <div className="dungeon-bd">
            <DungeonBreakdown />
          </div>
        </>
      )}
    </div>
  );
}


export default App;
