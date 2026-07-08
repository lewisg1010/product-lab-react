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
import Post from './Post';
import ScrollToTop from './ScrollToTop';
import Footer from './Footer';


export default class Navb extends Component {

    // Track which nav dropdown is open. react-bootstrap owns each dropdown's
    // open state, so on desktop we drive it explicitly via hover handlers
    // instead of forcing it open with a CSS :hover rule (which fought the
    // framework's inline styles and opened inconsistently).
    state = { openDropdown: null };

    openDropdown = (id) => this.setState({ openDropdown: id });

    // Guard by id so a quick move between the two dropdowns (enter-new before
    // leave-old) doesn't close the one the cursor just landed on.
    closeDropdown = (id) =>
        this.setState((s) => (s.openDropdown === id ? { openDropdown: null } : null));

    toggleTheme = () => {
        const body = document.body;
        const isDark = body.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        body.classList.remove("light", "dark");
        body.classList.add(next);
        if (window.localStorage) {
            localStorage.setItem("theme", next);
        }
    };

    // Controlled-dropdown props: react-bootstrap manages the open state, we
    // just tell it when. Hover opens/closes on desktop; onToggle keeps click
    // and keyboard (and mobile tap) working.
    dropdownProps = (id) => ({
        show: this.state.openDropdown === id,
        onToggle: (isOpen) =>
            this.setState({ openDropdown: isOpen ? id : null }),
        onMouseEnter: () => this.openDropdown(id),
        onMouseLeave: () => this.closeDropdown(id),
    });

    render() {
        return(
            <Router>
              
      <Navbar collapseOnSelect expand="lg" fixed="top" id="nav">
        <Container>
          <Navbar.Brand id="productlabbrand">
            <button
              type="button"
              id="homelogobtn"
              onClick={this.toggleTheme}
              aria-label="Toggle light and dark mode"
              title="Toggle light/dark mode"
            >
              {/* Circular logo. #homelogo is the themed circle; the inner mark
                  masks logo-white.png and is filled with the theme's foreground
                  color — black on the white circle, white on the black one. */}
              <div id="homelogo"><span className="homelogo-mark" /></div>
            </button>
            {/* Two-line wordmark next to the logo: big "PRODUCT" over a smaller
                "at Harvard College" that stretches (justified) to match the width
                of PRODUCT above it (see #brandwordmark). Links home. */}
            <Link to="/" id="brandwordmark" aria-label="Home">
              <span className="brandwordmark-main">PRODUCT</span>
              <span className="brandwordmark-sub">at Harvard College</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="navbartoggle" />
          <Navbar.Collapse className="basic-navbar-nav" id="nogrow">
            <Nav className="me-auto">
              <Nav.Link eventKey="1" as={Link} to={"/"} id="navlinkoverridetextcolor" className="underline2">Home</Nav.Link>
              <Nav.Link eventKey="3" as={Link} to={"/clients"} id="navlinkoverridetextcolor" className="underline2">Clients</Nav.Link>
              {/* <Nav.Link eventKey="5" as={Link} to={"/events"} id="navlinkoverridetextcolor" className="underline2">Events</Nav.Link> */}
              <NavDropdown title="Students" id="navlinkoverridetextcolor" className="underline" {...this.dropdownProps("students")}>
                <NavDropdown.Item eventKey="4" as={Link} to={"/students"} id="navdropdownitem">Students</NavDropdown.Item>
                <NavDropdown.Item eventKey="8" as={Link} to={"/leadership"} id="navdropdownitem">Leadership</NavDropdown.Item>
                <NavDropdown.Item eventKey="5" as={Link} to={"/apply"} id="navdropdownitem">Get Involved</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Resources" id="navlinkoverridetextcolor" className="underline" {...this.dropdownProps("resources")}>
                {/* <NavDropdown.Item eventKey="6" as={Link} to={"/blog"} id="navdropdownitem">Blog</NavDropdown.Item> */}
                <NavDropdown.Item eventKey="7" as={Link} to={"/getinvolved#faqs"} id="navdropdownitem">FAQs</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/getinvolved"><Button id="partnerbutton"><span id="bold">Partner with us</span></Button></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/leadership" exact component={About} />
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
      <Footer />
      </Router>
        )
    }
}
