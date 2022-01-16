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
import { Dropdown } from 'bootstrap';

export default class Navb extends Component {
    render() {
        return(
          // <Container>
            <Router>
              
      <Navbar collapseOnSelect expand="lg" fixed="top" id="nav">
        <Container>
          <Navbar.Brand id="productlabbrand"><Link to="/"><Image src="/sitehomelogogeneral.svg" alt="Product Lab Logo" id="homelogo"></Image></Link> Product Lab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbartoggle" />
          <Navbar.Collapse className="basic-navbar-nav" id="nogrow">
            <Nav className="me-auto">
              <Nav.Link eventKey="1" as={Link} to={"/"} id="navlinkoverridetextcolor" className="underline2">Home</Nav.Link>
              <Nav.Link eventKey="2" as={Link} to={"/about"} id="navlinkoverridetextcolor" className="underline2">About</Nav.Link>
              <Nav.Link eventKey="3" as={Link} to={"/clients"} id="navlinkoverridetextcolor" className="underline2">Clients</Nav.Link>
              <Nav.Link eventKey="4" as={Link} to={"/students"} id="navlinkoverridetextcolor" className="underline2">Students</Nav.Link>
              <Nav.Link eventKey="5" as={Link} to={"/events"} id="navlinkoverridetextcolor" className="underline2">Events</Nav.Link>
              <NavDropdown title="Resources" id="navlinkoverridetextcolor" className="underline">
                <NavDropdown.Item eventKey="6" as={Link} to={"/blog"} id="navdropdownitem">Blog</NavDropdown.Item>
                <NavDropdown.Item eventKey="7" as={Link} to={"/faqs"} id="navdropdownitem">FAQs</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/getinvolved"><Button id="button"><span id="bold">Partner with us</span></Button></Nav.Link>
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
      // </Container>
        )
    }
}
