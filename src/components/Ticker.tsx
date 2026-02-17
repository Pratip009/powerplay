"use client";

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
  const doubled = [...items, ...items];

  return (
    <div
      className="relative py-4 overflow-hidden"
      style={{
        background: "var(--turf)",
        borderTop: "1px solid rgba(0,0,0,0.15)",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display"
            style={{
              fontSize: "0.88rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "var(--night)",
              padding: "0 2rem",
              borderRight: "1px solid rgba(0,0,0,0.15)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}