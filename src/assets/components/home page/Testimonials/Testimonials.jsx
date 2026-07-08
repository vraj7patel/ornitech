import React, { useState, useEffect } from "react";
import "./Testimonials.css";

const testimonials = [
  {
    quote: "Ornitech has completely transformed how our firm handles investments. The AI insights are unparalleled and the interface is incredibly intuitive.",
    name: "Manu Arora",
    title: "Tech Innovator & Entrepreneur",
    avatar: "MA",
    color: "#7c3aed",
  },
  {
    quote: "I used Ornitech to automate our financial reporting. It was so easy to set up and the results were outstanding. Highly recommend to any CFO.",
    name: "Tyler Durden",
    title: "Creative Director & Business Owner",
    avatar: "TD",
    color: "#0891b2",
  },
  {
    quote: "This platform has transformed the way our team works! It's like having a brilliant financial assistant who knows exactly what we need.",
    name: "Alice Johnson",
    title: "Senior Software Engineer",
    avatar: "AJ",
    color: "#059669",
  },
  {
    quote: "The real-time analytics and portfolio tracking features are best in class. We've seen a 40% improvement in decision-making speed.",
    name: "Sarah Mitchell",
    title: "Chief Financial Officer",
    avatar: "SM",
    color: "#d97706",
  },
  {
    quote: "Ornitech's compliance tools saved us countless hours. Everything is automated and accurate. The support team is also phenomenal.",
    name: "James Carter",
    title: "Risk & Compliance Manager",
    avatar: "JC",
    color: "#dc2626",
  },
  {
    quote: "From onboarding to advanced features, the experience has been seamless. Our clients love the transparency that Ornitech provides.",
    name: "Priya Patel",
    title: "Wealth Management Advisor",
    avatar: "PP",
    color: "#9333ea",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const visible = [
    testimonials[index % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setIndex((i) => (i + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <p className="testimonials-label">Testimonials</p>
        <div className="testimonials-title-row">
          <h2 className="testimonials-title">People love us, you know.</h2>
          <div className="testimonials-arrows">
            <button className="arrow-btn" onClick={prev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="arrow-btn" onClick={next} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="testimonials-grid">
        {visible.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-author">
              <div
                className="testimonial-avatar"
                style={{ background: t.color }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-role">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
