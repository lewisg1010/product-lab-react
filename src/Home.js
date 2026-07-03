import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';
import Moment from 'react-moment';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Fade from 'react-reveal/Fade';
import { ExternalLink } from 'react-external-link';
import LineArtBackground from './LineArtBackground';

// A single logo cell — identical markup whether it sits in the marquee track
// or the fallback grid, so both layouts render the logos the same way.
// Per-logo sizing: set `scale` on a logo (e.g. scale: 2 = twice as big, 0.3 =
// 30% size) to fine-tune one that renders too big/small next to the others.
// 1 (or omitted) = the default size. `small: true` is legacy shorthand for
// scale ~0.85. The value feeds the --logo-scale CSS var (see #rocketblocks).
const LogoCell = ({ logo }) => {
    const scale = logo.scale != null ? logo.scale : (logo.small ? 0.85 : 1);
    // Optional per-logo vertical nudge in px (negative = up) to visually align a
    // logo whose art sits low/high in its own image. Feeds --logo-offset-y.
    const offsetY = logo.offsetY != null ? logo.offsetY : 0;
    // whiteout: true -> in dark mode, force this logo to a SOLID white silhouette
    // (brightness(0) invert(1)) instead of the default luminance-invert. Use for
    // logos that should read as one flat white shape (e.g. Duolingo).
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
// `duration` (seconds) sets the speed (larger = slower).
//
// Each half repeats the base logo set enough times to be WIDER than any
// realistic viewport (MIN_ITEMS_PER_HALF). This is what prevents the "half the
// bar goes blank then reappears" glitch: with only one copy per half, a set
// narrower than the full-bleed strip runs out mid-scroll and exposes empty
// space. Over-filling guarantees the strip is always fully covered.
//
// IMPORTANT: defined at module scope (not inside Home). If it lived inside the
// component it would be a new type on every Home re-render (e.g. when the blog
// fetch resolves), forcing React to remount the marquee and restart the CSS
// animation from 0 — which shows up as a lag/jump whenever the page updates.
const MIN_ITEMS_PER_HALF = 16;
const LogoMarquee = ({ logos, reverse = false, duration = 40 }) => {
    const repeats = Math.max(2, Math.ceil(MIN_ITEMS_PER_HALF / logos.length));
    const half = Array.from({ length: repeats }).flatMap(() => logos);
    const doubled = half.concat(half); // two identical halves -> seamless -50% loop
    return (
        <div className={`logo-marquee${reverse ? ' logo-marquee--reverse' : ''}`}>
            <div className="logo-marquee__track" style={{ '--marquee-duration': `${duration}s` }}>
                {doubled.map((logo, i) => (
                    // aria-hidden on the second half so screen readers/tab
                    // order don't hit each link twice.
                    <div className="logo-marquee__item" key={i} aria-hidden={i >= half.length}>
                        <LogoCell logo={logo} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Full-bleed background "wall" of a repeated section title behind a feature
// row. Three rows of the phrase repeat continuously edge-to-edge; the middle
// row is offset half a phrase so the columns stagger (brick-like) rather than
// line up. Each row drifts slowly (alternating direction) so the wall feels
// alive; when the section is centered it reads as a dense typographic backdrop.
// Full-bleed (100vw, breaking out of #container's padding) so nothing clips
// into the white side padding. Module scope so it isn't remounted on re-render.
const HEADING_WALL_REPEATS = 8; // copies per row; enough to overflow wide screens
const FeatureHeadingWall = ({ text }) => {
    const rows = [
        { offset: false, dir: 'left', dur: 34 },
        { offset: true, dir: 'right', dur: 42 }, // staggered + drifts opposite
        { offset: false, dir: 'left', dur: 38 },
    ];
    const phrase = `${text} `; // em-space gap between repetitions
    return (
        <div className="heading-wall" aria-hidden="true">
            {rows.map((row, r) => (
                <div className="heading-wall__row" key={r}>
                    <div
                        className={`heading-wall__track heading-wall__track--${row.dir}${row.offset ? ' heading-wall__track--offset' : ''}`}
                        style={{ '--wall-duration': `${row.dur}s` }}
                    >
                        {/* Rendered twice for a seamless -50% loop. */}
                        {Array.from({ length: HEADING_WALL_REPEATS * 2 }).map((_, i) => (
                            <span className="heading-wall__word" key={i}>{phrase}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const Home = () => {

    // The big section titles behind each feature row are now rendered as a
    // full-bleed repeating "wall" (see FeatureHeadingWall) instead of a single
    // parallax word, so they never clip into the container's side padding.

    const [data, setData] = useState({posts: []});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://product-lab-main.herokuapp.com/ghost/api/v3/content/posts/?key=f06429d3909d92f90c46971143&fields=title,slug,feature_image,featured,updated_at,custom_excerpt,reading_time&filter=featured:true&limit=4');
                setData(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    // Company home pages — each sponsor/alumni logo links here.
    const companyLinks = {
        rocketblocks: 'https://www.rocketblocks.me/',
        grammarly: 'https://www.grammarly.com/',
        webex: 'https://www.webex.com/',
        microsoft: 'https://www.microsoft.com/',
        nasa: 'https://www.nasa.gov/',
        accenture: 'https://www.accenture.com/',
        sequoia: 'https://www.sequoiacap.com/',
        atlassian: 'https://www.atlassian.com/',
        apple: 'https://www.apple.com/',
        salesforce: 'https://www.salesforce.com/',
        goldman: 'https://www.goldmansachs.com/',
        hubspot: 'https://www.hubspot.com/',
        gamma: 'https://gamma.app/',
        oracle: 'https://www.oracle.com/utilities/',
        google: 'https://about.google/',
        amazon: 'https://aws.amazon.com/',
        duolingo: 'https://www.duolingo.com/',
    };

    // Logo sets for the Home logo strips, in display order.
    const sponsorLogos = [
        { href: companyLinks.rocketblocks, src: '/rocketblocks.svg', alt: 'RocketBlocks logo' },
        { href: companyLinks.grammarly, src: '/grammarly.png', alt: 'Grammarly logo' },
        { href: companyLinks.webex, src: '/webex.png', alt: 'Webex logo' },
        { href: companyLinks.hubspot, src: '/hubspot.png', alt: 'HubSpot logo' },
        { href: companyLinks.gamma, src: '/gamma.png', alt: 'GAMMA logo' },
        { href: companyLinks.oracle, src: '/oracle.png', alt: 'Oracle logo' },
        { href: companyLinks.duolingo, src: '/duolingo.svg', alt: 'Duolingo logo', whiteout: true },
    ];
    // Alumni placements — ONE master list. BOTH marquee rows show the FULL
    // list (not a split), scrolling in opposite directions. Row 2 is rotated by
    // half the list so it's phase-offset from row 1: the logos bunched off to
    // one side in row 1 are the ones centered in row 2, so at any moment the two
    // rows together display the whole set. Add/remove companies here only.
    // Logos are box-normalized + evenly spaced in CSS (see .logo-marquee__item):
    // each fits a fixed width x height box via object-fit:contain, so wide
    // wordmarks and square marks carry similar visual weight with no per-logo
    // hacks. `scale` stays available for fine optical tuning (square marks can
    // still read a touch heavy); `offsetY` re-centers a mark that sits high/low
    // in its own (now-trimmed) image.
    const alumniLogos = [
        { href: companyLinks.google, src: '/google.png', alt: 'Google logo' },
        { href: companyLinks.accenture, src: '/accenture.png', alt: 'accenture logo' },
        { href: companyLinks.salesforce, src: '/salesforce.png', alt: 'salesforce logo', scale: 1.2 },
        { href: companyLinks.amazon, src: '/amazon.svg', alt: 'Amazon logo' },
        { href: companyLinks.microsoft, src: '/microsoft.svg', alt: 'microsoft logo', scale: 0.82 },
        { href: companyLinks.apple, src: '/apple.png', alt: 'apple logo', scale: 1.1 },
        { href: companyLinks.nasa, src: '/nasa.png', alt: 'nasa logo' },
        { href: companyLinks.sequoia, src: '/sequoia.png', alt: 'sequoia logo' },
        { href: companyLinks.atlassian, src: '/atlassian.png', alt: 'atlassian logo' },
        { href: companyLinks.goldman, src: '/goldman.png', alt: 'goldman sachs logo', scale: 1.2 },
    ];
    // Row 1: full list as-is. Row 2: full list rotated by half so it's offset.
    const half = Math.floor(alumniLogos.length / 2);
    const alumniLogosRow1 = alumniLogos;
    const alumniLogosRow2 = alumniLogos.slice(half).concat(alumniLogos.slice(0, half));

    // Sponsors get the same two-row treatment as alumni: row 1 scrolls one way,
    // row 2 the other, phase-rotated by half so the rows stay offset.
    const sponsorHalf = Math.floor(sponsorLogos.length / 2);
    const sponsorLogosRow1 = sponsorLogos;
    const sponsorLogosRow2 = sponsorLogos.slice(sponsorHalf).concat(sponsorLogos.slice(0, sponsorHalf));

    // Design toggle. true  -> animated horizontal marquee (current design).
    //                false -> original static responsive grid (revert path).
    const HORIZONTAL_MARQUEE = true;

    // Hero shimmer grid: small squares that glimmer at RANDOM (not a diagonal
    // sweep). The grid must fill its WHOLE box, so we measure the box and render
    // exactly rows*cols cells for the current size (a fixed count leaves the box
    // half-empty at large sizes). HERO_CELL/HERO_GAP must match the CSS below.
    const HERO_CELL = 30; // px square
    const HERO_GAP = 5;   // px gap
    const heroGridRef = React.useRef(null);
    const [heroCount, setHeroCount] = useState(0);
    useEffect(() => {
      const el = heroGridRef.current;
      if (!el) return;
      const step = HERO_CELL + HERO_GAP;
      const recount = () => {
        // ceil (not floor) + extra rows so we OVER-fill: the grid is bottom-
        // anchored and clips overflow, so extra top rows get clipped rather than
        // leaving an empty band. Guarantees a gap-free fill even if the box grows
        // a bit after this measurement (fonts loading, layout settling, etc.).
        const cols = Math.max(0, Math.ceil((el.clientWidth + HERO_GAP) / step));
        const rows = Math.max(0, Math.ceil((el.clientHeight + HERO_GAP) / step)) + 2;
        setHeroCount(cols * rows);
      };
      recount();
      if (typeof ResizeObserver === 'undefined') return;
      const ro = new ResizeObserver(recount);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);
    // Stable pool of random delay/duration values (generated once). Cells slice
    // from it by index, so changing the count on resize never reshuffles the
    // squares that were already on screen (which would look like a flicker).
    const heroPool = useMemo(
      () =>
        Array.from({ length: 3000 }, () => ({
          delay: (Math.random() * 6).toFixed(2),
          duration: (2.5 + Math.random() * 3).toFixed(2),
        })),
      []
    );
    const heroCells = heroPool.slice(0, heroCount);

    // Subtle photo parallax: as the cursor moves inside the yellow panel, nudge
    // the hero image toward the cursor. We write the offset straight to CSS
    // variables via refs (NOT React state) so moving the mouse doesn't re-render
    // the component — a re-render would disturb the shimmer grid.
    //
    // Responsiveness: (1) the panel rect is cached on enter instead of measured
    // every move (getBoundingClientRect forces layout); (2) writes are batched
    // into a single requestAnimationFrame so we touch the DOM at most once per
    // frame; (3) the CSS transition is short (see .hero-photo) so the image
    // tracks the cursor closely rather than easing behind it.
    const heroPanelRef = React.useRef(null);
    const heroPhotoRef = React.useRef(null);
    const heroRectRef = React.useRef(null);
    const heroRafRef = React.useRef(0);
    const HERO_PHOTO_SHIFT = 22; // max px the photo drifts from center
    const handleHeroMouseEnter = () => {
      if (heroPanelRef.current) heroRectRef.current = heroPanelRef.current.getBoundingClientRect();
    };
    const handleHeroMouseMove = (e) => {
      const photo = heroPhotoRef.current;
      const r = heroRectRef.current;
      if (!photo || !r) return;
      const cx = e.clientX;
      const cy = e.clientY;
      if (heroRafRef.current) return; // already have a frame queued this tick
      heroRafRef.current = requestAnimationFrame(() => {
        heroRafRef.current = 0;
        // -1..1 relative to panel center.
        const nx = ((cx - r.left) / r.width - 0.5) * 2;
        const ny = ((cy - r.top) / r.height - 0.5) * 2;
        photo.style.setProperty('--hero-photo-x', `${(nx * HERO_PHOTO_SHIFT).toFixed(1)}px`);
        photo.style.setProperty('--hero-photo-y', `${(ny * HERO_PHOTO_SHIFT).toFixed(1)}px`);
      });
    };
    const handleHeroMouseLeave = () => {
      const photo = heroPhotoRef.current;
      if (heroRafRef.current) { cancelAnimationFrame(heroRafRef.current); heroRafRef.current = 0; }
      if (!photo) return;
      photo.style.setProperty('--hero-photo-x', '0px');
      photo.style.setProperty('--hero-photo-y', '0px');
    };

    return(
<div id="container" className="home-container has-lineart">
<LineArtBackground className="lineart--bottom" />

<div id="landinganimation" className="hero">
  <div
    className="hero-panel"
    ref={heroPanelRef}
    onMouseEnter={handleHeroMouseEnter}
    onMouseMove={handleHeroMouseMove}
    onMouseLeave={handleHeroMouseLeave}
  >
    {/* Yellow shimmer grid — small squares glimmering at random (each cell has
        its own randomized delay + duration, so it twinkles rather than sweeps
        diagonally). See heroCells above. */}
    <div className="hero-grid" aria-hidden="true" ref={heroGridRef}>
      {heroCells.map((c, i) => (
        <span
          key={i}
          className="hero-grid__cell"
          style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.duration}s` }}
        />
      ))}
    </div>

    <div className="hero-photo" ref={heroPhotoRef}>
      <img src="/hpl5.jpg" alt="Harvard Product Lab members" />
    </div>

    <div className="hero-panel-content">
      <h1 className="hero-wordmark">HPL</h1>
      <div className="hero-lockup">
        <p className="hero-eyebrow">Harvard Product Lab</p>
        <p className="hero-tagline">Student ideas turned into real product.</p>
        <div className="hero-cta">
          <Button variant={null} className="btn-primary-plab" href="/getinvolved">Get involved &#8599;</Button>
          <Button variant={null} className="btn-secondary-plab" href="/clients">Partner with us &#8599;</Button>
        </div>
      </div>
    </div>
  </div>
</div>


{/* ===== EDIT STATS HERE: change the number + label in each Col ===== */}
<section className="stats-band feature-block">
<Row xs={2} md={4} className="g-4 justify-content-center">
<Col className="stat"><div className="stat-num">300+</div><div className="stat-label">Alumni</div></Col>
<Col className="stat"><div className="stat-num">20+</div><div className="stat-label">partner companies</div></Col>
<Col className="stat"><div className="stat-num">12-wk</div><div className="stat-label">PM bootcamp</div></Col>
<Col className="stat"><div className="stat-num">6-8</div><div className="stat-label">members per team</div></Col>
</Row>
</section>

{/* Feature sections: staggered justified text with an alternating side photo
    (left / right / left) and a large section title that scrolls horizontally
    behind the row, tucking under the photo as it passes. */}
<section className="feature-row photo-left">
  <FeatureHeadingWall text="Who We Are" />
  <div className="feature-content">
    <div className="feature-photo">
      <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6}><Image src="/hpl5.jpg" alt="Product Lab members" className="feature-img" /></Tilt>
    </div>
    <Fade bottom>
    <div className="feature-text">
      <p id="homep">Launched in 2021, Product Lab is Harvard&apos;s premier product management organization. Through training programs, real-world product experience, and industry mentorship, we introduce product management to problem-solvers from all backgrounds and help them grow into future product leaders.</p>
      <div className="feature-cta"><Button id="button" href="/getinvolved">Get involved</Button></div>
    </div>
    </Fade>
  </div>
</section>

<section className="feature-row photo-right">
  <FeatureHeadingWall text="For Companies" />
  <div className="feature-content">
    <div className="feature-photo">
      <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6}><Image src="/teamleadmeeting.JPG" alt="Product Lab case team meeting" className="feature-img" /></Tilt>
    </div>
    <Fade bottom>
    <div className="feature-text">
      <p id="homep">Each semester, Product Lab collaborates with 2-3 corporate partners to complete product-focused projects over the course of the semester. Sometimes, projects entail Product Lab designing and documenting entire products and features from scratch. Other times, Product Lab conducts user research and usability testing to help improve existing products.</p>
      <p id="homep">As a corporate partner, you will be given a team of 6-8 Product Lab team members. All teams contain several APMs, one to two SPMs, and one Case Team Lead. All Product Lab team members have successfully completed a 12-week PM bootcamp led by industry leaders, and many have prior PM internship experience.</p>
      <div className="feature-cta"><Button id="button" href="/clients">Learn more</Button></div>
    </div>
    </Fade>
  </div>
</section>

<section className="feature-row photo-left">
  <FeatureHeadingWall text="For Students" />
  <div className="feature-content">
    <div className="feature-photo">
      <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6}><Image src="/hpl6.jpg" alt="Product Lab students social" className="feature-img" /></Tilt>
    </div>
    <Fade bottom>
    <div className="feature-text">
      <p id="homep">Our mission is to increase access to product education and help students from all backgrounds break into PM.</p>
      <p id="homep">As a Product Lab member, you&apos;ll gain industry experience, receive exclusive career resources, build a portfolio of product projects, and access a growing community of peers, mentors, and employers.</p>
      <div className="feature-cta"><Button id="button" href="/students">Learn more</Button></div>
    </div>
    </Fade>
  </div>
</section>

<div id="divmesomespacesmall"></div>

<section className="feature-block">
  <h1 className="center bold">HPL Sponsors and Past Clients include...</h1>
  <div id="divmesomespacesmall"></div>
  {HORIZONTAL_MARQUEE ? (
    <>
      <LogoMarquee logos={sponsorLogosRow1} duration={70} />
      <LogoMarquee logos={sponsorLogosRow2} reverse duration={70} />
    </>
  ) : (
  <Row xs={1} sm={1} md={2} lg={2} xl={4} className="g-5 align-items-center">

  <Col>
  <ExternalLink href={companyLinks.rocketblocks}><div id="sponsor"><Image src="/rocketblocks.svg" alt="RocketBlocks logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.grammarly}><div id="sponsor"><Image src="/grammarly.png" alt="Grammarly logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.webex}><div id="sponsor"><Image src="/webex.png" alt="Webex logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
      <h2 id="sponsor" className="center bold">And many more...</h2>
  </Col>

  </Row>
  )}
</section>

<section className="feature-block">
  <h1 className="center bold">HPL Alumni work at places like...</h1>
  <div id="divmesomespacesmall"></div>
  {HORIZONTAL_MARQUEE ? (
    <>
      <LogoMarquee logos={alumniLogosRow1} duration={60} />
      <LogoMarquee logos={alumniLogosRow2} reverse duration={60} />
    </>
  ) : (
  <Row xs={1} sm={1} md={2} lg={2} xl={4} className="g-5 align-items-center">

  <Col>
    <ExternalLink href={companyLinks.microsoft}><div id="sponsor"><Image src="/microsoft.svg" alt="microsoft logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.nasa}><div id="sponsor"><Image src="/nasa.png" alt="nasa logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.accenture}><div id="sponsor"><Image src="/accenture.png" alt="accenture logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.sequoia}><div id="sponsor"><Image src="/sequoia.png" alt="sequoia logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.atlassian}><div id="sponsor"><Image src="/atlassian.png" alt="atlassian logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.apple}><div id="sponsor"><Image src="/apple.png" alt="apple logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.salesforce}><div id="sponsor"><Image src="/salesforce.png" alt="salesforce logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  <Col>
    <ExternalLink href={companyLinks.goldman}><div id="sponsor"><Image src="/goldman.png" alt="goldman sachs logo" id="rocketblocks"></Image></div></ExternalLink>
  </Col>

  </Row>
  )}
  <p className="logo-disclaimer center">Selected clients and alumni placements.<br />HPL does not disclose client or alumni information without express consent.</p>
</section>
{/*
<section id="homesection">
<Fade bottom>
<h1 className="center bold">Featured Blog Posts</h1>
</Fade>
<div id="divmesomespacesmall" />
<Container fluid>
<Row xs={1} sm={1} md={2} lg={3} xl={4} className="g-5 align-items-center">
{data.posts.map(post => (
    <Col key={post.id} id="padblog">
    <div id="centereddiv2">
    <Tilt style={{ height: 250, width: 250 }}>
    <Link className="App-link" to={`/blog/post/${post.slug}`}>
    <Card style={{"height" : '120%', width: '18rem' }} id="shadowy">
    <Card.Img variant="top" src={post.feature_image} />
    <Card.Body>
    <Card.Title>
        <p id="blogtitlefont">{post.title}</p>
    </Card.Title>
    <Card.Text>
    <a id="cardtextfont">Posted: <Moment format="MMM DD, YYYY">{post.updated_at}</Moment></a>
    </Card.Text>
    </Card.Body>
    </Card>
    </Link>
    </Tilt>
    </div>
    </Col>
    ))}
</Row>
</Container>
</section> */}
</div>
    )
}

export default Home;
