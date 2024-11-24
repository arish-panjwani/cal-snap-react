import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./styles.css"; // Import custom styles
import Image from "../../assets/images/avatar.png";
// import 'bootstrap/dist/css/bootstrap.min.css';

function AboutPage() {
  const teamMembers = [
    {
        name: "Arish Panjwani",
        role: "Front End Lead, Project Lead",
        image: Image,
    },
    {
        name: "Anju Sunny Chungath",
        role: "Data Lead, Project Co-Lead",
        image: Image,
    },
    {
        name: "Adarsh Shriram Pednekar",
        role: "Backend Developer, Data Scientist",
        image: Image,
    },
    {
        name: "Ashish Lama",
        role: "Front End Developer, Data Scientist",
        image: Image,
    },
    {
        name: "Devanshi Adhikari",
        role: "Front End Developer",
        image: Image,
    },
    {
        name: "Indraja Badepalli",
        role: "Data Scientist, Documentation",
        image: Image,
    },
    {
        name: "Moksh Naresh Jaiswal",
        role: "Data Analyst, Data Science Member",
        image: Image,
    },
    {
        name: "Mueez Ur Rehman Amjad",
        role: "Data Scraping Team Lead, Data Science Team Member",
        image: Image,
    },
    {
        name: "Mukul Garg",
        role: "Backend Lead",
        image: Image,
    },
    {
        name: "Neha Tamang",
        role: "UI/UX Lead",
        image: Image,
    },
    {
        name: "Om Kiranbhai Patel",
        role: "Front End Developer, Data Scientist",
        image: Image,
    },
    {
        name: "Safna Mohammed Fayas",
        role: "Data Analyst",
        image: Image,
    },
    {
        name: "Shabda Kafle",
        role: "UI/UX",
        image: Image,
    },
    {
        name: "Siddhi Pravinbhai Patel",
        role: "Front End Developer, Data Analyst",
        image: Image,
    },
    {
        name: "Sri Datta Nadipolla",
        role: "Data Science Team Lead",
        image: Image,
    },
    {
        name: "Stephen David Chitilapalli Mathew",
        role: "DevOps Lead, Data Analyst",
        image: Image,
    },
    {
        name: "Thejaswee Badepalle",
        role: "Data Scientist, Documentation",
        image: Image,
    },
    {
        name: "Utsav Harshadbhai Khamar",
        role: "Data Analyst, Front End Developer",
        image: Image,
    },
];


  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div>
          <h1 style={{ color: "inherit" }}>About Our Team</h1>
          <p>
            Welcome to CalSnap! We aim to provide the best service possible.
          </p>
          <p>
            We are passionate about what we do and committed to excellence. Get to
            know the faces behind our success.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <h2>Meet Our Team</h2>
            <p>A little about the people who make things happen.</p>
          </Col>
        </Row>
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="team-card text-center">
                <Card.Img variant="top" src={member.image} className="card-img-top" />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;
