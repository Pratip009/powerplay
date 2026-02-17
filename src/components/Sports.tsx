"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const sports = [
  {
    id: "football",
    name: "Football",
    tagline: "5-a-side & 7-a-side",
    description:
      "Our FIFA-grade synthetic turf pitches are engineered for speed and control. Precision ball roll, consistent bounce, and shock-absorption underlay make every session feel professional — from leisure games to elite training.",
    features: [
      "FIFA Quality Pro synthetic turf",
      "Shock-absorbent underlay system",
      "Full floodlighting (2000+ lux)",
      "5-a-side & 7-a-side layouts",
      "Dedicated changing rooms",
      "Spectator seating available",
    ],
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Football pitch at night",
    accent: "#22c55e",
    accentDim: "rgba(34,197,94,0.12)",
    accentGlow: "rgba(34,197,94,0.35)",
    number: "01",
  },
  {
    id: "cricket",
    name: "Cricket",
    tagline: "Practice nets & turf pitches",
    description:
      "A dedicated cricket zone with premium synthetic pitch lanes designed for true-to-life bounce and seam movement. From batting practice to fast-bowling drills — built for every skill level and serious development programs.",
    features: [
      "Performance cricket synthetic pitch",
      "True bounce & seam movement",
      "Covered practice net lanes",
      "Stumps & pitch equipment included",
      "Suitable for all age groups",
      "Coaching sessions available",
    ],
    image:
      "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Cricket ground",
    accent: "#f59e0b",
    accentDim: "rgba(245,158,11,0.12)",
    accentGlow: "rgba(245,158,11,0.35)",
    number: "02",
  },
];

function SportCard({
  sport,
  index,
}: {
  sport: (typeof sports)[0];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 === 1;

  // Self-contained intersection observer — no global dependency
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: x * -10 });
  };

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: "1400px",
        marginBottom: "5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${index * 0.15}s`,
      }}
    >
      {/* 3D tilt wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHovered(false);
        }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.015 : 1})`,
          transition: hovered
            ? "transform 0.08s linear"
            : "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "14px",
          overflow: "hidden",
          background: "#08101a",
          border: `1px solid ${sport.accent}22`,
          boxShadow: hovered
            ? `0 40px 80px rgba(0,0,0,0.65), 0 0 60px ${sport.accentGlow}, inset 0 1px 0 ${sport.accent}30`
            : `0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 ${sport.accent}12`,
        }}
      >
        {/* ── Animated blob layer ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 0,
            borderRadius: "14px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "550px",
              height: "550px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${sport.accent}16 0%, transparent 70%)`,
              top: "-150px",
              [isReversed ? "right" : "left"]: "-150px",
              animation: `blobA 9s ease-in-out infinite`,
              filter: "blur(50px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${sport.accent}10 0%, transparent 70%)`,
              bottom: "-120px",
              [isReversed ? "left" : "right"]: "-120px",
              animation: `blobB 12s ease-in-out infinite`,
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${sport.accent}08 0%, transparent 70%)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              animation: `blobC 7s ease-in-out infinite`,
              filter: "blur(30px)",
            }}
          />
          {/* Subtle grid lines for 3D depth */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.05,
            }}
            viewBox="0 0 800 480"
            preserveAspectRatio="xMidYMid slice"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <line
                key={`v${i}`}
                x1={i * 90}
                y1="0"
                x2={i * 90}
                y2="480"
                stroke={sport.accent}
                strokeWidth="0.5"
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 96}
                x2="800"
                y2={i * 96}
                stroke={sport.accent}
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "460px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Image side */}
          <div
            style={{
              order: isReversed ? 2 : 1,
              position: "relative",
              overflow: "hidden",
              minHeight: "320px",
            }}
          >
            <Image
              src={sport.image}
              alt={sport.imageAlt}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.9s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
            {/* Gradient toward content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isReversed
                  ? "linear-gradient(270deg, #08101a 0%, rgba(8,16,26,0.5) 50%, rgba(8,16,26,0.05) 100%)"
                  : "linear-gradient(90deg, #08101a 0%, rgba(8,16,26,0.5) 50%, rgba(8,16,26,0.05) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(8,16,26,0.35) 0%, transparent 30%, transparent 65%, rgba(8,16,26,0.7) 100%)",
              }}
            />
            {/* Colour wash */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `${sport.accent}06`,
                mixBlendMode: "screen",
              }}
            />

            {/* Ghost number on image */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                [isReversed ? "left" : "right"]: "-8px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "11rem",
                fontWeight: 900,
                fontStyle: "italic",
                color: `${sport.accent}10`,
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {sport.number}
            </div>

            {/* Floating pill badge */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                [isReversed ? "right" : "left"]: "18px",
                background: "rgba(4,9,16,0.82)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${sport.accent}45`,
                borderRadius: "8px",
                padding: "9px 15px",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 18px ${sport.accentGlow}`,
                transform: hovered ? "translateY(-5px)" : "translateY(0)",
                transition: "transform 0.45s ease",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: sport.accent,
                  boxShadow: `0 0 10px ${sport.accent}`,
                  animation: "liveDot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  color: sport.accent,
                  textTransform: "uppercase",
                }}
              >
                {sport.tagline}
              </span>
            </div>
          </div>

          {/* Content side */}
          <div
            style={{
              order: isReversed ? 1 : 2,
              padding: "2.8rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Big number */}
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "5.5rem",
                fontWeight: 900,
                fontStyle: "italic",
                lineHeight: 1,
                marginBottom: "-0.8rem",
                background: `linear-gradient(135deg, ${sport.accent}55, transparent)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {sport.number}
            </div>

            {/* Sport name */}
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.8rem, 4vw, 4rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                color: "#f0f6ff",
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
                textShadow: hovered ? `0 0 50px ${sport.accentGlow}` : "none",
                transition: "text-shadow 0.5s ease",
              }}
            >
              {sport.name.toUpperCase()}
            </h3>

            {/* Expanding accent line */}
            <div
              style={{
                width: hovered ? "80px" : "36px",
                height: "3px",
                background: `linear-gradient(90deg, ${sport.accent}, transparent)`,
                boxShadow: `0 0 12px ${sport.accent}`,
                borderRadius: "2px",
                marginBottom: "1.2rem",
                transition: "width 0.5s ease",
              }}
            />

            {/* Description */}
            <p
              style={{
                color: "rgba(143,170,191,0.85)",
                fontSize: "0.88rem",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: "1.6rem",
              }}
            >
              {sport.description}
            </p>

            {/* Features */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "9px" }}
            >
              {sport.features.map((f, fi) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-14px)",
                    transition: `opacity 0.5s ease ${fi * 0.07 + 0.3}s, transform 0.5s ease ${fi * 0.07 + 0.3}s`,
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: "20px",
                      height: "20px",
                      borderRadius: "5px",
                      background: sport.accentDim,
                      border: `1px solid ${sport.accent}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `inset 0 1px 0 ${sport.accent}20`,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <polyline
                        points="2,5 4,7 8,3"
                        fill="none"
                        stroke={sport.accent}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      color: "rgba(143,170,191,0.82)",
                      fontSize: "0.8rem",
                      fontWeight: 400,
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom shimmer */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${sport.accent}70, ${sport.accent}, ${sport.accent}70, transparent)`,
            boxShadow: `0 0 20px ${sport.accentGlow}`,
            opacity: hovered ? 1 : 0.35,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* Floor shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "-28px",
          left: "8%",
          right: "8%",
          height: "50px",
          background: `radial-gradient(ellipse, ${sport.accentGlow} 0%, transparent 70%)`,
          filter: "blur(18px)",
          opacity: hovered ? 0.55 : 0.18,
          transition: "opacity 0.5s ease",
          zIndex: -1,
        }}
      />
    </div>
  );
}

export default function Sports() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="sports"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--night)" }}
    >
      {/* Section-level ambient blobs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "900px",
            height: "900px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
            top: "0%",
            left: "-25%",
            animation: "sBlob1 16s ease-in-out infinite",
            filter: "blur(70px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
            bottom: "0%",
            right: "-25%",
            animation: "sBlob2 20s ease-in-out infinite",
            filter: "blur(70px)",
          }}
        />
        {/* Diagonal grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(34,197,94,0.012) 60px, rgba(34,197,94,0.012) 61px)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: "4rem",
            textAlign: "center",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <p
            className="section-label mb-4"
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
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
            What We Offer
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
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              color: "var(--white)",
              letterSpacing: "-0.02em",
            }}
          >
            TWO SPORTS.
            <br />
            <span
              style={{
                color: "var(--turf)",
                fontStyle: "italic",
                textShadow: "0 0 60px rgba(34,197,94,0.4)",
              }}
            >
              ONE ARENA.
            </span>
          </h2>
          <p
            style={{
              color: "var(--mist)",
              fontSize: "0.95rem",
              maxWidth: "420px",
              margin: "1.2rem auto 0",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Dual-sport infrastructure, single world-class venue — engineered for
            every athlete.
          </p>
        </div>

        {/* Cards */}
        {sports.map((sport, i) => (
          <SportCard key={sport.id} sport={sport} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(70px,-50px) scale(1.15); }
          66% { transform: translate(-50px,70px) scale(0.9); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-60px,60px) scale(1.1); }
          66% { transform: translate(80px,-40px) scale(0.95); }
        }
        @keyframes blobC {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity:0.5; }
          50% { transform: translate(-50%,-50%) scale(1.5); opacity:1; }
        }
        @keyframes liveDot {
          0%,100% { opacity:1; box-shadow: 0 0 8px currentColor; }
          50% { opacity:0.5; box-shadow: 0 0 20px currentColor; }
        }
        @keyframes sBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(100px,80px) scale(1.1); }
        }
        @keyframes sBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-80px,-100px) scale(1.15); }
        }
        @media (max-width: 700px) {
          .sports-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
