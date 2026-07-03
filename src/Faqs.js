import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './App.css';
import { request } from 'graphql-request';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LineArtBackground from './LineArtBackground';

// Locally-authored FAQ content, grouped into categories shown one at a time via
// the category tab bar. CMS-managed questions are merged into "General".
const FAQ_CATEGORIES = [
    {
        title: 'General',
        faqs: [
            {
                question: 'What is Product Lab?',
                answer:
                    "Product Lab is Harvard College's premier Product Management organization. We develop the next generation of product leaders through a structured curriculum, hands-on industry projects, and mentorship from working product professionals.",
            },
            {
                question: 'Who can join?',
                answer:
                    'Product Lab is open to all Harvard College undergraduates, regardless of concentration or year. We select for curiosity, initiative, and a genuine interest in building products — not a specific background.',
            },
            {
                question: 'Do I need prior product management experience?',
                answer:
                    'No. Most members join with little or no formal PM background. Our curriculum is built to take you from fundamentals to real project work alongside experienced peers and mentors.',
            },
            {
                question: 'What is the time commitment?',
                answer:
                    'Associate Product Managers are expected to spend roughly 3–5 hours per week across general meetings, project work, and client calls. The commitment increases around project deadlines and presentation days.',
            },
            {
                question: 'Is Product Lab affiliated with Harvard?',
                answer:
                    'Product Lab is a student-run organization at Harvard College, associated with the Harvard Computer Society, and part of the broader campus entrepreneurship and innovation community. We work closely with campus resources but are led entirely by students.',
            },
        ],
    },
    {
        title: 'Membership',
        faqs: [
            {
                question: 'How do I apply?',
                answer:
                    'Applications open at the start of each semester, announced in mailing lists, our Instagram page, and at fairs. Submit a short written application and mock case analysis, and selected candidates are invited to a brief conversation with our team.',
            },
            {
                question: 'When does recruitment happen?',
                answer:
                    'We recruit a new cohort each fall, with a smaller spring round when spots are available. Application deadlines and information sessions are announced through our website, mailing lists, and Instagram.',
            },
            {
                question: 'How selective is the process?',
                answer:
                    'Product Lab is selective, but we prioritize potential and enthusiasm over polished experience. We admit a diverse cohort each term and encourage everyone interested in product to apply.',
            },
            {
                question: 'Can graduate students get involved?',
                answer:
                    'Core membership is undergraduate. Graduate students are welcome at our public speaker events and workshops, and can reach out about mentorship or collaboration.',
            },
        ],
    },
    {
        title: 'Programs',
        faqs: [
            {
                question: 'What will I learn?',
                answer:
                    'Members build practical product skills: user research and discovery, roadmapping and prioritization, wireframing and prototyping, working with engineers and designers, data-informed decision making, and communicating a product vision.',
            },
            {
                question: 'Do members work on real projects?',
                answer:
                    'Yes! Each case team cohort works in teams on semester-long projects in partnership with startups and established companies, and presents their work directly to their clients.',
            },
            {
                question: 'Are events open to the wider campus?',
                answer:
                    'Many of our speaker events, fireside chats, and workshops are open to the broader Harvard community. Members-only programming includes our core curriculum and partner projects.',
            },
        ],
    },
    {
        title: 'Partners',
        faqs: [
            {
                question: 'How can my company partner with Product Lab?',
                answer:
                    'We collaborate on real product challenges, host recruiting and speaker events, and design sponsored programming. Reach out through the Get Involved page to start a conversation.',
            },
            {
                question: 'What do partnerships include?',
                answer:
                    'Partnerships are tailored to each organization and can include semester-long project sponsorships, branded workshops, priority access to our talent pipeline, and speaking opportunities.',
            },
            {
                question: 'Can partners recruit members?',
                answer:
                    'Yes. Partners regularly connect with members for internships and full-time roles through resume shares, information sessions, and direct introductions.',
            },
            {
                question: 'Does HPL charge partners for cases?',
                answer:
                    'HPL conducts pro-bono cases alongside paid casework, but all of our projects can be negotiated depending on scope and unique client situations. As a non-profit, HPL commits all revenue from casework directly to member training, community efforts, and supporting pro-bono casework.',
            },
        ],
    },
];

// The FAQ block on its own (no page container), so it can be embedded on other
// pages — e.g. below the Contact Us form on the Get Involved page.
export function FaqsContent() {
    // CMS-managed questions, appended to the "General" category.
    const [remoteFaqs, setRemoteFaqs] = useState([]);
    const [activeCategory, setActiveCategory] = useState(0);
    const [expanded, setExpanded] = useState(false);
    // Different categories have different question counts, so switching tabs
    // changes the list height — which shrinks the page and makes the browser
    // yank the scroll position (the whole page appears to jump under the tabs).
    // Fix: track the TALLEST list height seen and use it as a min-height floor,
    // so the page never gets shorter when you switch to a smaller category.
    const listRef = useRef(null);
    const [minListHeight, setMinListHeight] = useState(0);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const { faqs } = await request(
                    'https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master',
                    `{
                        faqs {
                            question
                            answer
                          }
                        }
                    `
                );

                setRemoteFaqs(faqs || []);
            } catch (err) {
                // Fail gracefully — the locally-authored FAQs still render.
                setRemoteFaqs([]);
            }
        };

        fetchFaqs();
    }, []);

    // Merge CMS questions into the General category so nothing is lost.
    const categories = FAQ_CATEGORIES.map((category) =>
        category.title === 'General'
            ? { ...category, faqs: [...category.faqs, ...remoteFaqs] }
            : category
    );

    const selectCategory = (index) => {
        setActiveCategory(index);
        setExpanded(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const current = categories[activeCategory] || categories[0];

    // After each render that can change the list's natural height (tab switch,
    // expand/collapse, CMS load), measure the content and raise the min-height
    // floor to the tallest seen. useLayoutEffect so it's applied before paint,
    // avoiding a visible reflow. scrollHeight ignores our own min-height, so it
    // reflects the true content height.
    useLayoutEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const natural = el.scrollHeight;
        setMinListHeight((prev) => (natural > prev ? natural : prev));
    }, [activeCategory, expanded, remoteFaqs]);

    return (
        <div id="faqsection">
            <div id="faqheader">
                <p id="faqeyebrow">Support</p>
                <h1 id="faqtitle">Frequently asked questions</h1>
            </div>

            <nav id="faqtabs" aria-label="FAQ categories">
                {categories.map((category, index) => (
                    <button
                        type="button"
                        key={category.title}
                        className={
                            index === activeCategory ? 'faqtab faqtab-active' : 'faqtab'
                        }
                        aria-pressed={index === activeCategory}
                        onClick={() => selectCategory(index)}
                    >
                        {category.title}
                    </button>
                ))}
            </nav>

            <div id="faqwrap" ref={listRef} style={{ minHeight: minListHeight || undefined }}>
                {current.faqs.map((faq, i) => {
                    const panelId = `faq-${activeCategory}-${i}`;
                    const isOpen = expanded === panelId;
                    return (
                        <Accordion
                            key={faq.question || panelId}
                            id="faqaccordion"
                            square
                            disableGutters
                            elevation={0}
                            expanded={isOpen}
                            onChange={handleChange(panelId)}
                        >
                            <AccordionSummary
                                expandIcon={
                                    isOpen ? (
                                        <RemoveIcon id="faqicon" />
                                    ) : (
                                        <AddIcon id="faqicon" />
                                    )
                                }
                                aria-controls={`${panelId}-content`}
                                id={`${panelId}-header`}
                            >
                                <Typography id="faqquestion">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography id="faqanswer">{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
        </div>
    );
}

// Standalone FAQ page (the /faqs route) — wraps the shared content in the page
// container so it renders on its own like before.
function Faqs() {
    return (
        <div id="container" className="has-lineart">
            <LineArtBackground />
            <FaqsContent />
        </div>
    );
}

export default Faqs;
