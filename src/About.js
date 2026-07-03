import React, { useState, useEffect } from 'react';
import './App.css';
import { request } from 'graphql-request';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from 'react-reveal/Fade';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import LineArtBackground from './LineArtBackground';

function About() {
  const [bios, setBios] = useState(null);

  useEffect(() => {
    const fetchBios = async () => {
      const { bios } = await request(
        'https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master',
        `{
          bios {
            name
            title
            photo {
              url
            }
            aboutme
            board
            slug
            email
            linkedin
          }
        }`
      );

      setBios(bios);
    };

    fetchBios();
  }, []);

  return (
    <div id="container" className="center has-lineart">
      <LineArtBackground />
      {!bios ? (
        ''
      ) : (
        <div>
          <section>
            <div id="divmesomespacesmall"></div>
            <h1 className="center bold" id="gradienttext">
              Leadership
            </h1>
          </section>

          <section>
            <div id="divmesomespacesmall" />
            <h1 className="bold">Our Board Members</h1>
            <div id="divmesomespacesmall" />
          </section>

          <Container fluid id="limitwidth">
            <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-3 align-items-center d-flex card-block">
              {[...bios]
                .sort((a, b) => {
                  const isExec = (person) =>
                    person.title?.toLowerCase().includes('president') ||
                    person.title?.toLowerCase().includes('executive');
                  const rank = (person) => {
                    if (isExec(person)) return 2;
                    if (person.board) return 1;
                    return 0;
                  };
                  return rank(b) - rank(a);
                })
                .map((bio) => (
                  <Fade cascade key={bio.slug}>
                    <Col>
                      <Card style={{ height: '100%', width: '20rem' }} id="aboutcard">
                        <div style={{ width: '318px', height: '230px', overflow: 'hidden', margin: 'auto' }}>
                          <img
                            src={bio.photo.url}
                            alt={bio.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              // Natanya Tan's headshot is cropped too high (top of head cut
                              // off), so shift the crop window up ~30% to reveal it.
                              objectPosition: bio.name?.toLowerCase().includes('natanya')
                                ? 'center 20%'
                                : 'center',
                              // Maria Tracy's headshot sits smaller in frame than the rest;
                              // scale it up so her face matches the others' size, and nudge
                              // it down since scaling from center left her face too high.
                              transform: bio.name?.toLowerCase().includes('maria')
                                ? 'scale(1.35) translateY(12%)'
                                : 'none',
                              transformOrigin: 'center',
                              display: 'block'
                            }}
                          />
                        </div>
                        <Card.Body>
                          <Card.Title>
                            <a id="cardtitlefont">{bio.name}</a>
                          </Card.Title>
                          <Card.Text><p>{bio.title}</p></Card.Text>

                          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                            {bio.email && (
                              <a
                                href={`mailto:${bio.email}`}
                                className="icon-link"
                                aria-label="Email"
                              >
                                <FaEnvelope size={20} />
                              </a>
                            )}
                            {bio.linkedin && (
                              <a
                                href={bio.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-link"
                                aria-label="LinkedIn profile"
                              >
                                <FaLinkedin size={20} />
                              </a>
                            )}
                          </div>
                        </Card.Body>

                        <Accordion id="accordian">
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon id="expandmoreicon" />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography id="overridefont">About {bio.name.split(' ')[0]}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography id="overridefont">{bio.aboutme}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Card>
                      <div id="divmesomespace"></div>
                    </Col>
                  </Fade>
                ))}
            </Row>
          </Container>
        </div>
      )}

      <section id="pasteventfade">
        <h1 className="bold">Our Advisory Board</h1>
        <div id="divmesomespacesmall" />
      </section>

      <Container fluid id="pasteventfade">
        <Row xs={1} sm={1} md={2} lg={3} xl={3} className="g-1 align-items-center d-flex card-block">
          <Col>
            <Card style={{ height: '100%', width: '18rem' }} id="advisorcard">
              <Card.Img variant="top" src={'./tomphoto.jpg'} />
              <Card.Body>
                <Card.Title>
                  <a id="cardtitlefont">Tom Eisenmann</a>
                </Card.Title>
                <Card.Text>
                  <p>
                    Professor of Entrepreneurship at Harvard Business School & Faculty Chair of Harvard Innovation
                    Lab. Author of "The Fail-Safe Startup".
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ height: '100%', width: '18rem' }} id="advisorcard">
              <Card.Img variant="top" src={'./deborahphoto.png'} />
              <Card.Body>
                <Card.Title>
                  <a id="cardtitlefont">Deborah Liu</a>
                </Card.Title>
                <Card.Text>
                  <p>
                    CEO of Ancestry.com & Founder of Women in Product. Previously VP of Product at Facebook & Director
                    of Product at eBay.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card style={{ height: '100%', width: '18rem' }} id="advisorcard">
              <Card.Img variant="top" src={'./jeffphoto.png'} />
              <Card.Body>
                <Card.Title>
                  <a id="cardtitlefont">Jeffrey Bussgang</a>
                </Card.Title>
                <Card.Text>
                  <p>
                    Senior Lecturer at Harvard Business School, Co-Founder & General Partner at Flybridge Capital
                    Partners, & Co-Founder at Hack.Diversity.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
