import React from 'react';
import './TeamMemberCard.css';

const TeamMemberCard = ({ name, role, image }) => {
  return (
    <div className="team-member-card">
      <img src={image} alt={name} className="team-member-image" />
      <h3 className="team-member-name">{name}</h3>
      <p className="team-member-role">{role}</p>
    </div>
  );
};

export default TeamMemberCard;
