import React from 'react';
import './App.css';

// Sparse, elegant decorative line-art. ONE non-repeating SVG that covers the
// whole hosting container as a single piece — NO tiles, so there are no seams
// to slice curves mid-page (and zooming out can't reveal more). Every curve is
// drawn so its endpoints sit beyond the viewBox edges; with preserveAspectRatio
// "slice" the SVG scales to cover the container (cropping the overflow), so the
// ends are always clipped off-screen rather than terminating in view. Purely
// decorative: aria-hidden + pointer-events:none.
//
// preserveAspectRatio="none" stretches the viewBox to exactly fill the
// container (whatever its aspect/height), so the chosen ribbons are ALWAYS on
// screen at any zoom — while their endpoints, drawn beyond the viewBox, still
// run off the edges. non-scaling-stroke keeps the line weight even.
//
// Usage: put `has-lineart` on a whole-PAGE container and drop
// <LineArtBackground /> inside as the first child. Pass className
// "lineart--bottom" to reveal the art only across the lower region of the page.
const LineArtBackground = ({ className = '' }) => (
    <div className={`lineart${className ? ` ${className}` : ''}`} aria-hidden="true">
        <svg
            className="lineart__svg"
            viewBox="0 0 1440 1800"
            preserveAspectRatio="none"
            fill="none"
        >
            {/* Two ribbons total — one horizontal, one vertical — each with a
                graceful loop, drawn to enter and exit beyond the viewBox edges
                so no end shows. Sparse and calm rather than busy. */}
            <path
                className="lineart__stroke"
                d="M-120 1080 C 260 940, 470 1160, 470 1000 C 470 890, 340 900, 380 1020 C 420 1140, 720 1180, 1000 1080 C 1240 994, 1360 1220, 1560 1080"
            />
            <path
                className="lineart__stroke"
                d="M1230 -120 C 1080 260, 1320 520, 1200 840 C 1110 1080, 1110 960, 1230 1000 C 1350 1040, 1240 1260, 1160 1480 C 1090 1670, 1240 1780, 1180 1920"
            />
        </svg>
    </div>
);

export default LineArtBackground;
