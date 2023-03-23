import React, { useState, useEffect } from 'react';

const DungeonBreakdown = () => {
    const [dungeonData, setDungeonData] = useState([]);
    useEffect(() => {
     const fetchDungeonData = async () => {
        const fetchedDungeonData = [];

         for (const defaultCharacter of teamMembers) {
            const result = await axios(
              `https:raider.io/api/v1/characters/profile?region=us&realm=${defaultCharacter.server}&name=${defaultCharacter.name}&fields=mythic_plus_best_runs%3Aall`
            );
            console.log("Dungeon Data: ", result);
            fetchedDungeonData.push(result.data);
        }
        setDungeonData(fetchedDungeonData);
      };
        fetchDungeonData();
      }, []);

}

export default DungeonBreakdown;