import React, { Component, useState, useEffect } from 'react';
import './App.css';
import { request } from 'graphql-request';
import Card from 'react-bootstrap/Card';
import Tilt from 'react-parallax-tilt';
import Moment from 'react-moment';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
// import Parallax from 'react-rellax'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Moment from 'react-moment';


function PastEvents() {

    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async() => {
            const { events } = await request('https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master', 
            `{
            events(where: {date_lt: TODAY}) {
                date
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
            <div>
                {!events ? (
                    'Loading'
                ) : (
                    <Container fluid>
                    <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-1 align-items-center d-flex card-block">
                            {events.map((event, i) => (
                                <Col key={events.name}>
                                <Card border="dark" style={{"height" : '120%', width: '18rem'}} id="pasteventscard">
                                  <Card.Img variant="top" src={event.photo.url} />
                                  <Card.Body>
                                    <Card.Title>
                                    <p id="overrideabouttextcolor">{event.title}</p>
                                    </Card.Title>

                                    <Accordion id="eventaccordian">
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography id="overrideabouttextcolor">About this event</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography id="overrideabouttextcolor">
                                        {event.description}
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                  </Card.Body>
                                </Card>
                                <div id="divmesomespace"></div>
                                </Col>
                            ))}
                        </Row>
                        </Container>
                )}
            </div>
        );
    };

export default PastEvents;
