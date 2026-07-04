import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css';
import { FaqsContent } from './Faqs';
import LineArtBackground from './LineArtBackground';

export default class Getinvolved extends Component {
    // status: 'idle' | 'sending' | 'success' | 'error'
    // emailPinned: once the heading is clicked, the email stays revealed even
    // after the cursor leaves (hover alone reveals it only while hovering).
    state = { status: 'idle', emailPinned: false };

    toggleEmail = () => this.setState((s) => ({ emailPinned: !s.emailPinned }));

    handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        this.setState({ status: 'sending' });
        try {
            const res = await fetch('https://getform.io/f/5c19a844-62ec-4b14-af05-3e0512e44117', {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });
            // fetch resolves even on 4xx/5xx, so check the HTTP status — a bad
            // status means Getform did NOT accept the message.
            if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
            form.reset();
            this.setState({ status: 'success' });
        } catch (err) {
            this.setState({ status: 'error' });
        }
    };

    render() {
        const { status, emailPinned } = this.state;
        return (
        <div id="container" className="has-lineart">
        <LineArtBackground variant="waves" />
        <div id="formposition">
        <div id="divmesomespacesmall"></div>
        <div className={`contact-title-reveal${emailPinned ? ' is-pinned' : ''}`}>
            <h3
                className="center bold contact-title-toggle"
                id="gradienttext"
                onClick={this.toggleEmail}
                role="button"
                tabIndex={0}
                aria-expanded={emailPinned}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleEmail(); }
                }}
            >
                Contact Us
            </h3>
            <a className="contact-email-fold center" href="mailto:hcs.product.lab@gmail.com">
                at hcs.product.lab@gmail.com
            </a>
        </div>
        <p className="contact-subhead center">
            Ask about us // Bring HPL to your organization<br />
            See when applications open // Share a fun fact
        </p>
        <form
            className="contact-form"
            onSubmit={this.handleSubmit}
            acceptCharset="UTF-8"
        >
            <div className="contact-field-row">
                <div className="contact-field">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" className="contact-input" type="text" name="name" placeholder="Your name" required="required" autoFocus></input>
                </div>

                <div className="contact-field">
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" className="contact-input" type="email" name="email" placeholder="email@example.com" required="required"></input>
                </div>
            </div>

            <div className="contact-field">
                <label htmlFor="contact-org">Organization</label>
                <input id="contact-org" className="contact-input" type="text" name="organization" placeholder="Company or university"></input>
            </div>

            <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" className="contact-input contact-textarea" name="message" rows="2" placeholder="Tell us a little about what you're interested in…" required="required"></textarea>
            </div>

            <Button id="button" className="contact-submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
            </Button>
            {status === 'success' && (
                <p className="contact-status contact-status--ok" role="status">
                    Thanks! Your message has been sent.
                </p>
            )}
            {status === 'error' && (
                <p className="contact-status contact-status--error" role="alert">
                    Something went wrong sending your message. Please try again, or email us directly.
                </p>
            )}
        </form>
        </div>

        {/* FAQs live on this same page, below the contact form. The /faqs route
            still exists and renders the same content standalone. The FAQs nav
            link points here (/getinvolved#faqs) and scrolls to this anchor. */}
        <hr className="contact-faq-divider" />
        <div id="faqs">
        <FaqsContent />
        </div>
        </div>
        )
    }
}