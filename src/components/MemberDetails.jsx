import React from 'react';
import './MemberDetails.css';
import teamMembers from '../teamMembers';

const MemberDetails = ({ character }) => {
  return (
    <div className="member-details">
      {/* Add the content you want to display in the dropdown */}
      <p>{character.name}'s details</p>
      <p>{character.mythic_plus_scores_by_season[0].scores.all}</p>
    </div>
  );
};

export default MemberDetails; 