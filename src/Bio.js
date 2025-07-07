import React from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function Bio({ bios }) {
  const { slug } = useParams();

  const bio = bios.find((bio) => bio.slug === slug);

  if (!bio) {
    return <h2>Bio not found</h2>;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '20rem' }} id="aboutcard">
        <Card.Img
          variant="top"
          src={bio.photo.url || "https://us-east-1.graphassets.com/ANbsyxEKT0KZO3ZL8LdIfz/cmcshi8x3pb0h07ir94hk2rql"}
          style={{ width: "318px", height: "230px", objectFit: "cover", margin: "auto" }}
        />
        <Card.Body>
          <Card.Title>{bio.name}</Card.Title>
          <Card.Text>{bio.title}</Card.Text>
          <Card.Text>{bio.aboutme}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Bio;
