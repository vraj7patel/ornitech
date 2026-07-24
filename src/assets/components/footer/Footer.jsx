import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      {/* Background ambient glowing shapes */}
      <div className="footer-glow-glow" />

      {/* Flowing background contour lines */}
      <div className="footer-wave-lines">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-100 100 C 300 220, 600 -40, 1000 160 C 1200 260, 1500 80, 1650 280" stroke="rgba(255, 94, 54, 0.22)" strokeWidth="1.8" />
          <path d="M-50 220 C 400 30, 700 380, 1100 80 C 1300 180, 1550 420, 1650 180" stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1.8" />
          <path d="M-150 380 C 200 480, 500 140, 900 420 C 1200 520, 1450 220, 1600 480" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
          <path d="M-100 480 C 350 280, 800 580, 1200 280 C 1350 480, 1500 320, 1600 580" stroke="rgba(192, 132, 252, 0.15)" strokeWidth="1.5" />
          <path d="M-80 40 C 250 320, 650 80, 1050 320 C 1250 440, 1400 120, 1550 280" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.2" />
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
            {/* Social Pill Icons */}
            <div className="social-pill-bar">
              <a href="#youtube" aria-label="YouTube" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#behance" aria-label="Behance" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.104 0-5.478-2.198-5.478-5.475 0-3.278 2.374-5.525 5.478-5.525 3.589 0 5.2 2.607 4.966 5.882h-7.794c.058 1.48.966 2.476 2.664 2.476 1.47 0 2.274-.693 2.585-1.611h2.305zm-4.766-5.45c-1.378 0-2.193.83-2.392 2.008h4.747c-.042-1.127-.887-2.008-2.355-2.008zm-10.96-5.55h-8v14h7.917c3.125 0 5.083-1.604 5.083-4.083 0-1.785-1.077-3.003-2.479-3.483 1.134-.48 2.015-1.579 2.015-3.094 0-2.102-1.624-3.34-4.536-3.34zm-4.606 2.5h3.18c1.328 0 2.083.568 2.083 1.545 0 .978-.755 1.564-2.083 1.564h-3.18v-3.109zm0 5.609h3.407c1.472 0 2.293.633 2.293 1.705 0 1.073-.821 1.745-2.293 1.745h-3.407v-3.45z"/>
                </svg>
              </a>
              <a href="#twitter" aria-label="X" className="social-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#github" aria-label="GitHub" className="social-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
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

          {/* Right Navigation Columns */}
          <motion.div
            className="footer-nav-cols"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Col 1 */}
            <div className="nav-col">
              <h4 className="nav-col-heading">Browse</h4>
              <ul>
                <li><a href="#work">Work</a></li>
                <li><Link to="/about">About</Link></li>
                <li><a href="#why-ornitech">Why Ornitech</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="nav-col">
              <h4 className="nav-col-heading">Resources</h4>
              <ul>
                <li><a href="#careers">Careers</a></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#sitemap">Sitemap</a></li>
                <li><a href="#ornitech-ai">Ornitech AI</a></li>
              </ul>
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
