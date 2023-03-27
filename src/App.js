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
import MythicPlusCalculator from './components/MythicPlusCalculator';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dungeonData, setDungeonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useDocumentTitle('Dread Mythic Plus');

  //Fetching Dungeon Data per Member TODO COMBINE
useEffect(() => {
  const fetchteamMembers = async () => {
    const fetchedCharacters = [];
    const fetchedDungeonData = [];

    for (const defaultCharacter of teamMembers) {
      //Getting Team Members
      const result = await axios(
        `https://raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_scores_by_season%3Acurrent`
      );
      fetchedCharacters.push(result.data);
      //Best Dungeons Per Member
      const mainResult = await axios(
        `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_best_runs%3Aall`
      );
      //Alternate Best Dungeons Per Member
      const altResult = await axios(
        `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_alternate_runs%3Aall`
      );  
      //Big Concat before sorting
      const combinedRuns = mainResult.data.mythic_plus_best_runs.concat(altResult.data.mythic_plus_alternate_runs);
      mainResult.data.mythic_plus_best_runs = combinedRuns;

      //console.log("mainresult:",mainResult);

      const combinedData = {
        character: mainResult.data, // Add this line to store the character object
        mythic_plus_best_runs: mainResult.data.mythic_plus_best_runs,
        mythic_plus_alternate_runs: altResult.data.mythic_plus_alternate_runs, // Add this line to store the alternate runs
      };
      console.log("combinedData:",combinedData);

      fetchedDungeonData.push(combinedData);
    }

    setCharacters(fetchedCharacters);
    setDungeonData(fetchedDungeonData);
  };
  fetchteamMembers();

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
}, []);


const handleMemberClick = (name, realm) => {
  if (selectedMember && name === selectedMember.name && realm === selectedMember.realm) {
    setSelectedMember(null);
  } else {
    setSelectedMember({ name, realm });
  }
};

  const handleCharacterSearch = (newCharacter) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
  };

  const handleRemoveMember = (idToRemove) => {
    const prevCharacters = characters.filter((_, index) => index !== idToRemove);
    setCharacters(prevCharacters);
  };

  //render
  console.log('App.js dungeonData:', dungeonData);
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
    id={index}
    character={character}
    onMemberClick={() => handleMemberClick(character.name, character.realm)}
    onRemoveMember={handleRemoveMember}
  />
))}
              </div>
            
              {selectedMember && (
                <MemberDetails
                  dungeonData={dungeonData} 
                  character={selectedMember}
                />
              )}
            
            </div>
          </div>
  
          <div className="dungeon-bd">
            <DungeonBreakdown 
            dungeonData={dungeonData}/>
          </div>
          <main>
        <MythicPlusCalculator />
        {/* ...any other components or elements you have in the main content... */}
      </main>
        </>
      )}
    </div>
  );
}


export default App;
