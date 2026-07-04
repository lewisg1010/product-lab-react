import React, { useEffect, useState } from 'react';
import './App.css';

// Sparse, elegant decorative line-art. ONE non-repeating SVG that covers the
// whole hosting container as a single piece — NO tiles, so there are no seams.
// preserveAspectRatio="none" stretches the viewBox to EXACTLY fill the container
// at any size/zoom, so anything outside the 0-1440 x 0-1800 viewBox is always
// clipped off-screen. EVERY ribbon enters at x=-160 and exits at x=1600 (off the
// left/right edges), so no line ever terminates on screen at any zoom — hence no
// edge fade is needed. Purely decorative (aria-hidden + pointer-events:none),
// full-strength brand-yellow stroke (see .lineart__stroke).
//
// ELEGANCE MODEL: each page is ONE flowing ribbon that travels DIAGONALLY across
// the canvas (corner-to-corner), with one or two loops of DIFFERENT sizes curled
// into the line — never a row of identical loops. The ribbon is a smooth
// Catmull-Rom spline through hand-placed waypoints, so it reads as a single
// continuous gesture that leads the eye. `loop()` injects a ring of points to
// curl the spline back on itself; varying its radius/turns changes the flourish.

const R = Math.round;

// Ring of points tracing `turns` revolutions around (cx,cy) at radius r. Splined
// together with the surrounding waypoints this becomes a self-crossing loop that
// flows into and out of the ribbon. `dir` flips the curl; a0 sets where it opens.
const loop = (cx, cy, r, turns = 1.12, dir = -1, a0 = Math.PI * 0.92) => {
    const steps = Math.max(7, Math.round(turns * 10));
    const pts = [];
    for (let i = 0; i <= steps; i++) {
        const a = a0 + dir * 2 * Math.PI * turns * (i / steps);
        pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return pts;
};

// Smooth cubic path through all waypoints (Catmull-Rom -> Bézier). Endpoints are
// clamped, and since they sit off-screen the ribbon enters/exits cleanly.
const spline = (pts) => {
    const P = (i) => pts[Math.max(0, Math.min(pts.length - 1, i))];
    let d = `M ${R(pts[0][0])} ${R(pts[0][1])}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const [x0, y0] = P(i - 1);
        const [x1, y1] = P(i);
        const [x2, y2] = P(i + 1);
        const [x3, y3] = P(i + 2);
        const c1x = x1 + (x2 - x0) / 6;
        const c1y = y1 + (y2 - y0) / 6;
        const c2x = x2 - (x3 - x1) / 6;
        const c2y = y2 - (y3 - y1) / 6;
        d += ` C ${R(c1x)} ${R(c1y)}, ${R(c2x)} ${R(c2y)}, ${R(x2)} ${R(y2)}`;
    }
    return d;
};

// One elegant diagonal ribbon per page. Each differs in travel direction, where
// it loops, and the loop sizes — so no two pages look alike.
const VARIANTS = {
    // Home (bottom): low ribbon rising gently L->R with one medium loop.
    // Shifted down ~320 (about half the ribbon's own height) to sit lower.
    flow: spline([
        [-160, 1840], [180, 1760], [430, 1670],
        ...loop(610, 1570, 74, 1.12, -1),
        [910, 1460], [1190, 1350], [1600, 1200],
    ]),
    // Clients (bottom): low ribbon with a SMALL loop then a BIG loop (varied).
    // Shifted down ~450 to sit low on the page.
    loops: spline([
        [-160, 1660], [170, 1705], [360, 1660],
        ...loop(505, 1600, 46, 1.10, -1),
        [670, 1590],
        ...loop(940, 1625, 96, 1.12, 1),
        [1250, 1510], [1600, 1400],
    ]),
    // Students (full): steep diagonal from top-left plunging to bottom-right,
    // with the loop up near the start so the eye enters on the flourish.
    swirl: spline([
        [-160, 240], [210, 350],
        ...loop(430, 450, 66, 1.14, -1),
        [700, 660], [980, 880], [1260, 1080], [1600, 1280],
    ]),
    // About (full): one LARGE calm loop mid-page on a gently descending diagonal.
    orbit: spline([
        [-160, 600], [270, 650],
        ...loop(610, 730, 122, 1.08, -1),
        [1000, 830], [1290, 920], [1600, 1010],
    ]),
    // Get involved (full): a rising S-shaped ribbon, one loop at the crest.
    waves: spline([
        [-160, 1070], [230, 930], [480, 1000],
        ...loop(700, 930, 68, 1.12, 1),
        [950, 840], [1210, 720], [1600, 580],
    ]),
    // FAQs (full): descending diagonal that spirals inward — a big loop then a
    // smaller one nested near it, tightening like a spiral.
    spiral: spline([
        [-160, 360], [250, 450], [520, 545],
        ...loop(715, 615, 86, 1.0, -1),
        ...loop(705, 605, 44, 1.05, -1),
        [1020, 800], [1290, 910], [1600, 1040],
    ]),
    // Apply (full): a ribbon that climbs bottom-left -> top-right with a big loop
    // early and a small one late, so it lifts the eye upward through the page.
    arc: spline([
        [-160, 1400], [220, 1320],
        ...loop(470, 1210, 104, 1.10, 1),
        [780, 1010], [1010, 860],
        ...loop(1180, 730, 52, 1.12, -1),
        [1380, 560], [1600, 420],
    ]),
};

const LineArtBackground = ({ className = '', variant = 'flow' }) => {
    const d = VARIANTS[variant] || VARIANTS.flow;
    // Draw-in reveal, kept in React state so a parent re-render (e.g. Home's
    // async blog fetch) re-applies it rather than wiping it mid-animation.
    const [drawn, setDrawn] = useState(false);
    const [reduce, setReduce] = useState(false);

    useEffect(() => {
        const prefersReduce = !!(window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        setReduce(prefersReduce);
        setDrawn(false);
        if (prefersReduce) return;
        // Next frame: flip `drawn` so the clip-path transitions from fully
        // clipped (line hidden) to fully open (line revealed) left-to-right.
        const raf = requestAnimationFrame(() => setDrawn(true));
        return () => cancelAnimationFrame(raf);
    }, [d]);

    // Draw-in via a CLIP-PATH WIPE rather than stroke-dash. The path uses BOTH
    // vector-effect:non-scaling-stroke (dashes render in screen-pixel space) and
    // preserveAspectRatio="none" (non-uniform x/y stretch) — that combination
    // makes stroke-dasharray/offset (even with pathLength=1) unreliable, so the
    // reveal kept stopping partway. clip-path insets are percentages of the SVG's
    // own box, immune to both, so this reveals the whole ribbon every time. All
    // variants travel left->right across the canvas, so wiping the right inset
    // 100% -> 0 uncovers the line progressively left to right, reading as a draw.
    const svgStyle = {
        clipPath: reduce || drawn ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        WebkitClipPath: reduce || drawn ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        transition: reduce ? 'none' : 'clip-path 2.4s var(--ease-standard), -webkit-clip-path 2.4s var(--ease-standard)',
    };

    return (
        <div className={`lineart${className ? ` ${className}` : ''}`} aria-hidden="true">
            <svg
                className="lineart__svg"
                viewBox="0 0 1440 1800"
                preserveAspectRatio="none"
                fill="none"
                style={svgStyle}
            >
                <path className="lineart__stroke" d={d} />
            </svg>
        </div>
    );
};

export default LineArtBackground;
