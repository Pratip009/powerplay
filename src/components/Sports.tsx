/* eslint-disable @typescript-eslint/no-explicit-any */
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
    icon: "⚽",
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
    icon: "🏏",
  },
  {
    id: "pickleball",
    name: "Pickleball",
    tagline: "Indoor & outdoor courts",
    description:
      "Experience the fastest-growing sport on premium cushioned courts designed for agility, precision, and comfort. Whether you're a beginner or a competitive player, our pickleball courts offer optimal grip, consistent bounce, and professional lighting for day and night matches.",
    features: [
      "Professional pickleball court surface",
      "Cushioned anti-slip flooring",
      "LED floodlighting system",
      "Tournament-standard net setup",
      "Paddles & balls available on request",
      "Coaching & group sessions available",
    ],
    image:
      "https://images.unsplash.com/photo-1723004714201-cf224222b897?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Pickleball court",
    accent: "#3b82f6",
    accentDim: "rgba(59,130,246,0.12)",
    accentGlow: "rgba(59,130,246,0.35)",
    number: "03",
    icon: "🏓",
  },
];

/* ─── Floating neon background icon ─── */
function FloatingIcon({
  emoji,
  style,
  animClass,
}: {
  emoji: string;
  style: React.CSSProperties;
  animClass: string;
}) {
  return (
    <div className={`floating-icon ${animClass}`} style={style}>
      {emoji}
    </div>
  );
}

/* ─── Individual sport card ─── */
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

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.06 },
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
    setTilt({ x: y * 8, y: x * -8 });
  };

  return (
    <div
      ref={wrapRef}
      className="sport-card-wrap"
      style={{
        perspective: "1400px",
        marginBottom: "clamp(3rem, 6vw, 5rem)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(70px)",
        transition: `opacity 0.9s ease ${index * 0.18}s, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${index * 0.18}s`,
        position: "relative",
      }}
    >
      {/* Tilt wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHovered(false);
        }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.012 : 1})`,
          transition: hovered
            ? "transform 0.08s linear"
            : "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: "clamp(10px,2vw,16px)",
          overflow: "hidden",
          background: "linear-gradient(145deg, #0b1520 0%, #06101a 100%)",
          border: `1px solid ${sport.accent}28`,
          boxShadow: hovered
            ? `0 40px 90px rgba(0,0,0,0.75), 0 0 70px ${sport.accentGlow}, inset 0 1px 0 ${sport.accent}35`
            : `0 16px 50px rgba(0,0,0,0.5), inset 0 1px 0 ${sport.accent}15`,
        }}
      >
        {/* Animated blob layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${sport.accent}14 0%, transparent 70%)`,
              top: "-160px",
              [isReversed ? "right" : "left"]: "-160px",
              animation: "blobA 9s ease-in-out infinite",
              filter: "blur(55px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${sport.accent}09 0%, transparent 70%)`,
              bottom: "-130px",
              [isReversed ? "left" : "right"]: "-130px",
              animation: "blobB 13s ease-in-out infinite",
              filter: "blur(45px)",
            }}
          />
          {/* Scanline texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
              pointerEvents: "none",
            }}
          />
          {/* Grid lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.06,
            }}
            viewBox="0 0 800 480"
            preserveAspectRatio="xMidYMid slice"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <line
                key={`v${i}`}
                x1={i * 100}
                y1="0"
                x2={i * 100}
                y2="480"
                stroke={sport.accent}
                strokeWidth="0.5"
              />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 120}
                x2="800"
                y2={i * 120}
                stroke={sport.accent}
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        {/* Two-column layout (stacks on mobile) */}
        <div className="card-grid" data-reversed={isReversed}>
          {/* ── Image side ── */}
          <div
            className="card-image-side"
            style={{ order: isReversed ? 2 : 1 }}
          >
            <Image
              src={sport.image}
              alt={sport.imageAlt}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                transform: hovered ? "scale(1.07)" : "scale(1)",
                transition: "transform 1s cubic-bezier(0.23,1,0.32,1)",
              }}
            />
            {/* Gradient overlay toward content */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isReversed
                  ? "linear-gradient(270deg, #06101a 0%, rgba(6,16,26,0.5) 55%, rgba(6,16,26,0.0) 100%)"
                  : "linear-gradient(90deg, #06101a 0%, rgba(6,16,26,0.5) 55%, rgba(6,16,26,0.0) 100%)",
              }}
            />
            {/* Top-to-bottom vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(6,16,26,0.4) 0%, transparent 25%, transparent 65%, rgba(6,16,26,0.8) 100%)",
              }}
            />
            {/* Colour wash */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `${sport.accent}07`,
                mixBlendMode: "screen",
              }}
            />
            {/* Ghost number on image */}
            <div
              className="ghost-number"
              style={{
                bottom: "-20px",
                [isReversed ? "left" : "right"]: "-6px",
                color: `${sport.accent}0d`,
              }}
            >
              {sport.number}
            </div>
            {/* Floating pill badge */}
            <div
              className="pill-badge"
              style={{
                top: "16px",
                [isReversed ? "right" : "left"]: "16px",
                border: `1px solid ${sport.accent}45`,
                boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 18px ${sport.accentGlow}`,
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
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
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.66rem",
                  letterSpacing: "0.18em",
                  color: sport.accent,
                  textTransform: "uppercase",
                }}
              >
                {sport.tagline}
              </span>
            </div>

            {/* Big emoji icon on image corner */}
            <div
              className="card-emoji-badge"
              style={{
                bottom: "16px",
                [isReversed ? "right" : "left"]: "16px",
                boxShadow: `0 0 40px ${sport.accentGlow}, 0 8px 24px rgba(0,0,0,0.6)`,
                border: `1px solid ${sport.accent}30`,
                animation: "floatJump 3.5s ease-in-out infinite",
              }}
            >
              {sport.icon}
            </div>
          </div>

          {/* ── Content side ── */}
          <div
            className="card-content-side"
            style={{ order: isReversed ? 1 : 2 }}
          >
            {/* Big accent number */}
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(3.5rem,6vw,5.5rem)",
                fontWeight: 900,
                fontStyle: "italic",
                lineHeight: 1,
                marginBottom: "-0.6rem",
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
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 0.88,
                color: "#f0f6ff",
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
                textShadow: hovered ? `0 0 55px ${sport.accentGlow}` : "none",
                transition: "text-shadow 0.5s ease",
              }}
            >
              {sport.name.toUpperCase()}
            </h3>

            {/* Accent line */}
            <div
              style={{
                width: hovered ? "80px" : "34px",
                height: "3px",
                background: `linear-gradient(90deg, ${sport.accent}, transparent)`,
                boxShadow: `0 0 14px ${sport.accent}`,
                borderRadius: "2px",
                marginBottom: "1.1rem",
                transition: "width 0.55s ease",
              }}
            />

            {/* Description */}
            <p
              style={{
                color: "rgba(143,170,191,0.82)",
                fontSize: "clamp(0.78rem, 1.5vw, 0.88rem)",
                lineHeight: 1.85,
                fontWeight: 300,
                marginBottom: "1.5rem",
              }}
            >
              {sport.description}
            </p>

            {/* Feature list */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {sport.features.map((f, fi) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.5s ease ${fi * 0.08 + 0.35}s, transform 0.5s ease ${fi * 0.08 + 0.35}s`,
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
                      color: "rgba(143,170,191,0.8)",
                      fontSize: "clamp(0.72rem, 1.4vw, 0.8rem)",
                      fontWeight: 400,
                    }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <button
              className="card-cta"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              style={{
                marginTop: "1.8rem",
                background: `linear-gradient(135deg, ${sport.accent}22, ${sport.accent}08)`,
                border: `1px solid ${sport.accent}45`,
                color: sport.accent,
                boxShadow: hovered ? `0 0 28px ${sport.accentGlow}` : "none",
                transition: "all 0.4s ease",
              }}
            >
              <span>Book {sport.name}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ marginLeft: "8px", transition: "transform 0.3s ease" }}
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${sport.accent}70, ${sport.accent}, ${sport.accent}70, transparent)`,
            boxShadow: `0 0 22px ${sport.accentGlow}`,
            opacity: hovered ? 1 : 0.3,
            transition: "opacity 0.4s ease",
          }}
        />
      </div>

      {/* Floor shadow glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-28px",
          left: "8%",
          right: "8%",
          height: "55px",
          background: `radial-gradient(ellipse, ${sport.accentGlow} 0%, transparent 70%)`,
          filter: "blur(20px)",
          opacity: hovered ? 0.55 : 0.16,
          transition: "opacity 0.5s ease",
          zIndex: -1,
        }}
      />
    </div>
  );
}

/* ─── Main section ─── */
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

  /* Floating background neon icons config */
  const floatingIcons = [
    {
      emoji: "⚽",
      top: "8%",
      left: "4%",
      size: "2.8rem",
      anim: "jumpA",
      delay: "0s",
      blur: 0,
    },
    {
      emoji: "🏏",
      top: "12%",
      right: "6%",
      size: "2.4rem",
      anim: "jumpB",
      delay: "0.6s",
      blur: 0,
    },
    {
      emoji: "🔥",
      top: "35%",
      left: "2%",
      size: "1.9rem",
      anim: "jumpC",
      delay: "1.1s",
      blur: 1,
    },
    {
      emoji: "🏆",
      top: "55%",
      right: "3%",
      size: "2.2rem",
      anim: "jumpA",
      delay: "0.3s",
      blur: 0,
    },
    {
      emoji: "⚡",
      top: "72%",
      left: "6%",
      size: "2rem",
      anim: "jumpB",
      delay: "1.8s",
      blur: 1,
    },
    {
      emoji: "🌿",
      top: "80%",
      right: "7%",
      size: "2.1rem",
      anim: "jumpC",
      delay: "0.9s",
      blur: 0,
    },
    {
      emoji: "⚽",
      top: "90%",
      left: "40%",
      size: "1.6rem",
      anim: "jumpA",
      delay: "2.2s",
      blur: 2,
    },
    {
      emoji: "🌙",
      top: "22%",
      left: "50%",
      size: "1.7rem",
      anim: "jumpB",
      delay: "1.5s",
      blur: 2,
    },
    {
      emoji: "💫",
      top: "62%",
      left: "25%",
      size: "1.5rem",
      anim: "jumpC",
      delay: "0.4s",
      blur: 2,
    },
    {
      emoji: "🏏",
      top: "46%",
      right: "12%",
      size: "1.8rem",
      anim: "jumpA",
      delay: "1.2s",
      blur: 1,
    },
  ];

  return (
    <section
      id="sports"
      className="relative overflow-hidden"
      style={{
        background: "var(--night, #040a12)",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      {/* ── Section-level ambient blobs ── */}
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
              "radial-gradient(circle, rgba(34,197,94,0.055) 0%, transparent 70%)",
            top: "-5%",
            left: "-25%",
            animation: "sBlob1 17s ease-in-out infinite",
            filter: "blur(75px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.055) 0%, transparent 70%)",
            bottom: "-5%",
            right: "-25%",
            animation: "sBlob2 22s ease-in-out infinite",
            filter: "blur(75px)",
          }}
        />
        {/* Diagonal stripe texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(34,197,94,0.011) 60px, rgba(34,197,94,0.011) 61px)`,
          }}
        />
        {/* Noise grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
            opacity: 0.022,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* ── Floating neon background icons ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {floatingIcons.map((ic, i) => {
          const posStyle: React.CSSProperties = {
            position: "absolute",
            fontSize: ic.size,
            filter: `drop-shadow(0 0 18px rgba(34,197,94,0.55)) drop-shadow(0 0 35px rgba(34,197,94,0.25)) blur(${ic.blur}px)`,
            opacity: ic.blur > 0 ? 0.35 : 0.6,
            animationName: ic.anim,
            animationDuration: "4s",
            animationTimingFunction: "cubic-bezier(0.45,0,0.55,1)",
            animationIterationCount: "infinite",
            animationDelay: ic.delay,
            userSelect: "none",
            lineHeight: 1,
          };
          if ("right" in ic) {
            (posStyle as any).right = (ic as any).right;
          } else {
            posStyle.left = (ic as any).left;
          }
          posStyle.top = ic.top;
          return (
            <div key={i} style={posStyle}>
              {ic.emoji}
            </div>
          );
        })}
      </div>

      {/* ── Main content ── */}
      <div
        className="relative"
        style={{
          zIndex: 2,
          maxWidth: "72rem",
          margin: "0 auto",
          paddingLeft: "clamp(1rem, 5vw, 2.5rem)",
          paddingRight: "clamp(1rem, 5vw, 2.5rem)",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: "clamp(2.5rem,5vw,4rem)",
            textAlign: "center",
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
              fontSize: "0.72rem",
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
            What We Offer
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
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.88,
              color: "#f0f6ff",
              letterSpacing: "-0.02em",
              marginBottom: "0",
            }}
          >
            THREE SPORTS.
            <br />
            <span
              style={{
                color: "var(--turf, #22c55e)",
                fontStyle: "italic",
                textShadow: "0 0 70px rgba(34,197,94,0.45)",
              }}
            >
              ONE ARENA.
            </span>
          </h2>
          <p
            style={{
              color: "rgba(143,170,191,0.75)",
              fontSize: "clamp(0.82rem, 1.6vw, 0.95rem)",
              maxWidth: "400px",
              margin: "1.2rem auto 0",
              lineHeight: 1.75,
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

      {/* ── All keyframes & responsive styles ── */}
      <style>{`
        /* Vertical jump animations — 3 variants for variety */
        @keyframes jumpA {
          0%,100% { transform: translateY(0px) rotate(-3deg) scale(1); }
          25%      { transform: translateY(-22px) rotate(2deg) scale(1.08); }
          55%      { transform: translateY(-8px) rotate(-1deg) scale(1.03); }
          75%      { transform: translateY(-18px) rotate(3deg) scale(1.06); }
        }
        @keyframes jumpB {
          0%,100% { transform: translateY(0px) rotate(2deg) scale(1); }
          30%      { transform: translateY(-28px) rotate(-3deg) scale(1.1); }
          60%      { transform: translateY(-6px) rotate(1deg) scale(1.02); }
          80%      { transform: translateY(-20px) rotate(-2deg) scale(1.07); }
        }
        @keyframes jumpC {
          0%,100% { transform: translateY(0px) rotate(0deg) scale(1); }
          20%      { transform: translateY(-16px) rotate(-4deg) scale(1.06); }
          50%      { transform: translateY(-30px) rotate(4deg) scale(1.12); }
          70%      { transform: translateY(-10px) rotate(-2deg) scale(1.04); }
        }

        /* Card emoji badge jump */
        @keyframes floatJump {
          0%,100% { transform: translateY(0px) scale(1); }
          45%      { transform: translateY(-12px) scale(1.1); }
          65%      { transform: translateY(-5px) scale(1.04); }
        }

        /* Blob / card animations */
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(70px,-50px) scale(1.15); }
          66%      { transform: translate(-50px,70px) scale(0.9); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-60px,60px) scale(1.1); }
          66%      { transform: translate(80px,-40px) scale(0.95); }
        }
        @keyframes liveDot {
          0%,100% { opacity:1; box-shadow:0 0 8px currentColor; }
          50%      { opacity:0.45; box-shadow:0 0 22px currentColor; }
        }
        @keyframes sBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(100px,80px) scale(1.1); }
        }
        @keyframes sBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-80px,-100px) scale(1.15); }
        }

        /* ── Card layout ── */
        .card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 460px;
          position: relative;
          z-index: 1;
        }

        .card-image-side {
          position: relative;
          overflow: hidden;
          min-height: 320px;
        }

        .card-content-side {
          padding: clamp(1.6rem, 4vw, 2.8rem) clamp(1.4rem, 3.5vw, 2.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Ghost number */
        .ghost-number {
          position: absolute;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(6rem, 12vw, 11rem);
          font-weight: 900;
          font-style: italic;
          line-height: 1;
          user-select: none;
          pointer-events: none;
        }

        /* Pill badge */
        .pill-badge {
          position: absolute;
          background: rgba(4,9,16,0.82);
          backdrop-filter: blur(16px);
          border-radius: 8px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Emoji badge on image */
        .card-emoji-badge {
          position: absolute;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          background: rgba(6,16,26,0.75);
          backdrop-filter: blur(12px);
          border-radius: 12px;
          padding: 10px 14px;
          line-height: 1;
        }

        /* CTA button */
        .card-cta {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 0.65rem 1.4rem;
          border-radius: 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: clamp(0.78rem, 1.5vw, 0.88rem);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }
        .card-cta:hover svg {
          transform: translateX(4px);
        }

        /* ── TABLET (≤ 900px) ── */
        @media (max-width: 900px) {
          .card-grid {
            grid-template-columns: 1fr 1.15fr;
            min-height: 380px;
          }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .card-grid {
            grid-template-columns: 1fr !important;
          }
          .card-image-side {
            order: 1 !important;
            min-height: 220px;
          }
          .card-content-side {
            order: 2 !important;
          }
          /* On mobile reverse the side gradients to top-to-bottom */
          .card-grid[data-reversed="true"] .card-image-side,
          .card-grid[data-reversed="false"] .card-image-side {
            /* handled via JS already for the image overlay, just ensure stacking */
          }
          .ghost-number {
            font-size: 5.5rem;
          }
          .pill-badge {
            padding: 6px 11px;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *[style*="animation"] { animation: none !important; }
          .floating-icon { animation: none !important; opacity: 0.3 !important; }
        }
      `}</style>
    </section>
  );
}
