import React, { useState } from "react";
import "./ContactUs.css";
import { WorldMap } from "./WorldMap.jsx";

export function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Pulse lines flow straight to India office
  const mapDots = [
    {
      start: { lat: 40.7128, lng: -74.006 }, // NY
      end: { lat: 20.5937, lng: 78.9629 }, // India
    },
    {
      start: { lat: 51.5074, lng: -0.1278 }, // London
      end: { lat: 20.5937, lng: 78.9629 },
    },
    {
      start: { lat: -33.8688, lng: 151.2093 }, // Sydney
      end: { lat: 20.5937, lng: 78.9629 },
    },
    {
      start: { lat: 1.3521, lng: 103.8198 }, // Singapore
      end: { lat: 20.5937, lng: 78.9629 },
    },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Left Side */}
        <div className="contact-left">
          {/* Mail Icon */}
          <div className="contact-icon-wrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>

          <h2 className="contact-title">Contact us</h2>

          <p className="contact-desc">
            We are always looking for ways to improve our products and services.
            Contact us and let us know how we can help you.
          </p>

          <div className="contact-info-row">
            <span>contact@ornitech.in</span>
            <span className="contact-dot">•</span>
            <span>+91 98765 43210</span>
            <span className="contact-dot">•</span>
            <span>support@ornitech.in</span>
          </div>

          {/* World Map */}
          <div className="contact-map-wrap">
            <div className="contact-map-marker">
              <div className="marker-label">We are here</div>
              <div className="marker-beam"></div>
              <div className="marker-glow"></div>
            </div>
            <WorldMap dots={mapDots} lineColor="#38bdf8" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="contact-right">
          <div className="contact-form-grid-bg"></div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Manu Arora"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="support@ornitech.in"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Ornitech LLC"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here"
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
