"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sport: "FOOTBALL",
    icon: "⚽",
    label: "5-a-side & 7-a-side Pitches",
    accent: "#22c55e",
  },
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&q=80&auto=format&fit=crop",
    sport: "CRICKET",
    icon: "🏏",
    label: "Practice Nets & Turf Pitches",
    accent: "#f59e0b",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setFading(false);
      }, 800); // half of transition
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden clip-diagonal turf-texture"
      style={{
        background: `linear-gradient(180deg, #050a0e 0%, #081420 60%, #050a0e 100%)`,
      }}
    >
      {/* ── Crossfading background image ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.sport}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === current ? (fading ? 0 : 1) : 0,
              transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <Image
              src={s.src}
              alt={s.sport}
              fill
              priority={i === 0}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            {/* Base dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(5,10,14,0.52)",
              }}
            />
            {/* Left heavy vignette for text area */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(5,10,14,0.96) 0%, rgba(5,10,14,0.75) 38%, rgba(5,10,14,0.15) 70%, transparent 100%)",
              }}
            />
            {/* Top + bottom fade */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(5,10,14,0.5) 0%, transparent 20%, transparent 75%, #050a0e 100%)",
              }}
            />
            {/* Sport colour tint */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `${s.accent}08`,
                mixBlendMode: "screen",
              }}
            />
          </div>
        ))}

        {/* Slide indicators — bottom right of image */}
        <div
          style={{
            position: "absolute",
            bottom: "13%",
            right: "4%",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
          className="hidden md:flex"
        >
          {slides.map((s, i) => (
            <button
              key={s.sport}
              onClick={() => {
                setFading(true);
                setTimeout(() => {
                  setCurrent(i);
                  setFading(false);
                }, 800);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background:
                  i === current ? "rgba(5,10,14,0.85)" : "rgba(5,10,14,0.45)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${i === current ? s.accent + "60" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "3px",
                padding: "8px 14px",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            >
              <span style={{ fontSize: "1rem" }}>{s.icon}</span>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  fontSize: "0.68rem",
                  color: i === current ? s.accent : "rgba(143,170,191,0.6)",
                  transition: "color 0.4s ease",
                }}
              >
                {s.sport}
              </span>
              {/* Active dot */}
              {i === current && (
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: s.accent,
                    boxShadow: `0 0 8px ${s.accent}`,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Sport name watermark — large faded text over image */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-10px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(6rem, 18vw, 16rem)",
            fontWeight: 900,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            userSelect: "none",
            zIndex: 1,
            transition: "opacity 0.9s ease",
            opacity: fading ? 0 : 1,
            pointerEvents: "none",
          }}
        >
          {slide.sport}
        </div>
      </div>

      {/* ── Field lines ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div
          className="absolute"
          style={{
            right: "-5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "60vw",
            height: "60vw",
            maxWidth: "700px",
            maxHeight: "700px",
            borderRadius: "50%",
            border: "1px solid rgba(34,197,94,0.06)",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40vw",
            height: "40vw",
            maxWidth: "480px",
            maxHeight: "480px",
            borderRadius: "50%",
            border: "1px solid rgba(34,197,94,0.04)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-30px",
            bottom: "-30px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border: "1px solid rgba(34,197,94,0.06)",
          }}
        />
      </div>

      {/* ── Floodlight beams ── */}
      {[{ pos: "left-1/4" }, { pos: "left-3/4" }].map((b, i) => (
        <div
          key={i}
          className={`absolute top-0 ${b.pos} pointer-events-none`}
          style={{ zIndex: 1 }}
        >
          <div
            style={{
              width: "2px",
              height: "120px",
              background:
                "linear-gradient(180deg, rgba(255,255,200,0.5), transparent)",
            }}
          />
          <div
            style={{
              width: "200px",
              height: "400px",
              marginLeft: "-100px",
              background:
                "linear-gradient(180deg, rgba(34,197,94,0.05), transparent)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        </div>
      ))}

      {/* ── Content ── */}
      <div
        className="relative max-w-7xl mx-auto px-6 pt-28 pb-20"
        style={{ zIndex: 3 }}
      >
        <div className="max-w-xl">
          {/* Animated sport pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.5rem",
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(-6px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: slide.accent,
                transition: "background 0.6s ease",
                boxShadow: `0 0 8px ${slide.accent}`,
              }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.22em",
                fontSize: "0.72rem",
                color: slide.accent,
                textTransform: "uppercase",
                transition: "color 0.6s ease",
              }}
            >
              {slide.icon} {slide.label}
            </span>
          </div>

          {/* Headline — static */}
          <h1
            className="font-display animate-fade-up delay-2"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8rem)",
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              color: "var(--white)",
            }}
          >
            WHERE
            <br />
            <span
              style={{
                color: slide.accent,
                fontStyle: "italic",
                textShadow: `0 0 60px ${slide.accent}60`,
                transition: "color 0.6s ease, text-shadow 0.6s ease",
              }}
            >
              CHAMPIONS
            </span>
            <br />
            <span style={{ color: "var(--white)" }}>TRAIN.</span>
          </h1>

          {/* Sub */}
          <p
            className="animate-fade-up delay-3 mt-8 max-w-lg"
            style={{
              color: "var(--mist)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            PowerPlay Turf is a premium multi-sport facility offering top-grade
            synthetic surfaces for football and cricket — with floodlit courts,
            professional amenities, and an atmosphere built for serious players.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-4 flex flex-wrap items-center gap-4 mt-10">
            <a
              href="#facilities"
              className="font-display font-700 text-base px-8 py-4 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: slide.accent,
                color: "var(--night)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                fontSize: "0.9rem",
                boxShadow: `0 0 30px ${slide.accent}50`,
                transition: "background 0.6s ease, box-shadow 0.6s ease",
              }}
            >
              EXPLORE FACILITIES
            </a>
            <a
              href="#sports"
              className="font-display font-700 text-base px-8 py-4 rounded-sm transition-all duration-300 hover:scale-105"
              style={{
                border: `1px solid ${slide.accent}60`,
                color: "var(--white)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontSize: "0.9rem",
                transition: "border-color 0.6s ease",
              }}
            >
              OUR SPORTS ↓
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up delay-5 mt-20 grid grid-cols-3 gap-6 max-w-lg"
          style={{
            borderTop: `1px solid ${slide.accent}25`,
            paddingTop: "2rem",
            transition: "border-color 0.6s ease",
          }}
        >
          {[
            { num: "2", unit: "SPORTS", label: "Football & Cricket" },
            { num: "6", unit: "COURTS", label: "All-weather surfaces" },
            { num: "24/7", unit: "", label: "Floodlit access" },
          ].map((s) => (
            <div key={s.num}>
              <div className="flex items-end gap-1">
                <span className="stat-num" style={{ fontSize: "2.8rem" }}>
                  {s.num}
                </span>
                {s.unit && (
                  <span
                    className="font-display mb-2 text-xs"
                    style={{
                      color: slide.accent,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      transition: "color 0.6s ease",
                    }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "var(--mist)",
                  fontSize: "0.78rem",
                  marginTop: "0.1rem",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
        }}
      >
        {/* Glow line */}
        <div className="glow-line" />
        {/* Slide progress bar */}
        <div
          style={{
            height: "3px",
            background: "rgba(255,255,255,0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            key={current}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              background: `linear-gradient(90deg, ${slide.accent}, ${slide.accent}aa)`,
              boxShadow: `0 0 10px ${slide.accent}`,
              animation: "slideProgress 5s linear forwards",
            }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-12 right-8 animate-fade-in delay-6 hidden md:flex flex-col items-center gap-2"
        style={{
          color: "var(--mist)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          zIndex: 3,
        }}
      >
        <span
          className="font-display"
          style={{ writingMode: "vertical-rl", fontWeight: 600 }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: `linear-gradient(180deg, ${slide.accent}, transparent)`,
            transition: "background 0.6s ease",
          }}
        />
      </div>

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
