import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import './App.css';

const Footer = () => {
    const year = new Date().getFullYear();
    // status: 'idle' | 'sending' | 'success' | 'error'
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        setStatus('sending');
        try {
            const res = await fetch('https://getform.io/f/5c19a844-62ec-4b14-af05-3e0512e44117', {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' },
            });
            // fetch only rejects on network errors, so check the HTTP status too
            // — a 4xx/5xx from Getform means the message did NOT go through.
            if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
            form.reset();
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <footer id="sitefooter">
            <Container>
                <Row className="footer-top">
                    <Col xs={12} md={4} className="footer-brand">
                        <Link to="/" aria-label="Home">
                            <div className="footer-logo"></div>
                        </Link>
                        <p className="footer-tagline">
                            Harvard&apos;s premier product management organization,
                            introducing product management to problem-solvers from all backgrounds.
                        </p>
                        <div className="footer-social">
                            <a
                                href="https://www.instagram.com/harvard.product/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="icon-link"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <Link to="/getinvolved" className="icon-link" aria-label="Contact us">
                                <FaEnvelope size={20} />
                            </Link>
                        </div>
                    </Col>

                    <Col xs={6} md={3} className="footer-links">
                        <h4 className="footer-heading">Explore</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/clients">Clients</Link></li>
                            <li><Link to="/students">Students</Link></li>
                            <li><Link to="/leadership">Leadership</Link></li>
                            <li><Link to="/apply">Apply</Link></li>
                            <li><Link to="/getinvolved#faqs">FAQs</Link></li>
                        </ul>
                    </Col>

                    <Col xs={12} md={5} className="footer-contact">
                        <h4 className="footer-heading">Contact us</h4>
                        {status === 'success' ? (
                            <p className="footer-thankyou">Thank you for your message.</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="footer-form">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    aria-label="Full name"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    aria-label="Message"
                                    rows={3}
                                    required
                                />
                                <button type="submit" className="footer-submit" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending…' : 'Send'}
                                </button>
                                {status === 'error' && (
                                    <p className="footer-formerror" role="alert">
                                        Something went wrong — please email us instead.
                                    </p>
                                )}
                            </form>
                        )}
                    </Col>
                </Row>

                <div className="footer-bottom">
                    <span>Harvard Product Lab &copy; {year}</span>
                    <span>Cambridge, Massachusetts</span>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
