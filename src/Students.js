import React, { Component } from 'react';
import './App.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default class Students extends Component {
    render() {
        return (
        <div id="container">

    <h3>Our initiatives</h3>
    <h4>Fall Semester</h4>
    <ul>
      <li>Fall Semester Comp: Series of product management workshops, speaker events, and a final project</li>
      <ul>
        <li>Led by industry professionals, alumni, and students</li>
        <li>Topics range from breaking into PM to design thinking, user research, and product roadmapping</li>
        <li>At the end of comp, students are divided into teams to complete a product case study project. Members often find that the product case study becomes a valuable portfolio project</li>
        <li>Students become Product Lab members upon successful completion of comp</li>
      </ul>
    <h4>Spring Semester</h4>
    <ul>
      <li>Product Consulting Projects: Product Lab members are divided into case teams and paired with a company to gain real-world product experience.</li>
    </ul>
    <h4>Ongoing</h4>
    <ul>
      <li>Socials</li>
      <li>Speaker events</li>
      <li>Networking opportunities</li>
      <li>Interview prep and career resources</li>
    </ul>
    </ul>
    <Button id="button" href="/getinvolved">Get involved</Button>
    <section id="homesection">
    <Image src="/cookiesocial.jpg" alt="Insomnia Cookie Social" id="studentspics"></Image>
    <Image src="/teamleadmeeting.JPG" alt="Product Lab Case Team Lead Meeting" id="studentspics"></Image>
    <Image src="/boardphoto.JPG" alt="Product Lab Board Photo" id="studentspics"></Image>
    </section>
    </div>
        )
    }
}