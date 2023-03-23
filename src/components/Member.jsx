import React from 'react';
import './Member.css';

import tankIcon from '../images/tank.png';
import healingIcon from '../images/healer.png';
import dpsIcon from '../images/damage.png';

const roleIconMapping = {
  TANK: tankIcon,
  HEALING: healingIcon,
  DPS: dpsIcon,
};

const getRoleIcon = (role) => {
  return roleIconMapping[role] || '';
};

const getScoreColor = (score) => {
  if (score > 3000) {
    return '#EF3131';
  } else if (score > 2900) {
    return '#EF6931';
  } else if (score > 2800) {
    return '#EF8531';
  } else if (score > 2700) {
    return '#ED5A74';
  } else if (score > 2600) {
    return '#DD3EEE';
  } else if (score > 2400) {
    return '#A06CD0';
  } else {
    return 'white';
  }
};

const Member = ({ character, onMemberClick }) => {
  const displayCharacter = character;
  const roleIcon = getRoleIcon(displayCharacter.active_spec_role);

  const score = displayCharacter.mythic_plus_scores_by_season[0].scores.all;

  const scoreStyle = {
    color: getScoreColor(score),
    fontWeight: 'bold',
  };

  return (
    <a href="#" className="member-link" onClick={() => onMemberClick(character)}>

    <div className="member">
      <img src={displayCharacter.thumbnail_url} alt={`${displayCharacter.name} thumbnail`} className="member-image" />
      <h3 className="member-name">{displayCharacter.name}</h3>
      <img src={roleIcon} alt={displayCharacter.active_spec_role} className="member-role-icon" />
      <p className="member-class-spec">
        {displayCharacter.class} 
      </p>
      <p className="member-spec"> {displayCharacter.active_spec_name}</p>
      <p className="member-score" style={scoreStyle}>{score}</p>
    </div>

    </a>
  );
};


export default Member;
