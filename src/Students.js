import React from 'react';
import './App.css';
import { Row, Col, Container, Image } from 'react-bootstrap';
import Tilt from 'react-parallax-tilt';
import Fade from 'react-reveal/Fade';
import Plx from 'react-plx';
import LineArtBackground from './LineArtBackground';

  const Students = () => {

    const parallaxData = [
      {
        start: 'self',
        end: 1600,
        properties: [
          {
            startValue: 0,
            endValue: 25,
            property: 'translateX',
            unit: 'vw',
          },
        ],
      },
    ];
    const parallaxData2 = [
      {
        start: 'self',
        end: 2400,
        properties: [
          {
            startValue: 0,
            endValue: -25,
            property: 'translateX',
            unit: 'vw',
          },
        ],
      },
    ];
  
        return (
        <>
        <div id="studentcontainer" className="students-container has-lineart">
        <LineArtBackground variant="swirl" />
<div id="divmesomespacesmall"></div>
<h1 className="center bold" id="gradienttext">Students</h1>

    <div id="divmesomespace"></div>
    <h1 className="center bold">Our initiatives</h1>
    <div id="divmesomespacesmall"></div>
    
    <Container fluid>
      <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-5 align-items-center">

        <Col>
        <div id="limitwidth">
        <Plx parallaxData={ parallaxData }>
        <h2 className="bold" id="gradienttextsub">Fall Semester</h2>
        </Plx>
        </div>
        <Fade bottom>
        <div id="studentsitemtext">
        <li><span className="bold">Product Fellowship:</span> Series of product management workshops, speaker events, and a final project</li>
        <ul>
          <li>Led by industry professionals, alumni, and students</li>
          <li>Topics range from breaking into PM to design thinking, user research, and product roadmapping</li>
          <li>At the end of fellowship, students are divided into teams to complete a product case study project. Members often find that the product case study becomes a valuable portfolio project</li>
          <li>Students become Product Lab members upon successful completion of fellowship</li>
        </ul>
        </div>
        </Fade>
        </Col>
        
        <Fade bottom>
        <Col>
          <div id="centereddiv"><Tilt><Image src="/boardphoto.JPG" alt="Product Lab Board Photo" id="studentspics"></Image></Tilt></div>
        </Col>
        </Fade>
          
        <Col>
        <div id="limitwidth">
        <Plx parallaxData={ parallaxData2 }>
        <h2 className="bold right" id="gradienttextsub">Fall &amp; Spring Semester</h2>
        </Plx>
        </div>
        <Fade bottom>
        <div id="studentsitemtext">
          <ul>
            <li><span className="bold">Product Consulting Projects:</span> There is a competitive application process to join Product Lab case teams, consisting of a resume drop, a first round interview with deliverable, and a final behavioral interview. 
            Prior commitment to the fellowship will be taken into consideration and increase the likelihood of case team acceptance. Those accepted into case teams will first join as Associate Product Managers, with the potential to work as a Senior Product Manager or Cast Team Lead in future semesters. Case teams are paired with a company to gain real-world product experience.</li>
          </ul>
        </div>
        </Fade>
        </Col>
        
        <Fade bottom>
        <Col>
        <div id="centereddiv"><Tilt><Image src="/teamleadmeeting.JPG" alt="Product Lab Case Team Lead Meeting" id="studentspics"></Image></Tilt></div>
        </Col>
        </Fade>

        <Col>
        <div id="studentsitemtext">
        <h2 className="bold" id="gradienttextsub">All the time</h2>
        <Fade bottom>
        <ul>
          <li>Socials</li>
          <li>Speaker events</li>
          <li>Networking opportunities</li>
          <li>Interview prep and career resources</li>
        </ul>
        </Fade>
        </div>
        </Col>
        
        <Fade bottom>
        <Col>
        <div id="centereddiv"><Tilt><Image src="/cookiesocial.jpg" alt="Insomnia Cookie Social" id="studentspics"></Image></Tilt></div>
        </Col>
        </Fade>

      </Row>
    </Container>
    <div id="divmesomespace"></div>
    <Fade bottom>
    <h1 className="bold" id="center">Our Values: What Product Lab is About</h1>
    </Fade>
    <div id="divmesomespacesmall"></div>
    <Container fluid>
      {/* Four values as a 2x2 grid (text only; the large emoji illustrations
          were removed). Bootstrap: 1 col on small screens, 2 per row from md up. */}
      <Row xs={1} sm={1} md={2} lg={2} xl={2} className="g-2 align-items-stretch">
      <Fade bottom cascade>

        <Col>
        <div id="studentsitemtext" className="value-card">
        <h2 id="bold" className="center">Community</h2>
        <p id="centertextchunk">We want to foster a supportive environment where everyone can learn together, give each other constructive feedback, and develop valuable skills.</p>
        </div>
        </Col>

        <Col>
        <div id="studentsitemtext" className="value-card">
        <h2 id="bold" className="center">Openness</h2>
        <p id="centertextchunk">No idea is a bad idea! We’re not afraid of big, unexplored ideas and want to hear ALL of them. We also value open communication and collaboration.</p>
        </div>
        </Col>

        <Col>
        <div id="studentsitemtext" className="value-card">
        <h2 id="bold" className="center">Inclusivity</h2>
        <p id="centertextchunk">No gatekeeping here :) We want to give everyone toolkits and opportunities to explore and break into product management.</p>
        </div>
        </Col>

        <Col>
        <div id="studentsitemtext" className="value-card">
        <h2 id="bold" className="center">Learning</h2>
        <p id="centertextchunk">We’re here to grow. Through hands-on projects, mentorship, and workshops, we build real product skills and learn from every challenge along the way.</p>
        </div>
        </Col>

        </Fade>
      </Row>
    </Container>
    </div>

    <a href="/apply" className="become-client-banner" aria-label="Join Product Lab">
      <svg className="become-client-svg" viewBox="0 0 1000 76" preserveAspectRatio="xMidYMax meet" role="img">
        {/* viewBox a few units taller than cap height so the baseline (y=74) can
            sit slightly lower with room for descenders, nudging the text down a
            few px. textLength stretches it edge to edge. */}
        <text x="500" y="80" textLength="1000" lengthAdjust="spacingAndGlyphs">Join Product Lab</text>
      </svg>
    </a>
    </>
        )
}

export default Students;
