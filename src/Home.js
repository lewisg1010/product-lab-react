import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';
import Moment from 'react-moment';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';

const Home = () => {
    const [data, setData] = useState({posts: []});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://product-lab-main.herokuapp.com/ghost/api/v3/content/posts/?key=f06429d3909d92f90c46971143&fields=title,slug,feature_image,featured,updated_at,custom_excerpt,reading_time&filter=featured:true&limit=4');
                setData(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return(
<div id="container">
<div>
<Tilt id="tilt" tiltMaxAngleX={5} tiltMaxAngleY={5}><Image src="/plscreenlogo.svg" alt="Product Lab Logo"></Image></Tilt>
<h3>Who are we?</h3>
<p>Product Lab is Harvard&apos;s first product management organization. Through training programs, real-world product experience, and industry mentorship, we introduce product management to problem-solvers from all backgrounds and help them grow into future product leaders.</p>
<button>Work with us</button><button>Join us</button>
</div>
<h3>For companies</h3>
<p>Each spring, Product Lab collaborates with a limited number of corporate partners to complete product-focused projects over the course of the semester. Sometimes, projects entail Product Lab designing and documenting entire products and features from scratch. Other times, Product Lab conducts user research and usability testing to help improve existing products.</p>
<p>As a corporate partner, you will be given a team of 4-8 Product Lab team members. All teams contain several APMs and one Team Lead. All Product Lab team members have successfully completed a 12-week PM bootcamp led by industry leaders, and many have prior PM internship experience.</p>
<button>Learn more</button>

<h3>For students</h3>
<p>Our mission is to increase access to product education and help students from all backgrounds break into PM.</p>
<p>As a Product Lab member, you&apos;ll gain industry experience, receive exclusive career resources, build a portfolio of product projects, and access a growing community of peers, mentors, and employers.</p>
<button>Learn more</button>

  <h3>Featured Content</h3>

  <Container fluid id="alignfeatured">
  
  <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-5 align-items-center">
  {data.posts.map(post => (
        <Col key={post.id}>
        <Tilt style={{ height: 250, width: 250 }}>
{/* <Nav.Link as={`/post/${post.slug}`} to={"/post/[slug]"}> */}
        <Card border="dark" style={{"height" : '120%', width: '18rem' }} id="shadowy">
        <Card.Img variant="top" src={post.feature_image} />
        <Card.Body>
        <Card.Title>
            <a id="cardtitlefont">{post.title}</a>
        </Card.Title>
        <Card.Text>
        <a id="cardtextfont">Posted: <Moment format="MMM DD, YYYY">{post.updated_at}</Moment></a>
        </Card.Text>
        </Card.Body>
        </Card>
        {/* </Nav.Link> */}
        </Tilt>
        <div id="divmesomespace"></div>
        </Col>
    ))}
    </Row>
    </Container>
</div>
    )
}

export default Home;
