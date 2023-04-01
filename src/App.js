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
import About from './components/About';
import AffixBanner from './components/AffixBanner';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dungeonData, setDungeonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyLevels, setKeyLevels] = useState(Array(16).fill(""));
  const [affixes, setAffixes] = useState([]);


  useDocumentTitle('Dread Mythic Plus');

  //Fetching Dungeon Data per Member TODO COMBINE
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const promises = teamMembers.map(async (defaultCharacter) => {
          const result = await axios(
            `https://raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_scores_by_season%3Acurrent%2Cmythic_plus_best_runs%3Aall%2Cmythic_plus_alternate_runs%3Aall`
          );
  
          const combinedData = {
            character: result.data,
            mythic_plus_best_runs: result.data.mythic_plus_best_runs,
            mythic_plus_alternate_runs: result.data.mythic_plus_alternate_runs,
          };
          console.log("COMBINED RUNS AFTER API: ", combinedData);
          return combinedData;
        });
  
        const results = await Promise.all(promises);
        // Process the results and update the state here
        setCharacters(results.map(result => result.character));
        setDungeonData(results);
  
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
  
    const fetchAffixes = async () => {
      try {
        const response = await axios.get('https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en');
        setAffixes(response.data.title);
        //console.log("AFFIX RESPONSE: ",response);
      } catch (error) {
        console.error("Error fetching affixes:", error);
      }
    };
  

    fetchTeamMembers();
    fetchAffixes();
    
  
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
    const prevDungeonData = dungeonData.filter((_, index) => index !== idToRemove);
  
    setCharacters(prevCharacters);
    setDungeonData(prevDungeonData);
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
            <Navbar />
            <div className="content">
              <div className="affix-container">
              <AffixBanner affixes={affixes} />
              </div>
              <div className="members-container">
              {characters.map((character, index) => (
              <Member
                key={`${character.name}-${character.realm}`}
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
          <main>
          <DungeonBreakdown dungeonData={dungeonData} setKeyLevels={setKeyLevels} />

          <MythicPlusCalculator keyLevels={keyLevels} setKeyLevels={setKeyLevels} />
          {console.log("APP CALCULATOR PROPERTIES: ", keyLevels)}
        

        
          </main>
      <div className="about">
        <About ></About>
      </div>
        </>
      )}
    </div>
  );
}


export default App;