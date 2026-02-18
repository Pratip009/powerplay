"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sport: "FOOTBALL",
    icon: "⚽",
    label: "5-a-side & 7-a-side Pitches",
    accent: "#cadf14",
  },
  {
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400&q=80&auto=format&fit=crop",
    sport: "CRICKET",
    icon: "🏏",
    label: "Practice Nets & Turf Pitches",
    accent: "#f59e0b",
  },
  {
    src: "https://images.unsplash.com/photo-1693142517898-2f986215e412?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sport: "PICKLEBALL",
    icon: "🏓",
    label: "Pro Courts with LED Lighting",
    accent: "#0ea5e9",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  // `displayed` tracks which slide is actually visible (updates after fade completes)
  // This fixes the watermark/pill showing the next sport before the image has fully changed
  const [displayed, setDisplayed] = useState(0);
  const [fading, setFading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        const next = (current + 1) % slides.length;
        setCurrent(next);
        setDisplayed(next);
        setFading(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(i);
      setDisplayed(i);
      setFading(false);
    }, 800);
  };

  // `slide` uses `displayed` so all content (watermark, pill, accent colours)
  // stays in sync with the image that is currently visible on screen
  const slide = slides[displayed];

  return (
    <section
      className="relative flex flex-col justify-center overflow-hidden clip-diagonal turf-texture"
      style={{
        minHeight: isMobile ? "100svh" : "100vh",
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
              style={{
                objectFit: "cover",
                objectPosition: isMobile ? "60% center" : "center",
              }}
            />
            {/* Base dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isMobile
                  ? "rgba(5,10,14,0.72)"
                  : "rgba(5,10,14,0.52)",
              }}
            />
            {/* Left heavy vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isMobile
                  ? "linear-gradient(180deg, rgba(5,10,14,0.85) 0%, rgba(5,10,14,0.5) 40%, rgba(5,10,14,0.7) 100%)"
                  : "linear-gradient(90deg, rgba(5,10,14,0.96) 0%, rgba(5,10,14,0.75) 38%, rgba(5,10,14,0.15) 70%, transparent 100%)",
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

        {/* ── Slide indicators — desktop/tablet only, bottom right ── */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: isTablet ? "15%" : "13%",
              right: isTablet ? "3%" : "4%",
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-end",
            }}
          >
            {slides.map((s, i) => (
              <button
                key={s.sport}
                onClick={() => goTo(i)}
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
        )}

        {/* ── Mobile slide dots — bottom center ── */}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              bottom: "90px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {slides.map((s, i) => (
              <button
                key={s.sport}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    i === current ? s.accent : "rgba(255,255,255,0.25)",
                  boxShadow: i === current ? `0 0 8px ${s.accent}` : "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        )}

        {/* Sport name watermark — uses `slide` (synced to displayed) */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "-10px" : "-20px",
            right: isMobile ? "-5px" : "-10px",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: isMobile
              ? "clamp(4rem, 28vw, 8rem)"
              : "clamp(6rem, 18vw, 16rem)",
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
        {!isMobile && (
          <>
            <div
              className="absolute"
              style={{
                right: "-5%",
                top: "50%",
                transform: "translateY(-50%)",
                width: isTablet ? "70vw" : "60vw",
                height: isTablet ? "70vw" : "60vw",
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
                width: isTablet ? "50vw" : "40vw",
                height: isTablet ? "50vw" : "40vw",
                maxWidth: "480px",
                maxHeight: "480px",
                borderRadius: "50%",
                border: "1px solid rgba(34,197,94,0.04)",
              }}
            />
          </>
        )}
        <div
          className="absolute"
          style={{
            left: "-30px",
            bottom: "-30px",
            width: isMobile ? "100px" : "180px",
            height: isMobile ? "100px" : "180px",
            borderRadius: "50%",
            border: "1px solid rgba(34,197,94,0.06)",
          }}
        />
      </div>

      {/* ── Floodlight beams ── */}
      {!isMobile &&
        [
          { pos: isTablet ? "left-1/3" : "left-1/4" },
          { pos: isTablet ? "left-2/3" : "left-3/4" },
        ].map((b, i) => (
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
        className="relative max-w-7xl mx-auto w-full"
        style={{
          zIndex: 3,
          padding: isMobile
            ? "100px 20px 100px"
            : isTablet
              ? "120px 32px 110px"
              : "112px 24px 80px",
        }}
      >
        <div style={{ maxWidth: isTablet ? "560px" : "xl" }}>
          {/* Animated sport pill — uses `slide` (synced to displayed) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: isMobile ? "1rem" : "1.5rem",
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(-6px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div
              style={{
                width: isMobile ? "20px" : "32px",
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
                fontSize: isMobile ? "0.65rem" : "0.72rem",
                color: slide.accent,
                textTransform: "uppercase",
                transition: "color 0.6s ease",
              }}
            >
              {slide.icon} {slide.label}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display animate-fade-up delay-2"
            style={{
              fontSize: isMobile
                ? "clamp(3rem, 11vw, 4.5rem)"
                : isTablet
                  ? "clamp(4rem, 11vw, 6.5rem)"
                  : "clamp(3.5rem, 9vw, 8rem)",
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
            className="animate-fade-up delay-3"
            style={{
              color: "var(--mist)",
              fontSize: isMobile ? "0.9rem" : "1.05rem",
              lineHeight: 1.7,
              fontWeight: 300,
              marginTop: isMobile ? "1.25rem" : "2rem",
              maxWidth: isMobile ? "100%" : "32rem",
            }}
          >
            PowerPlay Turf is a premium multi-sport facility offering top-grade
            synthetic surfaces for football and cricket — with floodlit courts,
            professional amenities, and an atmosphere built for serious players.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up delay-4"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: isMobile ? "12px" : "16px",
              marginTop: isMobile ? "1.75rem" : "2.5rem",
            }}
          >
            <a
              href="#facilities"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                background: slide.accent,
                color: "var(--night)",
                fontWeight: 800,
                letterSpacing: "0.12em",
                fontSize: isMobile ? "0.82rem" : "0.9rem",
                boxShadow: `0 0 30px ${slide.accent}50`,
                transition:
                  "background 0.6s ease, box-shadow 0.6s ease, transform 0.3s ease",
                display: "inline-block",
                padding: isMobile ? "12px 24px" : "14px 32px",
                borderRadius: "2px",
                textDecoration: "none",
                textAlign: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              EXPLORE FACILITIES
            </a>
            <a
              href="#sports"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                border: `1px solid ${slide.accent}60`,
                color: "var(--white)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontSize: isMobile ? "0.82rem" : "0.9rem",
                transition: "border-color 0.6s ease, transform 0.3s ease",
                display: "inline-block",
                padding: isMobile ? "12px 24px" : "14px 32px",
                borderRadius: "2px",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              OUR SPORTS ↓
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-up delay-5"
          style={{
            marginTop: isMobile ? "2.5rem" : "5rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: isMobile ? "12px" : "24px",
            maxWidth: isMobile ? "100%" : "32rem",
            borderTop: `1px solid ${slide.accent}25`,
            paddingTop: isMobile ? "1.25rem" : "2rem",
            transition: "border-color 0.6s ease",
          }}
        >
          {[
            { num: "2", unit: "SPORTS", label: "Football & Cricket" },
            { num: "6", unit: "COURTS", label: "All-weather surfaces" },
            { num: "24/7", unit: "", label: "Floodlit access" },
          ].map((s) => (
            <div key={s.num}>
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}
              >
                <span
                  className="stat-num"
                  style={{ fontSize: isMobile ? "2rem" : "2.8rem" }}
                >
                  {s.num}
                </span>
                {s.unit && (
                  <span
                    className="font-display"
                    style={{
                      color: slide.accent,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      transition: "color 0.6s ease",
                      marginBottom: isMobile ? "4px" : "8px",
                      fontSize: isMobile ? "0.6rem" : "0.75rem",
                    }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <p
                style={{
                  color: "var(--mist)",
                  fontSize: isMobile ? "0.65rem" : "0.78rem",
                  marginTop: "0.1rem",
                  lineHeight: 1.4,
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
        <div className="glow-line" />
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

      {/* ── Scroll hint — desktop only ── */}
      {!isMobile && (
        <div
          className="animate-fade-in delay-6"
          style={{
            position: "absolute",
            bottom: isTablet ? "14%" : "12%",
            right: "32px",
            color: "var(--mist)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
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
      )}

      {/* ── Swipe hint on mobile ── */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            opacity: 0.45,
          }}
        >
          <div
            style={{
              width: "20px",
              height: "1px",
              background: "var(--mist)",
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--mist)",
              fontWeight: 600,
            }}
          >
            TAP TO SWITCH
          </span>
          <div
            style={{
              width: "20px",
              height: "1px",
              background: "var(--mist)",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes slideProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}