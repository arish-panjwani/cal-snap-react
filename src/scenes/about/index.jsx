import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./styles.css"; // Import custom styles
import Image from "../../assets/images/user-yellow-circle.png";
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      image: Image,
    },
    {
      name: "Jane Smith",
      role: "CTO",
      image: Image,
    },
    {
      name: "Mike Johnson",
      role: "COO",
      image: Image,
    },
    {
      name: "Alice Brown",
      role: "Marketing Director",
      image: Image,
    },
    {
      name: "David Wilson",
      role: "Lead Designer",
      image: Image,
    },
    {
      name: "Sarah Lee",
      role: "Product Manager",
      image: Image,
    },
    {
      name: "Chris Davis",
      role: "Software Engineer",
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
