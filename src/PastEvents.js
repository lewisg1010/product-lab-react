import React, { useState, useEffect } from 'react';
import './App.css';
import { request } from 'graphql-request';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from 'react-reveal/Slide';


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
                    ''
                ) : (
                    <Container fluid>
                    <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-1 align-items-center d-flex card-block">
                            {events.map((event, i) => (

                                <Slide bottom cascade>
                                <Col key={events.name}>
                                <Card style={{"height" : '120%', width: '18rem'}} id="pasteventscard">
                                  <Card.Img variant="top" src={event.photo.url} />
                                  <Card.Body>
                                    <Card.Title>
                                    <p>{event.title}</p>
                                    </Card.Title>
                                    </Card.Body>

                                    <Accordion id="eventaccordian">
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon id="expandmoreicon" />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography id="overridefont">About this event</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography id="overridefont">
                                        {event.description}
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Card>
                                <div id="divmesomespace"></div>
                                </Col>
                                </Slide>
                            ))}
                        </Row>
                        </Container>
                )}
            </div>
        );
    };

export default PastEvents;
