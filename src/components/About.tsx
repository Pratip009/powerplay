"use client";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    num: "01",
    title: "Premium Quality",
    desc: "We invest in the finest synthetic turf and infrastructure so every player experiences a professional-grade surface from day one.",
    icon: "🏆",
    accent: "#22c55e",
  },
  {
    num: "02",
    title: "All Skill Levels",
    desc: "Whether you're a beginner picking up a bat for the first time or a seasoned footballer — PowerPlay is your home.",
    icon: "👥",
    accent: "#38bdf8",
  },
  {
    num: "03",
    title: "Community Focus",
    desc: "We believe sport brings people together. Our facility hosts tournaments, training camps, and community events throughout the year.",
    icon: "🌿",
    accent: "#a78bfa",
  },
  {
    num: "04",
    title: "Evening Play Ready",
    desc: "Floodlit courts mean your schedule never has to compromise. Play at 7pm or 10pm — the lights stay on for you.",
    icon: "⚡",
    accent: "#f59e0b",
  },
];

function ValueCard({ v, index, visible }: { v: typeof values[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        padding: "clamp(1.1rem,3vw,1.5rem) clamp(1.2rem,3vw,1.6rem)",
        display: "flex",
        gap: "clamp(0.8rem,2vw,1.2rem)",
        alignItems: "flex-start",
        background: hovered
          ? "rgba(10,20,32,0.96)"
          : "rgba(8,15,25,0.82)",
        border: `1px solid ${hovered ? v.accent + "38" : "rgba(255,255,255,0.055)"}`,
        boxShadow: hovered
          ? `0 20px 55px rgba(0,0,0,0.55), 0 0 35px ${v.accent}14, inset 0 1px 0 ${v.accent}18`
          : `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
        backdropFilter: "blur(14px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(40px)",
        transition: `opacity 0.7s ease ${index * 0.1 + 0.2}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${index * 0.1 + 0.2}s, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease`,
        cursor: "default",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: "3px",
        background: `linear-gradient(180deg, ${v.accent}, ${v.accent}00)`,
        boxShadow: hovered ? `0 0 16px ${v.accent}80` : "none",
        transition: "box-shadow 0.3s ease",
      }} />

      {/* Shimmer overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${v.accent}00, ${v.accent}05, ${v.accent}00)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Icon bubble */}
      <div style={{
        flexShrink: 0,
        width: "clamp(42px,5.5vw,52px)",
        height: "clamp(42px,5.5vw,52px)",
        borderRadius: "11px",
        background: hovered ? `${v.accent}1a` : `${v.accent}0d`,
        border: `1px solid ${hovered ? v.accent + "42" : v.accent + "20"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(1.1rem,2vw,1.35rem)",
        boxShadow: hovered ? `0 0 24px ${v.accent}28, inset 0 1px 0 ${v.accent}28` : "none",
        transition: "all 0.35s ease",
        transform: hovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
        position: "relative", zIndex: 1,
      }}>
        {v.icon}
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.3rem" }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontStyle: "italic",
            fontSize: "clamp(0.72rem,1.2vw,0.82rem)",
            color: `${v.accent}70`,
            letterSpacing: "0.1em",
          }}>{v.num}</span>
          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(0.95rem,1.8vw,1.12rem)",
            fontWeight: 800,
            color: hovered ? "#ffffff" : "#f0f6ff",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            transition: "color 0.3s ease",
          }}>{v.title}</h3>
        </div>
        <p style={{
          color: hovered ? "rgba(163,190,210,0.88)" : "rgba(143,170,191,0.68)",
          fontSize: "clamp(0.74rem,1.3vw,0.84rem)",
          lineHeight: 1.68,
          fontWeight: 300,
          transition: "color 0.3s ease",
        }}>{v.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  /* Intersection observers */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const observe = (ref: React.RefObject<HTMLDivElement | null>, setter: (v: boolean) => void) => {
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold: 0.08 }
      );
      obs.observe(ref.current);
      observers.push(obs);
    };
    observe(leftRef, setLeftVisible);
    observe(rightRef, setRightVisible);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(4.5rem, 9vw, 8rem)",
        paddingBottom: "clamp(4.5rem, 9vw, 8rem)",
      }}
    >
      {/* ── Fixed background image — stays locked while content scrolls ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}>
        {/* The actual fixed image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1800&q=70&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(0.45) saturate(0.75)",
        }} />
        {/* Edge fade — only top/bottom edges bleed into night, center stays visible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, #040a12 0%, rgba(4,10,18,0.15) 18%, rgba(4,10,18,0.1) 50%, rgba(4,10,18,0.15) 82%, #040a12 100%)",
        }} />
        {/* Subtle left-side dark panel so left text stays legible */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(4,10,18,0.65) 0%, rgba(4,10,18,0.25) 45%, rgba(4,10,18,0.1) 100%)",
        }} />
        {/* Green tint veil */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 60% 50%, rgba(34,197,94,0.08) 0%, transparent 60%)",
        }} />
      </div>

      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.01) 80px, rgba(34,197,94,0.01) 81px),
          repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.01) 80px, rgba(34,197,94,0.01) 81px)`,
      }} />

      {/* Ghost watermark */}
      <div style={{
        position: "absolute",
        bottom: "-2rem",
        right: "-2rem",
        zIndex: 1,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(12vw,20vw,22vw)",
        fontWeight: 900,
        fontStyle: "italic",
        color: "rgba(34,197,94,0.022)",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
        pointerEvents: "none",
      }}>
        POWERPLAY
      </div>

      {/* ── Content ── */}
      <div
        className="relative"
        style={{
          zIndex: 10,
          maxWidth: "88rem",
          margin: "0 auto",
          paddingLeft: "clamp(1rem,5vw,2.5rem)",
          paddingRight: "clamp(1rem,5vw,2.5rem)",
        }}
      >
        <div className="about-grid">

          {/* ── Left column ── */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            {/* Label */}
            <p style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.7rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#22c55e", marginBottom: "1rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "#22c55e", display: "inline-block" }} />
              Our Story
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.8rem,6.5vw,5rem)",
              fontWeight: 900,
              color: "#f0f6ff",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              marginBottom: "clamp(1.5rem,3vw,2.2rem)",
            }}>
              MORE THAN
              <br />A PLAYING
              <br />
              <span style={{
                color: "#22c55e",
                fontStyle: "italic",
                textShadow: "0 0 65px rgba(34,197,94,0.5)",
              }}>
                SURFACE.
              </span>
            </h2>

            {/* Body copy */}
            <div style={{ maxWidth: "500px" }}>
              <p style={{
                color: "rgba(143,170,191,0.82)",
                fontSize: "clamp(0.84rem,1.5vw,1rem)",
                lineHeight: 1.82,
                fontWeight: 300,
                marginBottom: "1rem",
              }}>
                PowerPlay was built with a singular purpose: to give every player
                — amateur or elite — access to the kind of facility that was once
                reserved for professional clubs. We&lsquo;ve spent years obsessing over
                the details: pitch materials, lighting quality, drainage, run-off
                zones, and every inch of player experience.
              </p>
              <p style={{
                color: "rgba(143,170,191,0.78)",
                fontSize: "clamp(0.84rem,1.5vw,1rem)",
                lineHeight: 1.82,
                fontWeight: 300,
              }}>
                The result is an arena that feels alive the moment you walk in —
                where the smell of synthetic turf and the buzz of floodlights tell
                you that it&lsquo;s game time.
              </p>
            </div>

            {/* Pull quote */}
            <div style={{
              marginTop: "clamp(1.8rem,4vw,2.8rem)",
              paddingLeft: "clamp(1rem,2.5vw,1.4rem)",
              borderLeft: "3px solid #22c55e",
              boxShadow: "-4px 0 20px rgba(34,197,94,0.2)",
              position: "relative",
            }}>
              {/* Glow behind quote */}
              <div style={{
                position: "absolute",
                left: "-20px", top: "0", bottom: "0",
                width: "120px",
                background: "radial-gradient(ellipse at left, rgba(34,197,94,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(1.2rem,2.5vw,1.65rem)",
                fontWeight: 800,
                fontStyle: "italic",
                color: "#f0f6ff",
                lineHeight: 1.32,
                marginBottom: "0.6rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}>
                &ldquo;Play harder. Train smarter. Live the game.&ldquo;
              </p>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.72rem",
                letterSpacing: "0.18em",
                color: "#22c55e",
                textTransform: "uppercase",
                textShadow: "0 0 12px rgba(34,197,94,0.5)",
              }}>
                — The PowerPlay Philosophy
              </p>
            </div>

            {/* Stats row */}
            <div className="stats-row" style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
              {[
                { val: "5+", label: "Years Running", accent: "#22c55e" },
                { val: "10K+", label: "Sessions Booked", accent: "#38bdf8" },
                { val: "2", label: "Premium Sports", accent: "#f59e0b" },
              ].map((s) => (
                <div key={s.label} style={{
                  textAlign: "center",
                  padding: "clamp(0.8rem,2vw,1rem) clamp(1rem,2.5vw,1.4rem)",
                  borderRadius: "10px",
                  background: "rgba(8,15,25,0.75)",
                  border: `1px solid ${s.accent}22`,
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${s.accent}15`,
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontStyle: "italic",
                    fontSize: "clamp(1.6rem,3.5vw,2.4rem)",
                    color: s.accent, lineHeight: 1,
                    textShadow: `0 0 25px ${s.accent}80`,
                  }}>{s.val}</div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: "clamp(0.56rem,1vw,0.65rem)",
                    letterSpacing: "0.16em",
                    color: `${s.accent}90`,
                    textTransform: "uppercase",
                    marginTop: "3px",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column — values ── */}
          <div
            ref={rightRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.65rem,1.5vw,0.9rem)",
            }}
          >
            {/* Section micro-label */}
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.68rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(143,170,191,0.5)",
              marginBottom: "0.4rem",
              opacity: rightVisible ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}>
              What we stand for
            </p>
            {values.map((v, i) => (
              <ValueCard key={v.num} v={v} index={i} visible={rightVisible} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 6vw, 5rem);
          align-items: start;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.5rem, 1.5vw, 0.8rem);
        }

        /* Tablet */
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: clamp(2.5rem, 5vw, 3.5rem);
          }
          .about-grid > div:first-child {
            max-width: 640px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .stats-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: opacity 0.3s ease !important; }
        }
      `}</style>
    </section>
  );
}