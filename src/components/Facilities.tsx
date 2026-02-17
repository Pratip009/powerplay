"use client";
import { useEffect, useRef, useState } from "react";

const facilities = [
  {
    icon: "⚡",
    title: "Floodlit Courts",
    desc: "High-intensity LED floodlighting delivering over 2000 lux — built for night matches and evening training. No more calling it quits at sundown.",
    stat: "2000+",
    statLabel: "Lux Output",
    accent: "#22c55e",
  },
  {
    icon: "🏟",
    title: "Premium Synthetic Turf",
    desc: "FIFA-certified synthetic grass with shock-absorbing underlay. Consistent, durable, and playable in all weather conditions — season after season.",
    stat: "FIFA",
    statLabel: "Certified",
    accent: "#22c55e",
  },
  {
    icon: "🚿",
    title: "Changing Rooms",
    desc: "Clean, modern changing facilities with secure lockers, showers, and dedicated spaces for both teams. Arrive ready. Leave refreshed.",
    stat: "2",
    statLabel: "Team Rooms",
    accent: "#38bdf8",
  },
  {
    icon: "🏋",
    title: "Warm-Up Areas",
    desc: "Dedicated stretching and warm-up zones adjacent to the pitches. Keep your squad primed and injury-free before every session.",
    stat: "Pro",
    statLabel: "Grade Setup",
    accent: "#a78bfa",
  },
  {
    icon: "🅿",
    title: "Ample Parking",
    desc: "Spacious on-site parking for players, coaches, and spectators. Hassle-free access at all times — no circling, no stress.",
    stat: "Free",
    statLabel: "Parking",
    accent: "#f59e0b",
  },
  {
    icon: "🎯",
    title: "Multi-Use Pitches",
    desc: "Configurable pitch layouts that adapt from 5-a-side football to full cricket net setups with ease. One venue, endless configurations.",
    stat: "6+",
    statLabel: "Configurations",
    accent: "#22c55e",
  },
  {
    icon: "👁",
    title: "Spectator Seating",
    desc: "Covered spectator areas so your supporters never miss a moment, rain or shine. Every game deserves an audience.",
    stat: "Covered",
    statLabel: "Stands",
    accent: "#fb923c",
  },
  {
    icon: "🔒",
    title: "24/7 Security",
    desc: "CCTV surveillance and secure perimeter fencing ensuring a safe environment for all users. Play with peace of mind.",
    stat: "24/7",
    statLabel: "Monitored",
    accent: "#f43f5e",
  },
];

function FacilityRow({
  item,
  index,
}: {
  item: (typeof facilities)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : fromLeft
          ? "translateX(-80px)"
          : "translateX(80px)",
        transition: `opacity 0.75s ease ${index * 0.05}s, transform 0.75s cubic-bezier(0.23,1,0.32,1) ${index * 0.05}s`,
        display: "grid",
        gridTemplateColumns: fromLeft ? "auto 1fr" : "1fr auto",
        gap: "0",
        alignItems: "stretch",
        borderRadius: "12px",
        overflow: "hidden",
        background: "rgba(8,15,24,0.85)",
        border: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        cursor: "default",
      }}
      className="facility-row"
    >
      {/* Accent side bar */}
      <div
        style={{
          order: fromLeft ? 1 : 3,
          width: "4px",
          background: `linear-gradient(180deg, ${item.accent}, transparent)`,
          boxShadow: `0 0 20px ${item.accent}60`,
          flexShrink: 0,
        }}
      />

      {/* Main content */}
      <div
        style={{
          order: 2,
          display: "grid",
          gridTemplateColumns: "64px 1fr auto",
          gap: "1.2rem",
          alignItems: "center",
          padding: "1.4rem 1.8rem",
        }}
      >
        {/* Icon bubble */}
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: `${item.accent}12`,
            border: `1px solid ${item.accent}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            flexShrink: 0,
            boxShadow: `0 0 20px ${item.accent}15, inset 0 1px 0 ${item.accent}20`,
          }}
        >
          {item.icon}
        </div>

        {/* Text */}
        <div>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 800,
              color: "#f0f6ff",
              letterSpacing: "0.03em",
              marginBottom: "0.3rem",
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              color: "rgba(143,170,191,0.75)",
              fontSize: "0.82rem",
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            {item.desc}
          </p>
        </div>

        {/* Stat badge */}
        <div
          style={{
            flexShrink: 0,
            textAlign: "center",
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            background: `${item.accent}10`,
            border: `1px solid ${item.accent}25`,
            minWidth: "70px",
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 900,
              fontStyle: "italic",
              color: item.accent,
              lineHeight: 1,
              textShadow: `0 0 20px ${item.accent}80`,
            }}
          >
            {item.stat}
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: `${item.accent}90`,
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {item.statLabel}
          </div>
        </div>
      </div>

      {/* Hover shimmer overlay */}
      <div
        className="facility-shimmer"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${item.accent}00, ${item.accent}05, ${item.accent}00)`,
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          borderRadius: "12px",
        }}
      />
    </div>
  );
}

export default function Facilities() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const left = facilities.filter((_, i) => i % 2 === 0);
  const right = facilities.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="facilities"
      className="relative py-28 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, var(--night) 0%, var(--night-3) 100%)`,
      }}
    >
      {/* Ambient top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1200px",
          height: "500px",
          background:
            "radial-gradient(ellipse at top, rgba(34,197,94,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "300px",
          background:
            "radial-gradient(ellipse at bottom, rgba(34,197,94,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.012) 80px, rgba(34,197,94,0.012) 81px),
          repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.012) 80px, rgba(34,197,94,0.012) 81px)`,
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "5rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <p
            className="section-label mb-4"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "var(--turf)",
                display: "inline-block",
              }}
            />
            World-Class Infrastructure
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "var(--turf)",
                display: "inline-block",
              }}
            />
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              color: "var(--white)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            BUILT FOR THE
            <br />
            <span
              style={{
                color: "var(--turf)",
                fontStyle: "italic",
                textShadow: "0 0 50px rgba(34,197,94,0.4)",
              }}
            >
              SERIOUS PLAYER.
            </span>
          </h2>
          <p
            style={{
              color: "var(--mist)",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "500px",
              margin: "1.2rem auto 0",
            }}
          >
            Every detail at PowerPlay has been designed with athletes in mind.
            From surface quality to lighting — we deliver professional-grade
            standards every single visit.
          </p>
        </div>

        {/* Two-column alternating layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            alignItems: "start",
          }}
          className="facilities-grid"
        >
          {/* Left column — even items, slide from left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {left.map((item, i) => (
              <FacilityRow key={item.title} item={item} index={i * 2} />
            ))}
          </div>

          {/* Right column — odd items, slide from right */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginTop: "2.5rem", // stagger the columns vertically
            }}
          >
            {right.map((item, i) => (
              <FacilityRow key={item.title} item={item} index={i * 2 + 1} />
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2rem 2.5rem",
            borderRadius: "12px",
            background: "rgba(34,197,94,0.05)",
            border: "1px solid rgba(34,197,94,0.15)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          <div>
            <p
              className="font-display"
              style={{
                fontSize: "1.8rem",
                fontWeight: 900,
                color: "var(--white)",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              READY TO EXPERIENCE IT?
            </p>
            <p
              style={{
                color: "var(--mist)",
                fontSize: "0.85rem",
                fontWeight: 300,
                marginTop: "0.4rem",
              }}
            >
              Come see the facility for yourself — no commitment needed.
            </p>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              color: "var(--night)",
              background: "var(--turf)",
              padding: "0.9rem 2rem",
              borderRadius: "6px",
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(34,197,94,0.3)",
              whiteSpace: "nowrap",
              display: "inline-block",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 50px rgba(34,197,94,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(34,197,94,0.3)";
            }}
          >
            GET IN TOUCH →
          </a>
        </div>
      </div>

      <style>{`
        .facility-row:hover .facility-shimmer { opacity: 1 !important; }
        .facility-row:hover { border-color: rgba(255,255,255,0.1) !important; }
        @media (max-width: 768px) {
          .facilities-grid { grid-template-columns: 1fr !important; }
          .facilities-grid > div:last-child { margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}