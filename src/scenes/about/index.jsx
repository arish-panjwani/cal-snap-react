import React from 'react';
import './styles.css';
import TeamMemberCard from './TeamMemberCard';

const AboutUs = () => {
  const teamMembers = [
    { "name": "Arish Panjwani", "role": "Front End Lead, Project Lead", "image": "Arish.jpeg" },
    { "name": "Anju Sunny Chungath", "role": "Data Lead, Project Co-Lead", "image": "Anju.jpg" },
    { "name": "Mueez Ur Rehman Amjad", "role": "Data Scraping Team Lead, Data Science Team Member", "image": "Mueez.jpeg" },
    { "name": "Ashish Lama", "role": "Front End Developer, Data Scientist", "image": "Ashish.jpeg" },
    { "name": "Om Kiranbhai Patel", "role": "Front End Developer, Data Scientist", "image": "Om.jpg" },
    { "name": "Siddhi Pravinbhai Patel", "role": "Front End Developer, Data Analyst", "image": "Sidhi.jpeg" },
    { "name": "Devanshi Adhikari", "role": "Front End Developer", "image": "Devanshi.jpg" },
    { "name": "Neha Tamang", "role": "UI/UX Lead", "image": "Neha.jpg" },
    { "name": "Shabda Kafle", "role": "UI/UX", "image": "Shabda.jpeg" },
    { "name": "Utsav Harshadbhai Khamar", "role": "Data Analyst, Front End Developer", "image": "Utsav.jpeg" },
    { "name": "Moksh Naresh Jaiswal", "role": "Data Analyst, Data Science Member", "image": "Moksh.jpg" },
    { "name": "Stephen David Chitilapalli Mathew", "role": "DevOps Lead, Data Analyst", "image": "Steve.JPG" },
    { "name": "Mukul Garg", "role": "Backend Lead", "image": "Mukul.jpg" },
    { "name": "Adarsh Shriram Pednekar", "role": "Backend Developer, Data Scientist", "image": "Adarsh.JPG" },
    { "name": "Safna Mohammed Fayas", "role": "Data Analyst", "image": "Safna.jpg" },
    { "name": "Sri Datta Nadipolla", "role": "Data Science Team Lead", "image": "Male.png" },
    { "name": "Thejaswee Badepalle", "role": "Data Scientist, Documentation", "image": "Female.png" },
    { "name": "Inderaja ", "role": "Data Scientist, Documentation", "image": "Female.png" },

  ];

  return (
    <div className="about-us">
      <div className="product-description">
        <h1>About CalSnap</h1>
        <p>
        CalSnap empowers users to achieve their wellness goals with personalized insights and easy-to-use tools for tracking diet, 
        physical activity, and health data. Combining advanced machine learning with an intuitive interface, 
        it simplifies health management for a balanced, healthier lifestyle.
        </p>
      </div>
      <div className="team-members">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
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
