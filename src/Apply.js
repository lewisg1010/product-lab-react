import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import timeline from './timeline.jpeg';
import qrcode from './qrcode.jpeg';

function Apply() {

  return (
<div id="container" className="center">
    <section>
      <div id="divmesomespacesmall"></div>
    <h1 className="bold" id="gradienttext">Apply</h1>
    <p id="clientp">
    Are you interested in technology, business, and/or design? Or, perhaps, you’re interested in products in general and want to learn more about the product development pipeline from when an idea launches into a scalable&nbsp;feature/product!
    </p>

    <p id="clientp">
    Applications are not currently open. Our APM application will reopen in the&nbsp;fall.
    </p>

    <Button id="button" disabled>Applications reopen in the fall</Button>

    <p></p>

    <p id="clientp">
    Product Lab is Harvard’s premier student-run product management organization. Through training programs, real-world product experience, and industry mentorship, we introduce product management to problem-solvers from all backgrounds and help them grow into future product leaders. We’ve also opened up our competitive case team application to all (even students who have not completed the educational comp process in the Fall)! In the past, we’ve worked with companies such as Salesforce, Duolingo, Hubspot, and&nbsp;more!
    </p>

    <p id="clientp">
Still on the fence? Come to our Info Session &amp; Meet/Greet to learn more about our case teams and projects when the semester&nbsp;begins! We’ll post details on <a href="https://www.instagram.com/harvard.product/">@harvard.product</a> on Instagram, so follow for more info. More detailed information about the application will be shared on our <a href="https://five-hill-5b1.notion.site/APM-Applications-S-24-efb62bc2bbce4c3993b62f7dd31f8b25">Notion&nbsp;page</a> when applications&nbsp;reopen.
    </p>
    See y’all in the&nbsp;fall! 🌝
    
    <div>
        <img src={timeline} width={400} height={400} alt="Timeline" />
        <img src={qrcode} width={400} height={400} alt="QrCode" />
    </div>
    
    </section>
    </div>
    );
};

export default Apply;