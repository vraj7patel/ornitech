import React from "react";
import "./Team.css";

const team = [
  {
    name: "Ronak Talaviya",
    title: "Founder & CEO",
    avatar: "src/assets/imges/Ronak.jpeg",
    color: "#1e293b",
  },
  {
    name: "Dhruv Bagdariya",
    title: "Co-Founder & CTO",
    avatar: "https://i.pravatar.cc/150?img=68",
    color: "#1e293b",
  },
  {
    name: "Samrth Gabani",
    title: "Project Manager",
    avatar: "https://i.pravatar.cc/150?img=33",
    color: "#1e293b",
  },
  {
    name: "Nikunj Dholakiya",
    title: "",
    avatar: "https://i.pravatar.cc/150?img=51",
    color: "#1e293b",
  },
  {
    name: "Johnny Walker",
    title: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?img=11",
    color: "#1e293b",
  },
  {
    name: "Jack Daniels",
    title: "HR & Management",
    avatar: "https://i.pravatar.cc/150?img=52",
    color: "#1e293b",
  },
  {
    name: "Samantha Rives",
    title: "Product Manager",
    avatar: "https://i.pravatar.cc/150?img=44",
    color: "#1e293b",
  },
  {
    name: "Evelyn Martinez",
    title: "QA Lead",
    avatar: "https://i.pravatar.cc/150?img=25",
    color: "#1e293b",
  },
  {
    name: "Priya Patel",
    title: "Lead UX Researcher",
    avatar: "https://i.pravatar.cc/150?img=48",
    color: "#1e293b",
  },
];

export function Team() {
  return (
    <section className="team-section">
      <div className="team-header">
        <h2 className="team-title">The team building the future</h2>
        <p className="team-sub">
          We are a team of builders, focused on building for the world, one
          step at a time. We are not afraid to take risks and bet on ourselves.
        </p>
        <div className="team-cta">
          <button className="team-btn-primary">We are hiring</button>
          <button className="team-btn-ghost">Our culture →</button>
        </div>
      </div>

      <div className="team-grid">
        {team.map((member, i) => (
          <div className="team-member" key={i}>
            <div
              className="team-avatar"
              style={{ background: member.color }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="team-avatar-img"
              />
            </div>
            <div className="team-info">
              <span className="team-name">{member.name}</span>
              <span className="team-dot">·</span>
              <span className="team-title-text">{member.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
