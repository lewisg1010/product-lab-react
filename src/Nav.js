import React, { Component } from 'react';
import './App.css';
import About from './About';
import Clients from './Clients';
import Home from './Home';
import { Navbar, Image, Container, NavDropdown, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Students from './Students';
import Events from './Events';
import Blog from './Blog';
import Faqs from './Faqs';
import Getinvolved from './Getinvolved';
import DarkMode from './DarkMode';
import Switch from '@mui/material/Switch';
import Post from './Post';

export default class Navb extends Component {
    render() {
        return(
            <Router>
<Navbar expand="lg" fixed="top" id="nav">
        <Container>
          <Navbar.Brand id="productlabbrand"><Image src="/sitehomelogogeneral.svg" alt="Product Lab Logo" id="homelogo"></Image> Product Lab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbartoggle"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"} id="navlinkoverridetextcolor">Home</Nav.Link>
              <Nav.Link as={Link} to={"/about"} id="navlinkoverridetextcolor">About</Nav.Link>
              <Nav.Link as={Link} to={"/clients"} id="navlinkoverridetextcolor">Clients</Nav.Link>
              <Nav.Link as={Link} to={"/students"} id="navlinkoverridetextcolor">Students</Nav.Link>
              <Nav.Link as={Link} to={"/events"} id="navlinkoverridetextcolor">Events</Nav.Link>
              <NavDropdown title="Resources" id="navlinkoverridetextcolor">
                <NavDropdown.Item as={Link} to={"/blog"} id="navdropdownitem">Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/faqs"} id="navdropdownitem">FAQs</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/getinvolved"><Button id="partnerbutton"><span id="bold">Partner with us</span></Button></Nav.Link>
              <DarkMode />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/clients" element={<Clients />} />
        <Route path="/students" element={<Students />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} exact />
        <Route path='/blog/post/:slug' element={<Post />} />
        <Route path="/faqs" element={<Faqs />} /> 
        <Route path="/getinvolved" element={<Getinvolved />} /> 
      </Routes>
      </div>
      </Router>
        )
    }
}
