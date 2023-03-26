import React, { useEffect, useState } from 'react';
import './MemberDetails.css';

//Calculator Starts Here
const calculateMPS = (keyLevel1, keyLevel2) => {
  if (isNaN(keyLevel1) || isNaN(keyLevel2)) {
    return "";
  }
  if (isNaN(keyLevel1) || isNaN(keyLevel2)) {
    return "";
  }

  if(keyLevel1 === keyLevel2){
    console.log("key levels are the same now");
  }

  const UP = 5 * Math.min(0.05 / 0.4, 1);
  const higherKey = Math.max(keyLevel1, keyLevel2);
  const lowerKey = Math.min(keyLevel1, keyLevel2);

  const bestKey = ((100 + (higherKey - 10) * 7) + UP) * 1.5;
  console.log("Show me the Best Key", higherKey," ", bestKey);

  const alternateKey = ((100 + (lowerKey - 10) * 7) + UP) * 0.5;
  console.log("Show me the Alt Key", lowerKey," ",alternateKey);

  return (bestKey + alternateKey).toFixed(2);
};


//findLowest...
const findLowestAlternateHighestBest = (dungeonData, character) => {

  if (!character || !character.name || !character.realm) {
    console.log("findLowestAlternateHighBest character is null or missing required props");
    return null;
  }
  const characterData = dungeonData.find(data => data.character && data.character.name === character.name && data.character.realm === character.realm);

  if (!characterData) {
    return { lowestAlternate: null, highestBest: null, newScore: null };
  }

  const lowestAlternate = characterData.mythic_plus_alternate_runs.reduce((min, run) => run.score < min.score ? run : min);
  const highestBest = characterData.mythic_plus_best_runs.reduce((max, run) => run.score > max.score ? run : max);

  const newScore = calculateMPS(highestBest.level, lowestAlternate.level);
  console.log("Lowest Alternate: ", { lowestAlternate });
  console.log("Highest Best: ", { highestBest });
  console.log("newScore: ", { newScore })
  return { lowestAlternate, highestBest, newScore };
};



const findHighestKeyForDungeon = (dungeonData, character, dungeon) => {
  if (!character || !character.name || !character.realm) {
    console.log("findHighestKeyForDungeon character is null or missing required props");
    return null;
  }

  const characterData = dungeonData.find(
    (data) =>
      data.character &&
      data.character.name === character.name &&
      data.character.realm === character.realm
  );

  if (!characterData) {
    return null;
  }

  const highestBestSameDungeon = characterData.mythic_plus_best_runs.find(
    (run) => run.short_name === dungeon
  );

  return highestBestSameDungeon;
};


//MemberDetail component starts here!!
const MemberDetails = ({ dungeonData, character }) => {
  const { lowestAlternate, highestBest, newScore } = findLowestAlternateHighestBest(
    dungeonData,
    character
  );

  //lowestAlternate will always show lowest 1 of 16 keys
  //highestBest will always show highest 1 of 16 keys
  //lowestAlternateBestKey needs to be tracked once we've identified the lowestAlternateKey.

  const highestBestSameDungeon = findHighestKeyForDungeon(
    dungeonData,
    character,
    lowestAlternate.short_name
  );



  
  //Calculate Score Table Here
  const calculateScoreTable = (lowestAlternate, highestBestSameDungeon, highestBest) => {

    const tableRowSize = highestBest.mythic_level - lowestAlternate.mythic_level;
    const scoreTable = [];
    

    for (let i = 1; i <= tableRowSize; i++) {
      const newLowestAlternateLevel = lowestAlternate.mythic_level + i;
      const newScore = calculateMPS(highestBestSameDungeon.mythic_level, newLowestAlternateLevel);
      scoreTable.push({ increment: i, newLowestAlternateLevel, newScore });
    }

    return scoreTable;
  };

  

  const scoreTable = calculateScoreTable(lowestAlternate, highestBestSameDungeon, highestBest);
  // I need to add the total "Rating" value for both highestBest Key-of-same-dungeon and lowestAlternate Key-of-same-dungeon
  //const highestBest + alternateOfHighestBest
  //const lowestAlternate + highestBestOfLowestAlternate
  
  return (
    <div className="member-details">
      <h2>{character.name}</h2>
      {highestBest && (
        <p className="best-key">Best Key: {highestBest.short_name} +{highestBest.mythic_level} → {highestBest.score} points</p>
      )}

      {lowestAlternate && (
        <p className="lowest-key">Lowest Key: {lowestAlternate.short_name} +{lowestAlternate.mythic_level} → {lowestAlternate.score} points</p>
      )}
      
      {newScore && (
        <p>New Score (if Alternate Key was at the same level as the Best Key): {newScore}</p>
      )}

    {/* Score table rendering */}
    <div className="score-table">
      <h3>Score Table</h3>
      {scoreTable.map((row, index) => (
        <div key={index}>
          <span>+{row.increment}:</span>
          <span>
            {lowestAlternate.short_name} +{row.newLowestAlternateLevel} →
          </span>
          <span>{row.newScore} points</span>
        </div>
      ))}
    </div>
  </div>
);
};

export default MemberDetails;
