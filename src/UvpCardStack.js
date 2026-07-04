import React, { useState } from 'react';
import './App.css';

// The five "Why Product Lab?" value props as a stack of layered TICKET cards.
// Each card is a wide horizontal ticket (square corners) with a vertical tab on
// its LEFT edge holding the sideways title + number; the paragraph sits to the
// right in normal orientation. Cards stack offset to the left so each tab peeks
// out. Clicking the FRONT card peels it; clicking a behind card's tab jumps to
// it. Peeled cards fan diagonally off to the RIGHT (and may run partially
// off-screen), staying visible as a discard pile. Clicking a peeled card
// restores it to the front. The FRONT card stays centered; tabs poke left and
// the peeled pile fans right, so the composition balances around center.
const UVPS = [
    {
        title: 'All-Star Teams',
        body: "Each year, Product Lab recruits talented and creative problem-solvers exclusively from Harvard University's undergraduate student body. All members have either been selected through competitive written application, mock case, and interview rounds, or completed a 12-week PM bootcamp led by industry professionals and Harvard Business School faculty.",
    },
    {
        title: 'Commitment',
        body: 'Over the course of a semester, your dedicated case team commits over 400 hours to your project. All students on your case team have indicated that your company matches their personal and professional interests and have conducted research about the product; your team is psyched to be working with you!',
    },
    {
        title: 'Diverse Skillsets',
        body: "The students of each case team cover a diverse range of skillsets and are equipped to tackle many kinds of projects. A majority of Product Lab's members have technical backgrounds, others having prior web design, consulting, or other useful skills. Many students have also completed PM, SWE, Marketing, and Design internships.",
    },
    {
        title: 'Perspective',
        body: "Clients value our perspective as a third-party, as students, and/or as potential users of the very products we're working on. Additionally, Product Lab has access to all of Harvard's unique resources, including students, alumni, and faculty from Harvard Business School.",
    },
    {
        title: 'Recruitment',
        body: 'As a client, you will have access to a pool of exceptional and tech-interested students from Harvard. Opportunities include our resume book as well as priority in hosting workshops and other events.',
    },
];

const TAB = 58;   // px each stacked card is offset LEFT, so its tab peeks out
const N = UVPS.length;

const UvpCardStack = () => {
    // How many cards have been peeled off the front (0..N-1). We keep at least
    // one card as the active front, so the max is N-1.
    const [dismissed, setDismissed] = useState(0);
    const frontIndex = dismissed;

    const handleCard = (i) => {
        if (i === frontIndex) setDismissed(Math.min(N - 1, dismissed + 1));
        else setDismissed(i); // a behind-tab or a peeled card -> make it front
    };

    return (
        <div className="uvp-stack-wrap">
            <div className="uvp-stack">
                {UVPS.map((uvp, i) => {
                    const rel = i - dismissed; // <0 peeled, 0 front, >0 behind
                    let cls = 'uvp-card';
                    let style;
                    if (rel < 0) {
                        // Peeled: tossed diagonally up-and-right into a loose pile.
                        // Cards OVERLAP heavily (small per-card step) and each sits
                        // at an IRREGULAR angle/offset — a hand-tossed stack, not a
                        // neat fan. Jitter is deterministic per card index i so it's
                        // stable across renders (no Math.random in the render path).
                        const k = -rel; // 1,2,3... most-recently peeled = 1
                        const jx = ((i * 37) % 11);       // 0..10 % (never negative)
                        const jy = ((i * 53) % 17) - 8;   // -8..8  px
                        const jr = ((i * 29) % 21) - 10;  // -10..10 deg
                        cls += ' uvp-card--peeled';
                        // Base 108% shifts the pile fully past the front card's right
                        // edge (card is 100% wide), so peeled cards never overlap the
                        // focused card. jx is >= 0 so jitter can only push further right.
                        style = {
                            transform: `translate(${108 + k * 12 + jx}%, ${-24 - k * 10 + jy}px) rotate(${4 + jr}deg)`,
                            zIndex: 40 + k, // peeled pile floats above the stack
                        };
                    } else {
                        // In stack: shift LEFT by one tab per card behind the front
                        // so left tabs stack like ticket stubs. Front (rel 0) is
                        // centered at translateX(0).
                        cls += rel === 0 ? ' uvp-card--front' : ' uvp-card--stacked';
                        style = {
                            transform: `translateX(${-rel * TAB}px)`,
                            zIndex: N - rel,
                        };
                    }
                    return (
                        <button
                            type="button"
                            key={uvp.title}
                            className={cls}
                            style={style}
                            onClick={() => handleCard(i)}
                            aria-label={rel === 0 ? `${uvp.title} — click to peel` : `Show ${uvp.title}`}
                        >
                            <span className="uvp-card__tab">
                                <span className="uvp-card__num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="uvp-card__title">{uvp.title}</span>
                            </span>
                            <span className="uvp-card__body">
                                <span className="uvp-card__body-title">{uvp.title}</span>
                                {uvp.body}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default UvpCardStack;
