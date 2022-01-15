import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';

export default class Getinvolved extends Component {
    render() {
        return (
        <div id="container">
        <h3 id="center">Contact us</h3>
        <div id="formposition">
        <form action="https://getform.io/f/5c19a844-62ec-4b14-af05-3e0512e44117" method="POST" acceptCharset="UTF-8">
            
            <section id="divmesomespacesmall">
            <p id="center">Name</p>
            <input type="text" name="name" placeholder="Your Name" required="required" id="input" autoFocus></input>
            </section>

            <section id="divmesomespacesmall">
            <p id="center">Email</p>
            <input type="email" name="email" placeholder="email@example.com" required="required" id="input"></input>
            </section>

            <section id="divmesomespacesmall">
            <p id="center">Organization</p>
            <input type="text" name="organization" placeholder="Harvard University" id="input"></input>
            </section>

            <section id="divmesomespacesmall">
            <p id="center">Message</p>
            <input type="text" name="message" placeholder="Expressing interest in ____" id="input"></input>
            </section>

            <section id="divmesomespacesmall">
            <Button id="button" type="submit">Submit</Button>
            </section>

        </form>
        </div>
        </div>
        )
    }
}