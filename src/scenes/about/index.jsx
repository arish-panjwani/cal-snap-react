import React, { useState } from "react";
import './styles.css';  // Import your CSS file
import { Box, Typography, useMediaQuery, useTheme, Button, TextField } from "@mui/material";
import { Header } from "../../components";
import { tokens } from "../../theme";

const AboutUs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const teamMembers = [
    { name: "Arish", role: "Team Lead" },
    { name: "Ashish", role: "Lead Developer" },
    { name: "Utsav", role: "Developer" },
    { name: "Om", role: "Developer" },
    { name: "Siddhi", role: "Developer" },
    { name: "Devanshi", role: "Developer" },
  ];

  return (
    <Box m="20px">
      <Header title="ABOUT US"/>
      <div className="container mt-4" style={{ padding: "20px", borderRadius: "8px" }}>
      <div className="text-center">
        <p>
          Welcome to CalSnap! We aim to provide the best service possible.
        </p>
      </div>
      <div className="mt-4">
        <h2>Our Team</h2>
      </div>
      
    </div>
    </Box>
  );
};

export default AboutUs;
