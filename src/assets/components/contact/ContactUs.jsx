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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage("");

    try {
      const response = await fetch(`/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully.');
        setFormData({ fullName: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Failed to send message. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
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
            <span>+91 82008 67325</span>
            <span className="contact-dot">•</span>
            <span>support@ornitech.in</span>
          </div>

          {/* World Map */}
          <div className="contact-map-wrap">
            <div className="contact-map-marker">
              <a
                href="https://www.google.com/maps/place/Centre+Point/@21.2045171,72.8312806,20z/data=!4m10!1m2!2m1!1sOFFICE+NO-324,+CENTER+POINT+CO+OPERATIVE+SOCIETY,+BALI+SHERI,+MAHIDHARPURA,+SURAT-395003!3m6!1s0x3be04ef4690b1283:0x83b05ba97a26dc2d!8m2!3d21.2045171!4d72.8318761!15sClhPRkZJQ0UgTk8tMzI0LCBDRU5URVIgUE9JTlQgQ08gT1BFUkFUSVZFIFNPQ0lFVFksIEJBTEkgU0hFUkksIE1BSElESEFSUFVSQSwgU1VSQVQtMzk1MDAzkgEQY29ycG9yYXRlX29mZmljZeABAA!16s%2Fg%2F11gbm2yybh?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="marker-label"
              >
                We are here
              </a>
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
            {submitStatus && (
              <div className={`contact-status ${submitStatus}`}>
                {statusMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="fullName">Full name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Manu Arora"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="support@ornitech.in"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
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
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Type your message here"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
