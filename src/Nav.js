import React, { Component } from 'react';
import './App.css';
import About from './About';
import Clients from './Clients';
import Home from './Home';
import Apply from './Apply';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Students from './Students';
import Events from './Events';
import Blog from './Blog';
import Faqs from './Faqs';
import Getinvolved from './Getinvolved';
import DarkMode from './DarkMode';
import Post from './Post';
import ScrollToTop from './ScrollToTop';


export default class Navb extends Component {
    
    render() {
        return(
            <Router>
              
      <Navbar collapseOnSelect expand="lg" fixed="top" id="nav">
        <Container>
          <Navbar.Brand id="productlabbrand"><Link to="/"><div id="homelogo"></div></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbartoggle" />
          <Navbar.Collapse className="basic-navbar-nav" id="nogrow">
            <Nav className="me-auto">
              <Nav.Link eventKey="1" as={Link} to={"/"} id="navlinkoverridetextcolor" className="underline2">Home</Nav.Link>
              <Nav.Link eventKey="2" as={Link} to={"/about"} id="navlinkoverridetextcolor" className="underline2">About</Nav.Link>
              <Nav.Link eventKey="3" as={Link} to={"/clients"} id="navlinkoverridetextcolor" className="underline2">Clients</Nav.Link>
              <Nav.Link eventKey="4" as={Link} to={"/students"} id="navlinkoverridetextcolor" className="underline2">Students</Nav.Link>
              {/* <Nav.Link eventKey="5" as={Link} to={"/events"} id="navlinkoverridetextcolor" className="underline2">Events</Nav.Link> */}
              <Nav.Link eventKey="5" as={Link} to={"/apply"} id="navlinkoverridetextcolor" className="underline2">Apply</Nav.Link>
              <NavDropdown title="Resources" id="navlinkoverridetextcolor" className="underline">
                {/* <NavDropdown.Item eventKey="6" as={Link} to={"/blog"} id="navdropdownitem">Blog</NavDropdown.Item> */}
                <NavDropdown.Item eventKey="7" as={Link} to={"/faqs"} id="navdropdownitem">FAQs</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/getinvolved"><Button id="button"><span id="bold">Partner with us</span></Button></Nav.Link>
              <DarkMode />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} /> 
        <Route path="/about" exact component={About} /> 
        <Route path="/clients" exact component={Clients} />
        <Route path="/students" exact component={Students} />
        {/* <Route path="/events" exact component={Events} /> */}
        <Route path="/apply" exact component={Apply} />
        <Route path="/blog" exact component={Blog} />
        <Route path='/blog/post/:slug' exact component={Post} />
        <Route path="/faqs" exact component={Faqs} /> 
        <Route path="/getinvolved" exact component={Getinvolved} /> 
      </Switch>
      </div>
      </Router>
        )
    }
}
