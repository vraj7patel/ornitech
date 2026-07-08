import React from "react";
import { Team } from "../home page/Team/Team.jsx";
import { Testimonials } from "../home page/Testimonials/Testimonials.jsx";
import "./AboutUs.css";

export function AboutUs() {
  return (
    <main className="about-page">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-hero-badge">Who We Are</span>
          <h1 className="about-hero-title">
            Building the Future <br />
            <span className="about-hero-accent">with Intelligent Tech</span>
          </h1>
          <p className="about-hero-sub">
            Ornitech is a team of passionate engineers, designers, and thinkers
            on a mission to make AI accessible, beautiful, and impactful — for
            businesses of every size, everywhere in the world.
          </p>
          <div className="about-hero-stats">
            <div className="about-stat">
              <span className="about-stat-num">50+</span>
              <span className="about-stat-label">Projects Delivered</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-num">12+</span>
              <span className="about-stat-label">Countries Served</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat">
              <span className="about-stat-num">98%</span>
              <span className="about-stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision cards ───────────────────────────── */}
      {/* <section className="about-mission">
        <div className="about-mission-grid">
          <div className="about-mission-card">
            <div className="about-mission-icon">🚀</div>
            <h3 className="about-mission-card-title">Our Mission</h3>
            <p className="about-mission-card-text">
              To democratize artificial intelligence by building tools and
              platforms that are intuitive, reliable, and built for real-world
              impact — not just demos.
            </p>
          </div>
          <div className="about-mission-card">
            <div className="about-mission-icon">🌍</div>
            <h3 className="about-mission-card-title">Our Vision</h3>
            <p className="about-mission-card-text">
              A world where every business — from solo founders to global
              enterprises — can harness the power of AI to move faster, decide
              smarter, and grow further.
            </p>
          </div>
          <div className="about-mission-card">
            <div className="about-mission-icon">🤝</div>
            <h3 className="about-mission-card-title">Our Values</h3>
            <p className="about-mission-card-text">
              Transparency, excellence, and relentless curiosity. We treat every
              partner like a co-founder and every product like it's our own.
            </p>
          </div>
        </div>
      </section> */}

      {/* ── Team Section ────────────────────────────────────── */}
      <Team />

      {/* ── Testimonials Section ────────────────────────────── */}
      <Testimonials />

    </main>
  );
}
