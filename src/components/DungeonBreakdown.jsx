import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DungeonBreakdown.css';
import teamMembers from '../teamMembers';

const DungeonBreakdown = () => {
    const [dungeonData, setDungeonData] = useState([]);
    const [alternateDungeonData, setAlternateDungeonData] = useState([]);

    const dungeonOrder = ['SBG', 'COS', 'TJS', 'HOV', 'AA', 'AV', 'RLP', 'NO'];

    useEffect(() => {
      const fetchDungeonData = async () => {
        const fetchedDungeonData = [];

      
        for (const defaultCharacter of teamMembers) {
          const mainResult = await axios(
            `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_best_runs%3Aall`
          );
          const altResult = await axios(
            `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_alternate_runs%3Aall`
          );  
          //Big Concat before sorting
          const combinedRuns = mainResult.data.mythic_plus_best_runs.concat(altResult.data.mythic_plus_alternate_runs);
          mainResult.data.mythic_plus_best_runs = combinedRuns;
          fetchedDungeonData.push(mainResult.data);
        }
        setDungeonData(fetchedDungeonData);
      };
      fetchDungeonData();
    }, []);

    function sortDungeons(dungeonRuns) {
      return dungeonRuns.sort((a, b) => {
        const aIndex = dungeonOrder.indexOf(dungeonAbbreviations[a.dungeon]);
        const bIndex = dungeonOrder.indexOf(dungeonAbbreviations[b.dungeon]);
        return aIndex - bIndex;
      });
    }

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
        <div className="dungeon-breakdown-container">
          <h2 className="dungeon-breakdown-title">Dungeon Breakdown</h2>
          <div className="dungeon-breakdown-grid">
            {dungeonData.map((data, index) => {
               const tyrannicalRuns = sortDungeons(filterDungeonsByType(data.mythic_plus_best_runs, 'Tyrannical'));
               const fortifiedRuns = sortDungeons(filterDungeonsByType(data.mythic_plus_best_runs, 'Fortified'));
      
              return (
                <div key={index} className="member-dungeons">
                  <div className="member-name">{data.name}</div>
                  <div className="run-types">
                    <div className="tyrannical-runs">
                      <h3>Tyrannical</h3>
                      <ul>
                        {tyrannicalRuns.map((run, i) => (
                          <div key={i} className="dungeon-info">
                            <span className="tdungeon-name">{dungeonAbbreviations[run.dungeon]}</span>
                            <span className="tdungeon-level">+{run.mythic_level}</span>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className="fortified-runs">
                      <h3>Fortified</h3>
                      <ul>
                        {fortifiedRuns.map((run, i) => (
                          <div key={i} className="dungeon-info">
                            <span className="fdungeon-name">{dungeonAbbreviations[run.dungeon]}</span>
                            <span className="fdungeon-level">+{run.mythic_level}</span>
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