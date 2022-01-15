import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { request } from 'graphql-request';
import PastEvents from './PastEvents';
import Card from 'react-bootstrap/Card';
import Tilt from 'react-parallax-tilt';
import Moment from 'react-moment';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Parallax from 'react-rellax'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Route } from "react-router-dom";
import { ExternalLink } from 'react-external-link';



function Events() {

    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async() => {
            const { events } = await request('https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master', 
            `{
            events(where: {date_gte: TODAY}) {
                date
                time
                description
                location
                photo {
                    url
                }
                rsvp
                title
                }
            }
            `
            );

    setEvents(events);
  };

  fetchEvents();

},[]);

        return (
            <div id="container">
                <h1>Upcoming Events</h1>
                {!events ? (
                    'Loading'
                ) : (
                        <Container fluid id="alignfeatured">
                        <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-1 align-items-center d-flex card-block">
                    
                            {events.map((event, i) => (
                                <Col key={event.name}>
                                <Card border="dark" id="upcomingeventscard">
                                  <Card.Img variant="top" src={event.photo.url} id="upcomingeventsphoto"/>
                                  <Card.Body id="center">
                                    <Card.Title>
                                      <p id="overrideabouttextcolor">{event.title}</p>
                                    </Card.Title>
                                    <Card.Text>
                                    <p id="overrideabouttextcolor"><span><Moment format="MMM DD, YYYY">{event.date}</Moment></span> | <span>{event.time}</span> | <span>{event.location}</span></p>
                                    <ExternalLink href={event.rsvp}><Button id="button">RSVP</Button></ExternalLink>
                                    <p id="eventdescription">{event.description}</p>
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                                <div id="divmesomespace"></div>
                                </Col>
                            ))}
                        </Row>
                        </Container>
                )}
                <h1>Past Events</h1>
                <PastEvents />
            </div>
        );
    };

export default Events;
