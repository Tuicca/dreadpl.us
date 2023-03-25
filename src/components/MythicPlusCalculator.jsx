import React, { useState } from 'react';

const MythicPlusCalculator = () => {
  const [keyLevel1, setKeyLevel1] = useState('');
  const [keyLevel2, setKeyLevel2] = useState('');
  const [underPercentage1, setUnderPercentage1] = useState('');
  const [underPercentage2, setUnderPercentage2] = useState('');
  const [result, setResult] = useState('');

  const calculateMythicPlusScore = () => {
    const bestKey = Math.max(keyLevel1, keyLevel2);
    const altKey = Math.min(keyLevel1, keyLevel2);
    const upBestKey = bestKey === keyLevel1 ? underPercentage1 : underPercentage2;
    const upAltKey = bestKey === keyLevel1 ? underPercentage2 : underPercentage1;

    const bestKeyScore = ((100 + (bestKey - 10) * 7) + 5 * Math.min((upBestKey / 0.4), 1)) * 1.5;
    const altKeyScore = ((100 + (altKey - 10) * 7) + 5 * Math.min((upAltKey / 0.4), 1)) * 0.5;

    setResult(bestKeyScore + altKeyScore);
  };

  return (
    <div>
      <h2>Mythic Plus Score Calculator</h2>
      <div>
        <label>Key Level 1: </label>
        <input
          type="number"
          value={keyLevel1}
          onChange={(e) => setKeyLevel1(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Key Level 2: </label>
        <input
          type="number"
          value={keyLevel2}
          onChange={(e) => setKeyLevel2(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Under Percentage 1: </label>
        <input
          type="number"
          step="0.01"
          value={underPercentage1}
          onChange={(e) => setUnderPercentage1(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Under Percentage 2: </label>
        <input
          type="number"
          step="0.01"
          value={underPercentage2}
          onChange={(e) => setUnderPercentage2(Number(e.target.value))}
        />
      </div>
      <button onClick={calculateMythicPlusScore}>Calculate</button>
      <div>
        <p>Mythic Plus Score: {result}</p>
      </div>
    </div>
  );
};

export default MythicPlusCalculator;
