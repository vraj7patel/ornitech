import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../imges/IMG_3816.PNG";

const navLinks = [
  { label: "AI Chatbot", href: "#", badge: "New" },
  { label: "Work", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "/contact" },
  { label: "Our Partners", href: "#" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled styling threshold
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
        setMobileOpen(false); // also close mobile menu if scrolling down
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`ot-header${scrolled ? " scrolled" : ""}${visible ? "" : " hidden"}`}>
      <div className="ot-header-inner">
        {/* Logo */}
        <Link to="/" className="ot-logo">
          <img src={logo} alt="Ornitech" className="ot-logo-img" />
          <span className="ot-logo-text">Ornitech</span>
        </Link>

        {/* Center Nav */}
        <nav className="ot-nav">
          <ul className="ot-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link to={link.href} className="ot-nav-link">
                    {link.label}
                    {link.badge && (
                      <span className="ot-nav-badge">{link.badge}</span>
                    )}
                  </Link>
                ) : (
                  <a href={link.href} className="ot-nav-link">
                    {link.label}
                    {link.badge && (
                      <span className="ot-nav-badge">{link.badge}</span>
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="ot-header-right">
          {/* Wishlist / Heart */}
          <button className="ot-icon-btn ot-heart-btn" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          {/* Search */}
          <button className="ot-icon-btn ot-search-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Login */}
          <button className="ot-login-btn">Login</button>

          {/* CTA */}
          <a href="#contact" className="ot-cta-btn">
            Start Free Trial
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Hamburger (mobile) */}
          <button
            className={`ot-hamburger${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          {/* Profile / Account (mobile) */}
          <button className="ot-icon-btn ot-profile-btn" aria-label="Account">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="ot-mobile-menu">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                to={link.href}
                className="ot-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.badge && <span className="ot-nav-badge">{link.badge}</span>}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="ot-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
                {link.badge && <span className="ot-nav-badge">{link.badge}</span>}
              </a>
            )
          )}
          <a href="#contact" className="ot-cta-btn" style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}>
            Start Free Trial →
          </a>
        </div>
      )}
    </header>
  );
}
