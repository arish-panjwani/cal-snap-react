/** @format */

import { Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import "./TeamMemberCard.css";

const TeamMemberCard = ({ name, role, image }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      style={{ backgroundColor: colors.primary[400] }}
      className="team-member-card">
      <img src={image} alt={name} className="team-member-image" />
      <h3 className="team-member-name">{name}</h3>
      <Typography color={colors.primary[200]} variant="h5">
        {role}
      </Typography>
    </div>
  );
};

export default TeamMemberCard;
