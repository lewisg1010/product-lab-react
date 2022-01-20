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
import Roll from 'react-reveal/Roll';
import Slide from 'react-reveal/Slide';



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
                <Roll top>
                <h1 className="center bold" id="gradienttext">Upcoming Events</h1>
                </Roll>
                <div id="divmesomespacesmall" />
                {!events ? (
                    ''
                ) : (
                        <Container fluid>
                        <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-1 align-items-center d-flex card-block">

                            {events.map((event, i) => (
                                
                                <Slide bottom cascade>
                                <Col key={event.name}>
                                <Card id="upcomingeventscard">
                                  <Card.Img variant="top" src={event.photo.url} id="upcomingeventsphoto"/>
                                  <Card.Body id="center">
                                    <Card.Title>
                                      <p class="bold">{event.title}</p>
                                    </Card.Title>
                                    <Card.Text>
                                    <p><span><Moment format="MMM DD, YYYY">{event.date}</Moment></span> | <span>{event.time}</span> | <span>{event.location}</span></p>
                                    <ExternalLink href={event.rsvp}><Button id="button">RSVP</Button></ExternalLink>
                                    <p id="eventdescription">{event.description}</p>
                                    </Card.Text>
                                  </Card.Body>
                                </Card>
                                <div id="divmesomespace"></div>
                                </Col>
                                </Slide>
                            ))}
                         
                        </Row>
                        </Container>
                )}
                <h1 className="center bold bigger" id="pasteventfade">Past Events</h1>
                <div id="divmesomespacesmall" />
                <PastEvents />
            </div>
        );
    };

export default Events;
