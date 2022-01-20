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
import Slide from 'react-reveal/Slide';


function About() {

    const [bios, setBios] = useState(null);

    useEffect(() => {
        const fetchBios = async() => {
            const { bios } = await request('https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master', 
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
            }
            }
            `
            );

    setBios(bios);
  };

  fetchBios();
}, []);


        return (
            <div id="container" class="center">
                {!bios ? (
                    'Loading'
                ) : (
                    <div>
                    <section>
                    <div id="divmesomespacesmall"></div>
                    <h1 className="center bold" id="gradienttext">About Product Lab</h1>
                    <div id="divmesomespacesmall" />
                      <p id="textchunk">Launched in September 2021, Product Lab is Harvard College's first Product Management organization.</p>
                      <p id="textchunk">Through training programs, industry experience, and mentorship, Product Lab helps creative problem solvers from diverse backgrounds grow into future product leaders.</p>
                  </section>
                  <section>
                    <div id="divmesomespacesmall" />
                    <h1 className="bold">Board Members</h1>
                    <div id="divmesomespacesmall" />
                  </section>
                  
    <Container fluid>
    <Row xs={1} sm={1} md={2} lg={2} xl={3} className="g-3 align-items-center d-flex card-block">
        {bios.map((bio, i) => (
    <Slide bottom cascade>
    <Col key={bio.name}>
    <Card style={{"height" : '120%', width: '20rem'}} id="aboutcard">
      <Card.Img variant="top" src={bio.photo.url} />
      <Card.Body>
        <Card.Title>
            <a id="cardtitlefont">{bio.name}</a>
        </Card.Title>
        <Card.Text>
        <p>{bio.title}</p>
        </Card.Text>
      </Card.Body>
      <Accordion id="accordian">
    <AccordionSummary
      expandIcon={<ExpandMoreIcon id="expandmoreicon" />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography id="overridefont">About {bio.name.split(" ")[0]}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography id="overridefont">
      {bio.aboutme}
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
                    </div>
                )}
                <section>
  <h1 className="bold">Our Advisory Board</h1>
  <div id="divmesomespacesmall" />
</section>

<Container fluid>
    <Row xs={1} sm={1} md={2} lg={3} xl={3} className="g-1 align-items-center d-flex card-block">
        <Col>
        <Card style={{"height" : '120%', width: '18rem'}} id="advisorcard">
          <Card.Img variant="top" src={'./tomphoto.jpg'} />
          <Card.Body>
            <Card.Title>
                <a id="cardtitlefont">Tom Eisenmann</a>
            </Card.Title>
            <Card.Text>
            <p>Professor of Entrepreneurship at Harvard Business School & Faculty Chair of Harvard Innovation Lab. Author of &quot;The Fail-Safe Startup&quot;.</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <div id="divmesomespace"></div>
        </Col>

        <Col>
        <Card style={{"height" : '120%', width: '18rem'}} id="advisorcard">
          <Card.Img variant="top" src={'./deborahphoto.png'} />
          <Card.Body>
            <Card.Title>
                <a id="cardtitlefont">Deborah Liu</a>
            </Card.Title>
            <Card.Text>
            <p>CEO of Ancestry.com & Founder of Women in Product. Previously VP of Product at Facebook & Director of Product at eBay.</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <div id="divmesomespace"></div>
        </Col>

        <Col>
        <Card style={{"height" : '120%', width: '18rem'}} id="advisorcard">
          <Card.Img variant="top" src={'./jeffphoto.png'} />
          <Card.Body>
            <Card.Title>
                <a id="cardtitlefont">Jeffrey Bussgang</a>
            </Card.Title>
            <Card.Text>
            <p>Senior Lecturer at Harvard Business School, Co-Founder & General Partner at Flybridge Capital Partners, & Co-Founder at Hack.Diversity.</p>
            </Card.Text>
          </Card.Body>
        </Card>
        <div id="divmesomespace"></div>
        </Col>
    </Row>
    </Container>
            </div>
        );
    };

export default About;
