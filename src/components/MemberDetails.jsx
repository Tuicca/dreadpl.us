import React from 'react';
import './MemberDetails.css';

const MemberDetails = ({ character }) => {
  return (
    <div className="member-details">
      {/* Add the content you want to display in the dropdown */}
      <p>{character.name}'s details</p>
    </div>
  );
};

export default MemberDetails;