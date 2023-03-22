import React from 'react';
import './Member.css';

import tankIcon from '../images/tank.png';
import healingIcon from '../images/healer.png';
import dpsIcon from '../images/damage.png';

/*
const defaultcharacter = {
  thumbnail_url: 'https://render.worldofwarcraft.com/us/character/malganis/130/235234178-avatar.jpg?alt=wow/static/images/2d/avatar/10-0.jpg',
  name:'Eremes',
  class:'Demon Hunter',
  spec: 'Havoc',
  score:'2500',
};
*/

const roleIconMapping = {
  TANK: tankIcon,
  HEALING: healingIcon,
  DPS: dpsIcon,
};

const getRoleIcon = (role) => {
  return roleIconMapping[role] || '';
};

const Member = ({ character }) => {
  const displayCharacter = character;
  const roleIcon = getRoleIcon(displayCharacter.active_spec_role);

  return (
    <a href="#" className="member-link">
    <div className="member">
      <img src={displayCharacter.thumbnail_url} alt={`${displayCharacter.name} thumbnail`} className="member-image" />
      <h3 className="member-name">{displayCharacter.name}</h3>
      <img src={roleIcon} alt={displayCharacter.active_spec_role} className="member-role-icon" />
      <p className="member-class-spec">
        {displayCharacter.class} 
      </p>
      <p className="member-spec"> {displayCharacter.active_spec_name}</p>
      <p className="member-score">{displayCharacter.mythic_plus_scores_by_season[0].scores.all}</p>
    </div>
    </a>
  );
};


export default Member;
