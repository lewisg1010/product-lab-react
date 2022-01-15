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



function Faqs() {

    const [faqs, setFaqs] = useState(null);

    useEffect(() => {
        const fetchFaqs = async() => {
            const { faqs } = await request('https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master', 
            `{
                faqs {
                    question
                    answer
                  }
                }
            `
            );

    setFaqs(faqs);
  };

  fetchFaqs();

},[]);

        return (
            <div id="container">
                <h1 class="center">Frequently asked questions</h1>
                <div id="divmesomespacesmall" />
                {!faqs ? (
                    'Loading'
                ) : (
                        <Container fluid id="alignfeatured">
                        <Row xs={1} sm={1} md={1} lg={1} xl={1} className="g-1 align-items-center d-flex card-block">
                    
                            {faqs.map((faq, i) => (
                                
                                <Col key={faq.question}>
                                <Card style={{"height" : '120%', width: '75vw'}} id="faqcard">
                                  <Card.Body>
                                    <Card.Title>
                                        <a>{faq.question}</a>
                                    </Card.Title>
                                    <Card.Text>
                                  {faq.answer}
                                  </Card.Text>
                                  </Card.Body>
                                  
                                </Card>
                                <div id="divmesomespacesmall"></div>
                                </Col>

                            ))}
                        </Row>
                        </Container>
                )}
            </div>
        );
    };

export default Faqs;
