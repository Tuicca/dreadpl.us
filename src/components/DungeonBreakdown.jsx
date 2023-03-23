import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DungeonBreakdown.css';
import teamMembers from '../teamMembers';

const DungeonBreakdown = () => {
    const [dungeonData, setDungeonData] = useState([]);
    const [alternateDungeonData, setAlternateDungeonData] = useState([]);


    useEffect(() => {
      const fetchDungeonData = async () => {
        const fetchedDungeonData = [];
        const fetchedAlternateDungeonData = [];
      
        for (const defaultCharacter of teamMembers) {
          const mainResult = await axios(
            `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_best_runs%3Aall`
          );
          fetchedDungeonData.push(mainResult.data);
      
          const alternateResult = await axios(
            `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_alternate_runs%3Aall`
          );
          fetchedAlternateDungeonData.push(alternateResult.data);
        }
      
        setDungeonData(fetchedDungeonData);
        setAlternateDungeonData(fetchedAlternateDungeonData);
      };
      
    
      fetchDungeonData();
    }, []);

    
    function filterDungeonsByType(dungeonRuns, type) {
      return dungeonRuns.filter((run) =>
        run.affixes.some((affix) => affix.name === type)
      );
    }

      function formatTime(ms){
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor(ms % 60000 / 1000);
        return `${minutes}m ${seconds}s`;
      }

      const dungeonAbbreviations = {
        //Season 1 DF
        "Shadowmoon Burial Grounds": 'SBG',
        "Court of Stars": 'COS',
        "Temple of the Jade Serpent": 'TJS',
        "Halls of Valor":'HOV',
        "Ruby Life Pools":'RLP',
        "The Azure Vault":'AV',
        "The Nokhud Offensive":'NO',
        "Algeth\'ar Academy":'AA'
      };

      return (
        <div>
          <h2 className="dungeon-breakdown-title">Dungeon Breakdown</h2>
          <div className="dungeon-breakdown-grid">
            {dungeonData.map((data, index) => {
              const tyrannicalRuns = filterDungeonsByType(data.mythic_plus_best_runs, 'Tyrannical');
              const fortifiedRuns = filterDungeonsByType(data.mythic_plus_best_runs, 'Fortified');
      
              return (
                <div key={index} className="member-dungeons">
                  <div className="member-name">{data.name}</div>
                  <div className="run-types">
                    <div className="tyrannical-runs">
                      <h3>Tyrannical</h3>
                      <ul>
                        {tyrannicalRuns.map((run, i) => (
                          <div key={i} className="dungeon-info">
                            <span className="dungeon-name">{dungeonAbbreviations[run.dungeon]}</span>
                            <span className="dungeon-level">+{run.mythic_level}:</span>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className="fortified-runs">
                      <h3>Fortified</h3>
                      <ul>
                        {fortifiedRuns.map((run, i) => (
                          <div key={i} className="dungeon-info">
                            <span className="dungeon-name">{dungeonAbbreviations[run.dungeon]}</span>
                            <span className="dungeon-level">+{run.mythic_level}:</span>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
      
      
      


};

export default DungeonBreakdown;