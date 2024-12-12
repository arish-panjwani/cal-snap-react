/** @format */

import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Header } from "../../components";
import { tokens } from "../../theme";
import "./styles.css";
import TeamMemberCard from "./TeamMemberCard";

const AboutUs = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const teamMembers = [
    {
      name: "Arish Panjwani",
      role: "Front End Lead, Project Lead",
      image: "Arish.jpeg",
    },
    {
      name: "Anju Sunny Chungath",
      role: "Data Lead, Project Co-Lead",
      image: "Anju.jpg",
    },
    {
      name: "Mueez Ur Rehman Amjad",
      role: "Data Scraping Team Lead, Data Science Team Member",
      image: "Mueez.jpeg",
    },
    {
      name: "Ashish Lama",
      role: "Full Stack Developer, Data Scientist",
      image: "Ashish.jpg",
    },
    {
      name: "Om Kiranbhai Patel",
      role: "Front End Developer, Data Scientist",
      image: "Om.jpg",
    },
    {
      name: "Siddhi Pravinbhai Patel",
      role: "Front End Developer, Data Analyst",
      image: "Sidhi.jpeg",
    },
    {
      name: "Devanshi Adhikari",
      role: "Front End Developer",
      image: "Devanshi.jpg",
    },
    { name: "Neha Tamang", role: "UI/UX Lead", image: "Neha.jpg" },
    { name: "Shabda Kafle", role: "UI/UX Developer", image: "Shabda.jpeg" },
    {
      name: "Utsav Harshadbhai Khamar",
      role: "Data Analyst, Front End Developer",
      image: "Utsav.jpeg",
    },
    {
      name: "Moksh Naresh Jaiswal",
      role: "Data Analyst, Data Science Member",
      image: "Moksh.jpg",
    },
    {
      name: "Stephen David Chitilapalli Mathew",
      role: "DevOps Lead, Data Analyst",
      image: "Steve.JPG",
    },
    { name: "Mukul Garg", role: "Backend Lead", image: "Mukul.jpg" },
    {
      name: "Adarsh Shriram Pednekar",
      role: "Backend Developer, Data Scientist",
      image: "Adarsh.JPG",
    },
    { name: "Safna Mohammed Fayas", role: "Data Analyst", image: "Safna.jpg" },
    {
      name: "Sri Datta Nadipolla",
      role: "Data Science Team Lead",
      image: "Male.png",
    },
    {
      name: "Thejaswee Badepalli",
      role: "Data Scientist, Documentation",
      image: "Female.png",
    },
    {
      name: "Indraja Badepalli",
      role: "Data Scientist, Documentation",
      image: "Female.png",
    },
  ];

  const mentors = [
    {
      name: "Mr Soumo Mukherjee",
      role: "Mentor",
      image: "Male.png",
    },
    {
      name: "Mr Bhavik Gandhi",
      role: "Mentor",
      image: "Male.png",
    },
  ];

  return (
    <div className="about-us">
      <div className="product-description">
        <h1>About CalSnap</h1>
        <Typography color={colors.primary[200]} variant="h5">
          {}
        </Typography>
      </div>
      <div className="mentors" style={{ margin: "20px 0" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Header title="Our Mentors" />
        </Box>
        <div className="team-grid">
          {mentors.map((mentor) => (
            <TeamMemberCard
              key={mentor.name}
              name={mentor.name}
              role={mentor.role}
              image={mentor.image}
            />
          ))}
        </div>
      </div>
      <div className="team-members">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Header title="Meet Our Team" />
        </Box>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
