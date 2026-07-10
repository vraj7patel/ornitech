import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../imges/IMG_3816.PNG";

const navLinks = [
  // { label: "AI Chatbot", href: "#", badge: "New" },
  { label: "Home", href: "/" },
  // { label: "Work", href: "#" },
  // { label: "Services", href: "#" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  // { label: "Our Partners", href: "#" },
];

// Quick-access suggestions shown before the user types anything
const SUGGESTIONS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  // { label: "Our Services", href: "#" },
  // { label: "AI Chatbot", href: "#" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ── Search state ─────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : SUGGESTIONS;

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setQuery("");
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      // small delay so the CSS animation doesn't fight autofocus
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  // Prevent body scroll when search is open
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ── Header Bar ────────────────────────────────────────── */}
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
                      {link.badge && <span className="ot-nav-badge">{link.badge}</span>}
                    </Link>
                  ) : (
                    <a href={link.href} className="ot-nav-link">
                      {link.label}
                      {link.badge && <span className="ot-nav-badge">{link.badge}</span>}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="ot-header-right">
            {/* Search button */}
            <button
              className="ot-icon-btn ot-search-btn"
              aria-label="Search"
              onClick={openSearch}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Login */}
            <Link to="/login" className="ot-login-btn">Login</Link>

            {/* Hamburger (mobile) */}
            <button
              className={`ot-hamburger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>

            {/* Profile / Account (mobile) */}
            <Link to="/login" className="ot-icon-btn ot-profile-btn" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>

      </header>

      {/* Mobile Drawer — outside <header> so backdrop-filter works */}
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
          <a
            href="#contact"
            className="ot-cta-btn"
            style={{ marginTop: "12px", width: "100%", justifyContent: "center" }}
          >
            Start Free Trial →
          </a>
        </div>
      )}

      {/* ── Search Overlay ─────────────────────────────────────── */}
      <div
        className={`ot-search-overlay${searchOpen ? " open" : ""}`}
        aria-hidden={!searchOpen}
      >
        {/* Backdrop — click to close */}
        <div className="ot-search-backdrop" onClick={closeSearch} />

        {/* Search Modal */}
        <div className="ot-search-modal">
          {/* Input row */}
          <div className="ot-search-input-row">
            {/* Search icon inside input */}
            <svg className="ot-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              className="ot-search-input"
              placeholder="Search anything…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />

            {/* Clear button — shown when there's text */}
            {query && (
              <button
                className="ot-search-clear"
                onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                aria-label="Clear"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Escape to close hint */}
            <kbd className="ot-search-esc" onClick={closeSearch}>Esc</kbd>
          </div>

          {/* Divider */}
          <div className="ot-search-divider" />

          {/* Results / Suggestions */}
          <div className="ot-search-results">
            <p className="ot-search-section-label">
              {query ? `Results for "${query}"` : "Quick Links"}
            </p>

            {filtered.length > 0 ? (
              filtered.map((item) => (
                item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="ot-search-result-item"
                    onClick={closeSearch}
                  >
                    <span className="ot-search-result-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="ot-search-result-item"
                    onClick={closeSearch}
                  >
                    <span className="ot-search-result-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    {item.label}
                  </a>
                )
              ))
            ) : (
              <p className="ot-search-empty">No results found for &ldquo;{query}&rdquo;</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
