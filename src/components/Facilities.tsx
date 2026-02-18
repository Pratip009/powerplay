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
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : fromLeft
          ? "translateX(-70px)"
          : "translateX(70px)",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        background: hovered
          ? "rgba(10,18,28,0.95)"
          : "rgba(8,14,22,0.88)",
        border: `1px solid ${hovered ? item.accent + "35" : "rgba(255,255,255,0.055)"}`,
        boxShadow: hovered
          ? `0 20px 55px rgba(0,0,0,0.55), 0 0 35px ${item.accent}18, inset 0 1px 0 ${item.accent}18`
          : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
        cursor: "default",
        transition: `opacity 0.75s ease ${index * 0.05}s, transform 0.75s cubic-bezier(0.23,1,0.32,1) ${index * 0.05}s, border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease`,
      }}
    >
      {/* Accent side bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "3px",
          background: `linear-gradient(180deg, ${item.accent}, ${item.accent}00)`,
          boxShadow: hovered ? `0 0 18px ${item.accent}70` : "none",
          transition: "box-shadow 0.35s ease",
        }}
      />

      {/* Shimmer overlay on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, ${item.accent}00, ${item.accent}06, ${item.accent}00)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
          pointerEvents: "none",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Content */}
      <div className="facility-inner">
        {/* Icon bubble */}
        <div
          style={{
            width: "clamp(46px,6vw,56px)",
            height: "clamp(46px,6vw,56px)",
            borderRadius: "13px",
            background: hovered ? `${item.accent}1a` : `${item.accent}0e`,
            border: `1px solid ${hovered ? item.accent + "45" : item.accent + "22"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(1.25rem,2.5vw,1.6rem)",
            flexShrink: 0,
            boxShadow: hovered
              ? `0 0 28px ${item.accent}30, inset 0 1px 0 ${item.accent}30`
              : `inset 0 1px 0 ${item.accent}15`,
            transition: "all 0.35s ease",
            transform: hovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
          }}
        >
          {item.icon}
        </div>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.05rem,2.2vw,1.3rem)",
              fontWeight: 800,
              color: hovered ? "#ffffff" : "#f0f6ff",
              letterSpacing: "0.03em",
              marginBottom: "0.28rem",
              lineHeight: 1.1,
              transition: "color 0.3s ease",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              color: hovered ? "rgba(163,190,210,0.9)" : "rgba(143,170,191,0.7)",
              fontSize: "clamp(0.72rem,1.3vw,0.82rem)",
              lineHeight: 1.65,
              fontWeight: 300,
              transition: "color 0.3s ease",
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
            padding: "clamp(0.45rem,1.2vw,0.65rem) clamp(0.7rem,1.8vw,1rem)",
            borderRadius: "8px",
            background: hovered ? `${item.accent}18` : `${item.accent}0c`,
            border: `1px solid ${hovered ? item.accent + "40" : item.accent + "20"}`,
            minWidth: "clamp(58px,8vw,72px)",
            boxShadow: hovered ? `0 0 22px ${item.accent}20` : "none",
            transition: "all 0.35s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(1.1rem,2vw,1.4rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: item.accent,
              lineHeight: 1,
              textShadow: hovered ? `0 0 22px ${item.accent}90` : `0 0 12px ${item.accent}50`,
              transition: "text-shadow 0.35s ease",
            }}
          >
            {item.stat}
          </div>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(0.5rem,0.9vw,0.58rem)",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: `${item.accent}90`,
              textTransform: "uppercase",
              marginTop: "2px",
            }}
          >
            {item.statLabel}
          </div>
        </div>
      </div>
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
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, var(--night, #040a12) 0%, #060e18 100%)`,
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      {/* Ambient top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1200px, 100%)",
          height: "500px",
          background:
            "radial-gradient(ellipse at top, rgba(34,197,94,0.08) 0%, transparent 70%)",
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
          width: "min(800px, 100%)",
          height: "300px",
          background:
            "radial-gradient(ellipse at bottom, rgba(34,197,94,0.045) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.011) 80px, rgba(34,197,94,0.011) 81px),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.011) 80px, rgba(34,197,94,0.011) 81px)`,
          pointerEvents: "none",
        }}
      />
      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "160px 160px",
          opacity: 0.018,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      <div
        className="relative"
        style={{
          zIndex: 10,
          maxWidth: "88rem",
          margin: "0 auto",
          paddingLeft: "clamp(1rem, 5vw, 2.5rem)",
          paddingRight: "clamp(1rem, 5vw, 2.5rem)",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            marginBottom: "clamp(2.5rem, 5vw, 5rem)",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.85s ease, transform 0.85s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--turf, #22c55e)",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "var(--turf, #22c55e)",
                display: "inline-block",
              }}
            />
            World-Class Infrastructure
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "var(--turf, #22c55e)",
                display: "inline-block",
              }}
            />
          </p>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 900,
              color: "#f0f6ff",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              marginBottom: 0,
            }}
          >
            BUILT FOR THE
            <br />
            <span
              style={{
                color: "var(--turf, #22c55e)",
                fontStyle: "italic",
                textShadow: "0 0 60px rgba(34,197,94,0.45)",
              }}
            >
              SERIOUS PLAYER.
            </span>
          </h2>
          <p
            style={{
              color: "rgba(143,170,191,0.75)",
              fontSize: "clamp(0.82rem,1.6vw,0.95rem)",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "480px",
              margin: "1.2rem auto 0",
            }}
          >
            Every detail at PowerPlay has been designed with athletes in mind.
            From surface quality to lighting — we deliver professional-grade
            standards every single visit.
          </p>
        </div>

        {/* Two-column alternating layout */}
        <div className="facilities-grid">
          {/* Left column */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "clamp(0.65rem,1.5vw,1rem)" }}
          >
            {left.map((item, i) => (
              <FacilityRow key={item.title} item={item} index={i * 2} />
            ))}
          </div>

          {/* Right column — vertically offset */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.65rem,1.5vw,1rem)",
            }}
            className="facilities-right-col"
          >
            {right.map((item, i) => (
              <FacilityRow key={item.title} item={item} index={i * 2 + 1} />
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          className="facilities-cta"
          style={{
            marginTop: "clamp(2rem,4vw,4rem)",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.3rem,3.5vw,1.8rem)",
                fontWeight: 900,
                color: "#f0f6ff",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
            >
              READY TO EXPERIENCE IT?
            </p>
            <p
              style={{
                color: "rgba(143,170,191,0.7)",
                fontSize: "clamp(0.76rem,1.4vw,0.85rem)",
                fontWeight: 300,
                marginTop: "0.4rem",
              }}
            >
              Come see the facility for yourself — no commitment needed.
            </p>
          </div>
          <a
            href="#contact"
            className="facilities-cta-btn"
          >
            GET IN TOUCH →
          </a>
        </div>
      </div>

      <style>{`
        /* ── Inner row layout ── */
        .facility-inner {
          display: flex;
          align-items: center;
          gap: clamp(0.8rem, 2.5vw, 1.2rem);
          padding: clamp(1rem, 3vw, 1.4rem) clamp(1rem, 3vw, 1.8rem) clamp(1rem, 3vw, 1.4rem) clamp(1.2rem, 3vw, 2rem);
        }

        /* ── Grid ── */
        .facilities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(0.65rem, 1.5vw, 1rem);
          align-items: start;
        }
        .facilities-right-col {
          margin-top: clamp(1.2rem, 3vw, 2.5rem);
        }

        /* ── CTA strip ── */
        .facilities-cta {
          padding: clamp(1.4rem, 3.5vw, 2rem) clamp(1.4rem, 4vw, 2.5rem);
          border-radius: 12px;
          background: rgba(34,197,94,0.045);
          border: 1px solid rgba(34,197,94,0.14);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
          backdrop-filter: blur(8px);
        }
        .facilities-cta-btn {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: clamp(0.75rem, 1.4vw, 0.85rem);
          letter-spacing: 0.15em;
          color: #040a12;
          background: #22c55e;
          padding: 0.88rem clamp(1.2rem, 3vw, 2rem);
          border-radius: 6px;
          text-decoration: none;
          box-shadow: 0 0 30px rgba(34,197,94,0.3);
          white-space: nowrap;
          display: inline-block;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .facilities-cta-btn:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 0 50px rgba(34,197,94,0.55);
        }

        /* ── TABLET (≤ 860px) ── */
        @media (max-width: 860px) {
          .facilities-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.7rem;
          }
          .facility-inner {
            flex-wrap: nowrap;
          }
        }

        /* ── MOBILE (≤ 600px) ── */
        @media (max-width: 600px) {
          .facilities-grid {
            grid-template-columns: 1fr !important;
          }
          .facilities-right-col {
            margin-top: 0 !important;
          }
          /* Stat badge hides on very small screens if needed */
          .facilities-cta {
            flex-direction: column;
            align-items: flex-start;
          }
          .facilities-cta-btn {
            width: 100%;
            text-align: center;
          }
        }

        /* ── Very small (≤ 380px) ── */
        @media (max-width: 380px) {
          .facility-inner {
            gap: 0.6rem;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: opacity 0.3s ease, transform 0.3s ease !important; }
        }
      `}</style>
    </section>
  );
}