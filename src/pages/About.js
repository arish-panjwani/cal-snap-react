/** @format */


import './About.css';

/** @format */

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { colors } from "../res/colors"; 
import { strings } from "../res/strings"; 

const About = () => {
  const teamMembers = [
    { name: "Arish", role: "Team Lead" },
    { name: "Ashish", role: "Lead Developer" },
    { name: "Utsav", role: "Developer" },
    { name: "Om", role: "Developer" },
    { name: "Siddhi", role: "Developer" },
    { name: "Devanshi", role: "Developer" },
  ];

  return (
    <div className="container mt-4" style={{ background: colors.dark.background, padding: "20px", borderRadius: "8px" }}>
      <div className="text-center">
        <h1 style={{ color: colors.dark.textColor }}>{strings.aboutTitle}</h1>
        <p style={{ color: colors.dark.textColor }}>
          Welcome to CalSnap! We aim to provide the best service possible.
        </p>
      </div>
      <div className="mt-4">
        <h2 style={{ color: colors.dark.textColor }}>Our Team</h2>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header style={{ backgroundColor: colors.dark.button }}>
            Meet Our Team
          </Accordion.Header>
          <Accordion.Body style={{ backgroundColor: colors.dark.formBackground }}>
            <ul className="list-unstyled">
              {teamMembers.map((member, index) => (
                <li key={index} style={{ color: colors.dark.textColor, margin: "5px 0" }}>
                  <strong>{member.name}</strong>: {member.role}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default About;

