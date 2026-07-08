import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../imges/IMG_3816.PNG';
import './MobileFooterDock.css';

export function MobileFooterDock() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Bottom Bar (Mobile/Tablet only) */}
      <div className="mobile-dock-container">
        <div className="mobile-dock">
          {/* Brand/Logo */}
          <Link to="/" className="mobile-dock-brand">
            <img src={logo} alt="Ornitech" className="mobile-dock-logo-img" />
            <span className="mobile-dock-logo-text">Ornitech</span>
          </Link>

          {/* Action Icons */}
          <div className="mobile-dock-actions">
            {/* Heart / Favorites Icon */}
            <button className="mobile-dock-btn" aria-label="Favorites">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>

            {/* Hamburger Menu Icon */}
            <button 
              className={`mobile-dock-btn mobile-dock-hamburger ${menuOpen ? 'open' : ''}`} 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            {/* User Profile Icon */}
            <button className="mobile-dock-btn" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-up Menu Drawer from the bottom */}
      <div className={`mobile-dock-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-dock-drawer-overlay" onClick={() => setMenuOpen(false)} />
        <div className="mobile-dock-drawer-content">
          <div className="mobile-dock-drawer-handle" />
          <nav className="mobile-dock-drawer-nav">
            <a href="#chatbot" onClick={() => setMenuOpen(false)}>
              AI Chatbot <span className="ot-nav-badge">New</span>
            </a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <a href="#partners" onClick={() => setMenuOpen(false)}>Our Partners</a>
            <hr className="mobile-dock-drawer-divider" />
            <a href="#login" className="mobile-dock-drawer-login" onClick={() => setMenuOpen(false)}>Login</a>
            <a href="#contact" className="ot-cta-btn mobile-dock-drawer-cta" onClick={() => setMenuOpen(false)}>
              Start Free Trial
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
