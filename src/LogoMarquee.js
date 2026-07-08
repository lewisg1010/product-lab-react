import React from 'react';
import { Image } from 'react-bootstrap';
import { ExternalLink } from 'react-external-link';

// Shared logo-marquee used by both the Home page (sponsors) and the Clients
// page (past clients), so the two stay in sync — edit the list/behavior once.

// Company home pages — each client/sponsor logo links here.
export const companyLinks = {
    rocketblocks: 'https://www.rocketblocks.me/',
    grammarly: 'https://www.grammarly.com/',
    webex: 'https://www.webex.com/',
    hubspot: 'https://www.hubspot.com/',
    gamma: 'https://gamma.app/',
    oracle: 'https://www.oracle.com/',
    duolingo: 'https://www.duolingo.com/',
};

// The client/sponsor logo set, in display order.
export const clientLogos = [
    { href: companyLinks.rocketblocks, src: '/rocketblocks.svg', alt: 'RocketBlocks logo' },
    { href: companyLinks.grammarly, src: '/grammarly.png', alt: 'Grammarly logo' },
    { href: companyLinks.webex, src: '/webex.png', alt: 'Webex logo' },
    { href: companyLinks.hubspot, src: '/hubspot.png', alt: 'HubSpot logo' },
    { href: companyLinks.gamma, src: '/gamma.png', alt: 'GAMMA logo' },
    { href: companyLinks.oracle, src: '/oracle.png', alt: 'Oracle logo' },
    { href: companyLinks.duolingo, src: '/duolingo.svg', alt: 'Duolingo logo', whiteout: true },
];

// A single logo cell — identical markup whether it sits in the marquee track or
// a fallback grid. Per-logo sizing: set `scale` (e.g. 2 = twice as big, 0.3 =
// 30%); 1/omitted = default. `small: true` is legacy shorthand for scale ~0.85.
// `offsetY` (px, negative = up) nudges a logo whose art sits low/high. `whiteout`
// forces a solid white silhouette in dark mode (e.g. Duolingo).
export const LogoCell = ({ logo }) => {
    const scale = logo.scale != null ? logo.scale : (logo.small ? 0.85 : 1);
    const offsetY = logo.offsetY != null ? logo.offsetY : 0;
    const cls = ['logo-img', logo.whiteout ? 'logo-img--whiteout' : ''].join(' ').trim();
    return (
        <ExternalLink href={logo.href}>
            <div id="sponsor">
                <Image
                    src={logo.src}
                    alt={logo.alt}
                    id="rocketblocks"
                    className={cls}
                    style={{ '--logo-scale': scale, '--logo-offset-y': `${offsetY}px` }}
                />
            </div>
        </ExternalLink>
    );
};

// Constant-speed infinite horizontal scroller. The track is built from two
// IDENTICAL halves; the CSS slides it left by exactly 50% and loops, so the
// second half seamlessly takes the first's place. `reverse` flips direction;
// `duration` (seconds) sets the speed (larger = slower). Each half repeats the
// base set past MIN_ITEMS_PER_HALF so it always overfills the viewport (avoids
// the "half the bar goes blank then reappears" glitch).
const MIN_ITEMS_PER_HALF = 16;
export const LogoMarquee = ({ logos, reverse = false, duration = 40 }) => {
    const repeats = Math.max(2, Math.ceil(MIN_ITEMS_PER_HALF / logos.length));
    const half = Array.from({ length: repeats }).flatMap(() => logos);
    const doubled = half.concat(half); // two identical halves -> seamless -50% loop
    return (
        <div className={`logo-marquee${reverse ? ' logo-marquee--reverse' : ''}`}>
            <div className="logo-marquee__track" style={{ '--marquee-duration': `${duration}s` }}>
                {doubled.map((logo, i) => (
                    // aria-hidden on the second half so screen readers / tab
                    // order don't hit each link twice.
                    <div className="logo-marquee__item" key={i} aria-hidden={i >= half.length}>
                        <LogoCell logo={logo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Two-row treatment: row 1 as-is, row 2 rotated by half so the rows are phase-
// offset (opposite scroll directions) and together always show the full set.
export const splitRows = (logos) => {
    const half = Math.floor(logos.length / 2);
    return [logos, logos.slice(half).concat(logos.slice(0, half))];
};
