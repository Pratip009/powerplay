"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const filters = [
  { id: "all", label: "All" },
  { id: "football", label: "⚽ Football" },
  { id: "cricket", label: "🏏 Cricket" },
  { id: "facility", label: "🏟 Facility" },
  { id: "action", label: "🔥 Action" },
];

const items = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80&auto=format&fit=crop",
    label: "Floodlit Night Match",
    sub: "Football Pitch",
    tags: ["football", "action"],
    accent: "#22c55e",
    span: "col-span-2 row-span-2",
    height: "100%",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=700&q=80&auto=format&fit=crop",
    label: "Cricket Ground",
    sub: "Practice Nets",
    tags: ["cricket", "facility"],
    accent: "#f59e0b",
    span: "",
    height: "100%",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1695194643965-47ace39998ac?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "5-a-side Match",
    sub: "Football Action",
    tags: ["football", "action"],
    accent: "#22c55e",
    span: "",
    height: "100%",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=1200&q=80&auto=format&fit=crop",
    label: "Premium Turf Surface",
    sub: "FIFA-Grade Synthetic",
    tags: ["facility", "football"],
    accent: "#22c55e",
    span: "col-span-2",
    height: "100%",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=700&q=80&auto=format&fit=crop",
    label: "Evening Training",
    sub: "Floodlit Session",
    tags: ["football", "action", "facility"],
    accent: "#22c55e",
    span: "",
    height: "100%",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1685541001104-91fe7ae1d8e1?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Cricket Match Day",
    sub: "Tournament",
    tags: ["cricket", "action"],
    accent: "#f59e0b",
    span: "",
    height: "100%",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=80&auto=format&fit=crop",
    label: "Group Training",
    sub: "Team Session",
    tags: ["football", "action"],
    accent: "#22c55e",
    span: "",
    height: "100%",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&auto=format&fit=crop",
    label: "Sports Arena",
    sub: "Full Facility View",
    tags: ["facility"],
    accent: "#38bdf8",
    span: "col-span-2",
    height: "100%",
  },
];

function GalleryCard({
  item,
  index,
  visible,
}: {
  item: (typeof items)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${index * 0.07}s`,
        border: `1px solid ${hovered ? item.accent + "40" : "rgba(255,255,255,0.05)"}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${item.accent}20`
          : "0 8px 30px rgba(0,0,0,0.3)",
        minHeight: "220px",
        background: "#08101a",
      }}
    >
      <Image
        src={item.src}
        alt={item.label}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Base overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,14,0.35)" }} />
      {/* Bottom gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 40%, rgba(5,10,14,0.92) 100%)",
        opacity: hovered ? 1 : 0.7,
        transition: "opacity 0.4s ease",
      }} />
      {/* Colour tint on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: `${item.accent}08`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        mixBlendMode: "screen",
      }} />

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, ${item.accent}, transparent)`,
        boxShadow: `0 0 10px ${item.accent}`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      {/* Tag badge */}
      <div style={{
        position: "absolute", top: "12px", left: "12px",
        background: "rgba(5,10,14,0.75)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${item.accent}35`,
        borderRadius: "6px",
        padding: "4px 10px",
        transform: hovered ? "translateY(0)" : "translateY(-4px)",
        opacity: hovered ? 1 : 0,
        transition: "all 0.35s ease",
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: "0.6rem",
          letterSpacing: "0.2em", color: item.accent, textTransform: "uppercase",
        }}>
          {item.tags[0]}
        </span>
      </div>

      {/* Bottom label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1rem 1.2rem",
        transform: hovered ? "translateY(0)" : "translateY(6px)",
        transition: "transform 0.4s ease",
      }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800, fontSize: "1.1rem",
          color: "#f0f6ff", lineHeight: 1.1,
          letterSpacing: "0.03em", marginBottom: "2px",
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600, fontSize: "0.65rem",
          letterSpacing: "0.2em", color: item.accent,
          textTransform: "uppercase",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s ease",
        }}>
          {item.sub}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayed, setDisplayed] = useState(items);
  const [animating, setAnimating] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleFilter = (id: string) => {
    if (id === activeFilter || animating) return;
    setAnimating(true);
    setActiveFilter(id);
    setTimeout(() => {
      setDisplayed(
        id === "all" ? items : items.filter((item) => item.tags.includes(id))
      );
      setAnimating(false);
    }, 300);
  };

  return (
    <section
      id="gallery"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--night-2)" }}
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
          top: "-10%", right: "-15%", filter: "blur(60px)",
          animation: "gBlob1 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
          bottom: "-10%", left: "-15%", filter: "blur(60px)",
          animation: "gBlob2 22s ease-in-out infinite",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "2.5rem",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <p className="section-label mb-3">Visual Highlights</p>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 900, color: "var(--white)",
              lineHeight: 0.92, letterSpacing: "-0.01em",
            }}>
              THE ARENA
              <br />
              <span style={{ color: "var(--turf)", fontStyle: "italic", textShadow: "0 0 50px rgba(34,197,94,0.4)" }}>
                IN ACTION.
              </span>
            </h2>
          </div>
          <p style={{
            color: "var(--mist)", fontSize: "0.88rem",
            maxWidth: "260px", lineHeight: 1.7, fontWeight: 300,
          }}>
            From floodlit night fixtures to elite training sessions — PowerPlay never stops.
          </p>
        </div>

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2rem",
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.15s",
          }}
        >
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFilter(f.id)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: isActive
                    ? "1px solid rgba(34,197,94,0.6)"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: isActive
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(255,255,255,0.03)",
                  color: isActive ? "#22c55e" : "rgba(143,170,191,0.7)",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 0 20px rgba(34,197,94,0.15)" : "none",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "#f0f6ff";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(143,170,191,0.7)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  }
                }}
              >
                {f.label}
              </button>
            );
          })}

          {/* Count */}
          <div style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontStyle: "italic",
              fontSize: "1.4rem", color: "#22c55e",
              lineHeight: 1,
            }}>
              {displayed.length}
            </span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, fontSize: "0.65rem",
              letterSpacing: "0.15em", color: "var(--mist)",
              textTransform: "uppercase",
            }}>
              Photos
            </span>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "200px",
            gap: "12px",
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(0.98)" : "scale(1)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
          className="gallery-grid"
        >
          {displayed.map((item, i) => {
            // Determine grid span based on item
            let gridColumn = "span 1";
            let gridRow = "span 1";

            if (item.span === "col-span-2 row-span-2") {
              gridColumn = "span 2";
              gridRow = "span 2";
            } else if (item.span === "col-span-2") {
              gridColumn = "span 2";
            }

            // When filtered, don't use spans to avoid gaps
            const isFiltered = activeFilter !== "all";
            if (isFiltered) {
              gridColumn = "span 1";
              gridRow = "span 1";
            }

            return (
              <div
                key={item.id}
                style={{ gridColumn, gridRow }}
              >
                <GalleryCard item={item} index={i} visible={!animating && headerVisible} />
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {displayed.length === 0 && (
          <div style={{
            textAlign: "center", padding: "5rem 2rem",
            opacity: 1, transition: "opacity 0.3s ease",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📷</div>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "1.2rem",
              color: "var(--mist)", letterSpacing: "0.1em",
            }}>
              No photos in this category yet
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-60px,80px) scale(1.1); }
        }
        @keyframes gBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(80px,-60px) scale(1.15); }
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 180px !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}