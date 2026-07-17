import React from "react";
import "./Team.css";
import ronakImg from "../../../imges/Ronak.jpeg";
import swetImg from "../../../imges/swet.jpg";

const team = [
  {
    name: "Ronak Talaviya",
    title: "Founder & CEO",
    avatar: ronakImg,
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
    title: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?img=51",
    color: "#1e293b",
  },
  {
    name: "Swet Kalathiya",
    title: "Marketing Manager",
    avatar: swetImg,
    color: "#1e293b",
  },
  {
    name: "Shreya Patel",
    title: "HR & Management",
    avatar: "https://i.pravatar.cc/150?img=44",
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
