"use client";

import { useEffect, useRef } from "react";

const items = [
  "⚽ Football",
  "🏏 Cricket",
  "🔥 Floodlit Courts",
  "🏆 Tournaments",
  "💪 Training Sessions",
  "🌿 Premium Turf",
  "🌙 Evening Play",
  "👥 All Skill Levels",
];

export default function Ticker() {
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="relative py-3 sm:py-4 overflow-hidden"
      style={{
        background: "var(--turf)",
        borderTop: "1px solid rgba(0,0,0,0.15)",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <div
        className="marquee-track flex items-center whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
          willChange: "transform",
        }}
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            className="font-display inline-flex items-center shrink-0"
            style={{
              fontSize: "clamp(0.7rem, 2vw, 0.88rem)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "var(--night)",
              padding: "0 clamp(0.75rem, 2.5vw, 2rem)",
              borderRight: "1px solid rgba(0,0,0,0.15)",
              lineHeight: 1,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Fade edges — subtle on mobile, stronger on desktop */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10"
        style={{
          width: "clamp(2rem, 8vw, 6rem)",
          background: "linear-gradient(to right, var(--turf), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10"
        style={{
          width: "clamp(2rem, 8vw, 6rem)",
          background: "linear-gradient(to left, var(--turf), transparent)",
        }}
      />

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.5rem;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}