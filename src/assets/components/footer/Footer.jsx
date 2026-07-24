import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      {/* Background ambient glowing shapes */}
      <div className="footer-glow-glow" />

      {/* Flowing background contour lines — Ordered: Blue -> Purple -> Green/Teal */}
      <div className="footer-wave-lines">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* 1. Sky Blue Cyan — #38bdf8 */}
          <path d="M-100 100 C 300 220, 600 -40, 1000 160 C 1200 260, 1500 80, 1650 280" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.55" />
          {/* 2. Periwinkle Indigo Blue — #818cf8 */}
          <path d="M-50 220 C 400 30, 700 380, 1100 80 C 1300 180, 1550 420, 1650 180" stroke="#818cf8" strokeWidth="2.2" strokeOpacity="0.5" />
          {/* 3. Magenta Purple — #c084fc */}
          <path d="M-150 380 C 200 480, 500 140, 900 420 C 1200 520, 1450 220, 1600 480" stroke="#c084fc" strokeWidth="2.2" strokeOpacity="0.5" />
          {/* 4. Pink Purple — #e879f9 */}
          <path d="M-100 480 C 350 280, 800 580, 1200 280 C 1350 480, 1500 320, 1600 580" stroke="#e879f9" strokeWidth="1.8" strokeOpacity="0.4" />
          {/* 5. Emerald Green / Teal — #14b8a6 */}
          <path d="M-80 40 C 250 320, 650 80, 1050 320 C 1250 440, 1400 120, 1550 280" stroke="#14b8a6" strokeWidth="2" strokeOpacity="0.45" />
        </svg>
      </div>


      <div className="footer-container">
        {/* Top Section: CTA + Socials + Columns */}
        <div className="footer-top-grid">
          {/* Left CTA & Socials */}
          <motion.div
            className="footer-cta-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Social Pill Icons — GitHub, Instagram, LinkedIn */}
            <div className="social-pill-bar">
              <a href="#github" aria-label="GitHub" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
            </div>

            {/* Big Headline */}
            <div className="cta-headline">
              <h2 className="cta-main-title">Book Now!</h2>
              <h3 className="cta-sub-title">Your Free Consultation Call.</h3>
            </div>

            {/* Action Button */}
            <div className="cta-btn-wrap">
              <Link to="/contact" className="cta-free-btn">
                <span>Book a Free call</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Giant Brand Typography — slide up from below */}
        <div className="giant-brand-wrapper">
          <motion.span
            className="giant-brand-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            ornitech
          </motion.span>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <p>Copyright © {new Date().getFullYear()} by Ornitech. All rights reserved.</p>
          </div>
          <div className="bottom-right">
            <a href="#terms">Terms & Conditions</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookie">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
