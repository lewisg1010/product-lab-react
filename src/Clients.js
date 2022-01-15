import React, { Component } from 'react';
import './App.css';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';

export default class Clients extends Component {
    render() {
        return (
            <div id="container">
    <h1>Clients</h1>
    <p>Each spring, Product Lab collaborates with a limited number of companies and organizations to advance their product vision & strategy. Current clients range from seed-stage startups to Fortune 500 companies.</p>
    <Button id="button" href="/getinvolved">Become a client</Button>
    <h2>Our Process: Typical Engagement Structure</h2>
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
        >
          Before the spring semester
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Project Definition & Scope
          </Typography>
          <Typography>
              <ul>
                <li>Product Lab sets up an exploratory conversation to learn about your current projects, product vision, and goals</li>
                <li>Collaboratively define the scope of the engagement based on your goals</li>
                <li>A Project&apos;s scope can range from designing and documenting an entire new product to conducting usability testing on a specific feature.</li>
                </ul>
            </Typography>
          </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
        >
          Before the spring semester
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Proposal and Approval
          </Typography>
          <Typography>
              <ul>
                  <li>Product Lab sends an in-depth proposal including project description, timeline, milestones, and final deliverable expectations</li>
                  <li>You review the proposal and propose edits if you have any</li>
                  <li>We finalize the proposal doc and sign an NDA and any other applicable paperwork.</li>
              </ul>
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
        >
          Before the spring semester
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Team Designation & Project Kick-off
          </Typography>
          <Typography>
              <ul>
                  <li>Product Lab matches 4-6 members to your project based on their interests and skillsets</li>
                  <li>Product Lab assigns one Team Lead to your project. This Team Lead will serve as your dedicated contact point throughout the engagement</li>
              </ul>
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
        >
          January - March
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector/>
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Project Kick-off
          </Typography>
          <Typography>
              <ul>
                  <li>Your case team begins work, driving toward the first project milestone</li>
              </ul>
          </Typography>
          
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
        >
          March
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector/>
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Feedback and Iteration
          </Typography>
          <Typography>
            <ul>
               <li>Mid-way through the semester, you meet with us so we can present our work to you and receive feedback</li>
            </ul>
          </Typography>
          
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
        >
          May
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector/>
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Final Deliverable
          </Typography>
          <Typography>
              <ul>
                <li>Final deliverables are often in the form of PRDs, final presentations, and stand-alone slide decks</li>
              </ul>
        </Typography>
          
        </TimelineContent>
      </TimelineItem>
    </Timeline>

    <section>
        <h2>Our unique value propositions</h2>
        <li>
            <span>All-Star Team</span>
            <p>Each year, Product Lab recruits talented and creative problem-solvers from Harvard University&apos;s student body. All members have completed a 12-week PM bootcamp led by industry professionals.</p>
        </li>
        <li>
            <span>Unparalleled Commitment</span>
            <p>Over the course of a semester, your dedicated case team commits over 400 hours to your project. All students on your case team have indicated that your company matches their personal and professional interests; your team is psyched to be working with you!</p>
        </li>
        <li>
            <span>Diverse Skillsets</span>
            <p>Each case team contains a diverse range of skillsets and is equipped to tackle many kinds of projects. About one-half of Product Lab&apos;s members have technical backgrounds, and many have previously completed PM, SWE, Marketing, and Design internships.</p>
        </li>
        <li>
            <span>Outside Perspective</span>
            <p>Many clients value our perspective as a third-party, as students, and/or as potential users of the very products we&apos;re working on.</p>
        </li>
        <li>
            <span>Unique Resources</span>
            <p>Product Lab has access to all of Harvard&apos;s unique resources, including students, alumni, and advisors from Harvard Business School.</p>
        </li>
        <li>
            <span>Customized Solutions</span>
            <p>Long before the project begins, Product Lab dedicates significant time to ensure that our final deliverable will have real business value.</p>
        </li>
        <li>
            <span>Recruitment Opportunities</span>
            <p>As a client, you will have access to a pool of exceptional and tech-interested students from Harvard. Opportunities include our resume book as well as priority in hosting workshops and other events.</p>
        </li>
    </section>
    <Button id="button" href="/getinvolved">Become a client</Button>

    </div>
        )
    }
}
