import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import Slide from 'react-reveal/Slide';

const Blog = () => {
    const [data, setData] = useState({posts: []});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://product-lab-main.herokuapp.com/ghost/api/v3/content/posts/?key=f06429d3909d92f90c46971143&fields=title,slug,feature_image,featured,updated_at,custom_excerpt,reading_time');
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
  <h1 className="center bold" id="gradienttext">Blog</h1>
  <h3 class="center">A showcase for the <span className="bold" id="gradienttext3">projects</span> and <span className="bold" id="gradienttext3">ideas</span> of our members</h3>
  <div id="divmesomespacesmall" />

  <Container fluid>
  
  <Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-5 align-items-center">
  {data.posts.map(post => (

    <Slide bottom cascade>
        <Col key={post.id}>
        <div id="centereddiv2">
        <Tilt style={{ height: 250, width: 250 }}>
        <Link className="App-link" to={`/blog/post/${post.slug}`}>
        <Card style={{"height" : '120%', width: '18rem' }} id="shadowy">
        <Card.Img variant="top" src={post.feature_image} />
        <Card.Body>
        <Card.Title>
            <p id="blogtitlefont">{post.title}</p>
        </Card.Title>
        <Card.Text>
        <a id="cardtextfont">Posted: <Moment format="MMM DD, YYYY">{post.updated_at}</Moment></a>
        </Card.Text>
        </Card.Body>
        </Card>
        </Link>
        </Tilt>
        </div>
        <div id="divmesomespacebig"></div>
        </Col>

        </Slide>
    ))}
    </Row>
    </Container>
</div>
    )
}

export default Blog;
