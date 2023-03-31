import React, { useState } from "react";
import "./MythicPlusCalculator.css";

const MythicPlusCalculator = ({keyLevels, setKeyLevels}) => {
  const [error, setError] = useState("");

  const dungeons = [
    "SBG",
    "COS",
    "TJS",
    "HOV",
    "AA",
    "AV",
    "NO",
    "RLP",
  ];

  const scoreColorMapping = {
    '3450.0': '#ff8000',
    '3290.0': '#f9753c',
    '3170.0': '#f26b5b',
    '3050.0': '#ea6078',
    '2930.0': '#df5693',
    '2810.0': '#d24cad',
    '2690.0': '#c242c8',
    '2570.0': '#ad38e3',
    '2430.0': '#9544eb',
    '2310.0': '#7c55e7',
    '2190.0': '#5e62e3',
    '2070.0': '#316cdf',
    '1905.0': '#2d79d4',
    '1785.0': '#4787c4',
    '1665.0': '#5496b5',
    '1545.0': '#5ca5a5',
    '0.0': 'white',
  };

  const getScoreColor = (score) => {
    const scoreRange = Object.keys(scoreColorMapping).find((range) => score > parseFloat(range));
    return scoreRange ? scoreColorMapping[scoreRange] : 'white';
  };

  const handleInputChange = (dungeon, index, value) => {
    if (value > 35) {
      setError("You wish");
      return;
    } else if( value < 0) {
      setError("Key level will never be lower than 0, no matter how bad you are");
      return;
    }else{
        setError("");
    }
    
    const newKeyLevels = { ...keyLevels };
    if (!newKeyLevels[dungeon]) {
      newKeyLevels[dungeon] = ['', ''];
    }
    newKeyLevels[dungeon][index] = value;
    setKeyLevels(newKeyLevels);
  };

  const renderInputPairs = () => {
    return dungeons.map((dungeon, i) => (
      <div key={i} className="input-pair">
        <label htmlFor={`input-${i}`}>{dungeon}</label>
        <input
          id={`input-${i}`}
          type="number"
          value={keyLevels[dungeon] ? keyLevels[dungeon][0] : ''}
          onChange={(e) => handleInputChange(dungeon, 0, e.target.value)}
          className="small-input"
        />
        <input
          id={`input-${i + 8}`}
          type="number"
          value={keyLevels[dungeon] ? keyLevels[dungeon][1] : ''}
          onChange={(e) => handleInputChange(dungeon, 1, e.target.value)}
          className="small-input"
        />
        <div className="sum-display">
          = {calculateMPS(keyLevels[dungeon] ? keyLevels[dungeon][0] : '', keyLevels[dungeon] ? keyLevels[dungeon][1] : '')}
        </div>
      </div>
    ));
  }

  const calculateMPS = (keyLevel1, keyLevel2) => {
    if (isNaN(keyLevel1) || isNaN(keyLevel2)) {
      return "";
    }
    if (isNaN(keyLevel1) || isNaN(keyLevel2)) {
      return "";
    }
  
    const UP = 5 * Math.min(0.05 / 0.4, 1);
    const higherKey = Math.max(keyLevel1, keyLevel2);
    const lowerKey = Math.min(keyLevel1, keyLevel2);
    const bestKey = ((100 + (higherKey - 10) * 7) + UP) * 1.5;
    const alternateKey = ((100 + (lowerKey - 10) * 7) + UP) * 0.5;
    return (bestKey + alternateKey).toFixed(2);
  };
  
  const calculateTotalMPS = () => {
    let total = 0;
    for (const dungeon in keyLevels) {
      total += parseFloat(calculateMPS(keyLevels[dungeon][0], keyLevels[dungeon][1]));
    }
    return isNaN(total.toFixed(2)) ? "Please Enter your Keys" : total.toFixed(2);
  };

  return (
    <div className="mythic-plus-calculator">
      <h2><u>Mythic Plus Calculator</u></h2>
      <div className="calculator-grid">
        <div className="tcolumn-header">Tyrannical</div>
        <div className="fcolumn-header">Fortified</div>
      </div>
      {renderInputPairs()}
      {error && <p className="error-message">{error}</p>}
      <div>
     
        <h3 style={{ color: 'white' }}>Approximate Mythic Plus Score:
        <span 
          style={{ color: isNaN(calculateTotalMPS()) ? '#ed5b45' : getScoreColor(calculateTotalMPS()) }}> {calculateTotalMPS()}</span></h3>
      </div>
    </div>
  );
};

export default MythicPlusCalculator;
