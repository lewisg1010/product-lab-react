import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Tilt from 'react-parallax-tilt';
import { Row, Col, Container, Image } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import timeline from './timeline.jpeg';
import qrcode from './qrcode.jpeg';

function Apply() {

 // refresh the page once it is navigated to so that the animation occurs on every visit to the page
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }

  window.onload = function() {
  let path = document.getElementById("path");
  let pathLength = path.getTotalLength();
  console.log(pathLength);
  pathLength = 8000;
  console.log(pathLength);


  let path2 = document.getElementById("path2");
  let pathLength2 = 15500;

  let path3 = document.getElementById("path3");
  let pathLength3 = pathLength2;

  path.style.strokeDasharray = pathLength + ' ' + pathLength;
  path.style.strokeDashoffset = pathLength;

  path2.style.strokeDasharray = pathLength2 + ' ' + pathLength2;
  path2.style.strokeDashoffset = pathLength2;

  path3.style.strokeDasharray = pathLength3 + ' ' + pathLength3;
  path3.style.strokeDashoffset = pathLength3;

  window.addEventListener("scroll", () => {
    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var drawLength = pathLength * scrollPercentage;
    path.style.strokeDashoffset = pathLength - drawLength;

    var scrollPercentage2 = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var drawLength2 = pathLength2 * scrollPercentage2;
    path2.style.strokeDashoffset = pathLength2 - drawLength2;

    var scrollPercentage3 = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var drawLength3 = pathLength3 * scrollPercentage3;
    path3.style.strokeDashoffset = pathLength3 - drawLength3;
  
  });
}

  return (
<div id="container" className="center">
    <section>
      <div id="divmesomespacesmall"></div>
    <Zoom top>
    <h1 className="bold" id="gradienttext">Apply</h1>
    </Zoom>
    <p id="clientp">
    Are you interested in technology, business, and/or design? Or, perhaps, you’re interested in products in general and want to learn more about the product development pipeline from when an idea launches into a scalable feature/product!
    </p>

    <Button id="button" href="https://docs.google.com/forms/d/e/1FAIpQLSe2LHrAzBAt2QR4fzn1NRbrQLVW-ZCD2sLz20S2YEyE6NtCHA/viewform">Apply to become an APM</Button>

    <p></p>

    <p id="clientp">
    Product Lab is Harvard’s first student-run product management organization. Through training programs, real-world product experience, and industry mentorship, we introduce product management to problem-solvers from all backgrounds and help them grow into future product leaders. This year, we are opening up our competitive case team application to all (even students who have not completed the educational comp process in the Fall)! In the past, we’ve worked with companies such as Salesforce, Duolingo, Hubspot, and more! 
    </p>

    <p id="clientp">
Still on the fence? Come to our Info Session + Meet/Greet to learn more about our case teams and projects on February 2nd from 4-6 pm in Ticknor Lounge. We will be sending out the location to all students who have indicated interest via the initial application form as well as posting about it on <a href="https://www.instagram.com/harvard.product/">@harvard.product</a> on Instagram so follow for more info. More detailed information about the application is on our Notion page here as well! 
    </p>
    See y’all very very soon 🌝
    
    <div>
        <img src={timeline} width={400} height={400} alt="Timeline" />;
        <img src={qrcode} width={400} height={400} alt="QrCode" />;
    </div>
    
    </section>
    </div>
    );
};

export default Apply;