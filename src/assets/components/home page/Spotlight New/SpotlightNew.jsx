import React from "react";
import "./SpotlightNew.css";

/**
 * Spotlight — replicates the Aceternity UI "Spotlight New" component.
 * Two animated conic/radial gradient spotlights sweep across a dark background.
 * No Tailwind, no framer-motion, no external deps — pure CSS animation.
 *
 * Props:
 *  gradientFirst  – color of the left spotlight  (default: indigo/purple)
 *  gradientSecond – color of the right spotlight (default: blue/indigo)
 *  translateY     – vertical offset of spotlights (default: -350)
 */
export function Spotlight({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210,100%,85%,0.08) 0%, hsla(210,100%,55%,0.04) 50%, hsla(210,100%,45%,0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210,100%,85%,0.06) 0%, hsla(210,100%,55%,0.02) 60%, transparent 100%)",
  translateY = -350,
}) {
  return (
    <div
      className="spotlight-container"
      aria-hidden="true"
      style={{ "--translate-y": `${translateY}px` }}
    >
      {/* Left spotlight */}
      <div className="spotlight-left">
        <div className="spotlight-blob-1" style={{ background: gradientFirst }} />
        <div className="spotlight-blob-2" style={{ background: gradientSecond }} />
      </div>

      {/* Right spotlight */}
      <div className="spotlight-right">
        <div className="spotlight-blob-1" style={{ background: gradientFirst }} />
        <div className="spotlight-blob-2" style={{ background: gradientSecond }} />
      </div>
    </div>
  );
}

/**
 * SpotlightNewDemo — the full demo section exactly matching Aceternity UI.
 */
export function SpotlightNewDemo() {
  return (
    <div className="spotlight-wrapper">
      {/* The spotlights */}
      <Spotlight />

      {/* Content */}
      <div className="spotlight-content">
        <h1 className="spotlight-heading">
          Spotlight is the new
          <br />
          <span className="spotlight-heading-accent">black.</span>
        </h1>
        <p className="spotlight-subtext">
          A subtle yet effective spotlight effect, because the previous version
          is used a bit too much these days.
        </p>
      </div>
    </div>
  );
}
