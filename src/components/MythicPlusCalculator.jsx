import React, { useState } from "react";
import "./MythicPlusCalculator.css";

const MythicPlusCalculator = () => {
  const [keyLevels, setKeyLevels] = useState(Array(16).fill(""));
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

  const handleInputChange = (index, value) => {
    if (value > 35) {
      setError("Key level should not be higher than 35.");
    } else {
      setError("");
    }
    const newKeyLevels = [...keyLevels];
    newKeyLevels[index] = value;
    setKeyLevels(newKeyLevels);
  };

  const renderInputPairs = () => {
    const pairs = [];

    for (let i = 0; i < 8; i++) {
      pairs.push(
        <div key={i} className="input-pair">
          <label htmlFor={`input-${i}`}>{dungeons[i]}</label>
          <input
            id={`input-${i}`}
            type="number"
            value={keyLevels[i]}
            onChange={(e) => handleInputChange(i, e.target.value)}
            className="small-input"
          />
          <input
            id={`input-${i + 8}`}
            type="number"
            value={keyLevels[i + 8]}
            onChange={(e) => handleInputChange(i + 8, e.target.value)}
            className="small-input"
          />
          <div className="sum-display">
            = {calculateMPS(keyLevels[i], keyLevels[i + 8])}
          </div>
        </div>
      );
    }

    return pairs;
  };

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
    for (let i = 0; i < 8; i++) {
      total += parseFloat(calculateMPS(keyLevels[i], keyLevels[i + 8]));
    }
    return total.toFixed(2);
  };

  return (
    <div className="mythic-plus-calculator">
      <h2>Mythic Plus Calculator</h2>
      <div className="calculator-grid">
        <div className="tcolumn-header">Tyrannical</div>
        <div className="fcolumn-header">Fortified</div>
      </div>
      {renderInputPairs()}
      {error && <p className="error-message">{error}</p>}
      <div>
        <h3>Approximate Mythic Plus Score: {calculateTotalMPS()}</h3>
      </div>
    </div>
  );
};

export default MythicPlusCalculator;
