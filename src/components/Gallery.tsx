"use client";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

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
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=700&q=80&auto=format&fit=crop",
    label: "Cricket Ground",
    sub: "Practice Nets",
    tags: ["cricket", "facility"],
    accent: "#f59e0b",
    span: "",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1695194643965-47ace39998ac?q=80&w=1026&auto=format&fit=crop",
    label: "5-a-side Match",
    sub: "Football Action",
    tags: ["football", "action"],
    accent: "#22c55e",
    span: "",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=1200&q=80&auto=format&fit=crop",
    label: "Premium Turf Surface",
    sub: "FIFA-Grade Synthetic",
    tags: ["facility", "football"],
    accent: "#22c55e",
    span: "col-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=700&q=80&auto=format&fit=crop",
    label: "Evening Training",
    sub: "Floodlit Session",
    tags: ["football", "action", "facility"],
    accent: "#22c55e",
    span: "",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1685541001104-91fe7ae1d8e1?q=80&w=1332&auto=format&fit=crop",
    label: "Cricket Match Day",
    sub: "Tournament",
    tags: ["cricket", "action"],
    accent: "#f59e0b",
    span: "",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=80&auto=format&fit=crop",
    label: "Group Training",
    sub: "Team Session",
    tags: ["football", "action"],
    accent: "#22c55e",
    span: "",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80&auto=format&fit=crop",
    label: "Sports Arena",
    sub: "Full Facility View",
    tags: ["facility"],
    accent: "#38bdf8",
    span: "col-span-2",
  },
];

/* ─── Lightbox ─── */
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: (typeof items)[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(2,6,10,0.93)",
        backdropFilter: "blur(18px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1rem,4vw,3rem)",
        animation: "lbFadeIn 0.3s ease forwards",
      }}
    >
      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(1000px, 95vw)",
          width: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: `0 60px 120px rgba(0,0,0,0.8), 0 0 80px ${item.accent}20`,
          border: `1px solid ${item.accent}25`,
          animation: "lbSlideUp 0.35s cubic-bezier(0.23,1,0.32,1) forwards",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9", background: "#040a12" }}>
          <Image src={item.src} alt={item.label} fill style={{ objectFit: "cover" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(2,6,10,0.9) 100%)",
          }} />
          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
            boxShadow: `0 0 20px ${item.accent}`,
          }} />
          {/* Info overlay */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "clamp(1rem,3vw,1.8rem)",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem",
          }}>
            <div>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.62rem",
                letterSpacing: "0.22em", color: item.accent,
                textTransform: "uppercase",
                background: `${item.accent}18`,
                border: `1px solid ${item.accent}35`,
                borderRadius: "4px",
                padding: "3px 9px",
                display: "inline-block",
                marginBottom: "0.5rem",
              }}>
                {item.sub}
              </span>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: "clamp(1.4rem,3.5vw,2.2rem)",
                color: "#f0f6ff", lineHeight: 1, letterSpacing: "0.02em",
              }}>{item.label}</h3>
            </div>
            {/* Tag pills */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              {item.tags.map((t) => (
                <span key={t} style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: "0.58rem",
                  letterSpacing: "0.14em", color: "rgba(143,170,191,0.85)",
                  background: "rgba(8,16,26,0.7)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px", padding: "3px 8px", textTransform: "uppercase",
                  backdropFilter: "blur(8px)",
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: "clamp(1rem,3vw,2rem)", right: "clamp(1rem,3vw,2rem)",
          width: "42px", height: "42px", borderRadius: "50%",
          background: "rgba(8,16,26,0.85)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f0f6ff", fontSize: "1.1rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s ease",
          zIndex: 10000,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "#22c55e55"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(8,16,26,0.85)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
      >✕</button>

      {/* Prev */}
      {hasPrev && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="lb-nav lb-prev">
          ‹
        </button>
      )}
      {/* Next */}
      {hasNext && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="lb-nav lb-next">
          ›
        </button>
      )}
    </div>
  );
}

/* ─── Gallery card ─── */
function GalleryCard({
  item,
  index,
  visible,
  onClick,
}: {
  item: (typeof items)[0];
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.93) translateY(22px)",
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${index * 0.07}s`,
        border: `1px solid ${hovered ? item.accent + "40" : "rgba(255,255,255,0.045)"}`,
        boxShadow: hovered
          ? `0 24px 65px rgba(0,0,0,0.65), 0 0 40px ${item.accent}1a`
          : "0 8px 28px rgba(0,0,0,0.35)",
        minHeight: "220px",
        height: "100%",
        background: "#06101a",
        willChange: "transform",
      }}
    >
      <Image
        src={item.src}
        alt={item.label}
        fill
        sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: hovered ? "scale(1.07)" : "scale(1.01)",
          transition: "transform 0.85s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Dark base */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(4,9,14,0.3)" }} />
      {/* Bottom vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 35%, rgba(4,9,14,0.95) 100%)",
        opacity: hovered ? 1 : 0.72,
        transition: "opacity 0.4s ease",
      }} />
      {/* Colour wash */}
      <div style={{
        position: "absolute", inset: 0,
        background: `${item.accent}09`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.45s ease",
        mixBlendMode: "screen",
      }} />
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, ${item.accent}cc, transparent)`,
        boxShadow: `0 0 12px ${item.accent}`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.007) 3px, rgba(255,255,255,0.007) 4px)",
        opacity: hovered ? 0 : 1,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Tag badge (appears on hover) */}
      <div style={{
        position: "absolute", top: "12px", left: "12px",
        background: "rgba(4,9,14,0.8)",
        backdropFilter: "blur(14px)",
        border: `1px solid ${item.accent}35`,
        borderRadius: "5px",
        padding: "4px 10px",
        transform: hovered ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.92)",
        opacity: hovered ? 1 : 0,
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
      }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: "0.58rem",
          letterSpacing: "0.2em", color: item.accent, textTransform: "uppercase",
        }}>
          {item.tags[0]}
        </span>
      </div>

      {/* Expand icon */}
      <div style={{
        position: "absolute", top: "12px", right: "12px",
        width: "30px", height: "30px",
        background: "rgba(4,9,14,0.7)",
        backdropFilter: "blur(10px)",
        border: `1px solid rgba(255,255,255,0.1)`,
        borderRadius: "6px",
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0.8)",
        transition: "all 0.35s ease",
        color: "rgba(240,246,255,0.8)",
        fontSize: "0.7rem",
      }}>⤢</div>

      {/* Bottom label */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "clamp(0.75rem,2vw,1rem) clamp(0.9rem,2.5vw,1.2rem)",
        transform: hovered ? "translateY(0)" : "translateY(5px)",
        transition: "transform 0.4s ease",
      }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(0.9rem,1.8vw,1.1rem)",
          color: "#f0f6ff", lineHeight: 1.1,
          letterSpacing: "0.03em", marginBottom: "3px",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 600, fontSize: "0.6rem",
          letterSpacing: "0.2em", color: item.accent,
          textTransform: "uppercase",
          opacity: hovered ? 1 : 0.55,
          transition: "opacity 0.3s ease",
          textShadow: `0 0 12px ${item.accent}`,
        }}>
          {item.sub}
        </p>
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayed, setDisplayed] = useState(items);
  const [animating, setAnimating] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
      setDisplayed(id === "all" ? items : items.filter((item) => item.tags.includes(id)));
      setAnimating(false);
    }, 280);
  };

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPhoto = useCallback(() => setLightboxIndex((i) => (i !== null && i < displayed.length - 1 ? i + 1 : i)), [displayed.length]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #060e18 0%, #04090f 100%)",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
          top: "-10%", right: "-15%", filter: "blur(65px)",
          animation: "gBlob1 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.045) 0%, transparent 70%)",
          bottom: "-10%", left: "-15%", filter: "blur(65px)",
          animation: "gBlob2 22s ease-in-out infinite",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(34,197,94,0.01) 80px, rgba(34,197,94,0.01) 81px),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(34,197,94,0.01) 80px, rgba(34,197,94,0.01) 81px)`,
        }} />
      </div>

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
        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "clamp(1.5rem,3vw,2.5rem)",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <p style={{
              display: "flex", alignItems: "center", gap: "10px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.7rem",
              letterSpacing: "0.25em", textTransform: "uppercase",
              color: "var(--turf, #22c55e)", marginBottom: "0.85rem",
            }}>
              <span style={{ width: "24px", height: "1px", background: "#22c55e", display: "inline-block" }} />
              Visual Highlights
            </p>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 900, color: "#f0f6ff",
              lineHeight: 0.9, letterSpacing: "-0.01em",
            }}>
              THE ARENA
              <br />
              <span style={{
                color: "var(--turf, #22c55e)",
                fontStyle: "italic",
                textShadow: "0 0 55px rgba(34,197,94,0.45)",
              }}>
                IN ACTION.
              </span>
            </h2>
          </div>
          <p style={{
            color: "rgba(143,170,191,0.72)", fontSize: "clamp(0.78rem,1.5vw,0.88rem)",
            maxWidth: "260px", lineHeight: 1.72, fontWeight: 300,
          }}>
            From floodlit night fixtures to elite training sessions — PowerPlay never stops.
          </p>
        </div>

        {/* ── Filter bar ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.45rem",
            marginBottom: "clamp(1.2rem,3vw,2rem)",
            alignItems: "center",
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
                  fontSize: "clamp(0.68rem,1.3vw,0.78rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "clamp(6px,1.2vw,8px) clamp(12px,2.5vw,18px)",
                  borderRadius: "6px",
                  border: isActive
                    ? "1px solid rgba(34,197,94,0.55)"
                    : "1px solid rgba(255,255,255,0.07)",
                  background: isActive
                    ? "rgba(34,197,94,0.12)"
                    : "rgba(255,255,255,0.025)",
                  color: isActive ? "#22c55e" : "rgba(143,170,191,0.65)",
                  cursor: "pointer",
                  boxShadow: isActive
                    ? "0 0 22px rgba(34,197,94,0.15), inset 0 1px 0 rgba(34,197,94,0.12)"
                    : "none",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "#f0f6ff";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(143,170,191,0.65)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  }
                }}
              >
                {f.label}
              </button>
            );
          })}

          {/* Count pill */}
          <div style={{
            marginLeft: "auto",
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.18)",
            borderRadius: "6px",
            padding: "6px 12px",
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontStyle: "italic",
              fontSize: "clamp(1rem,2vw,1.35rem)", color: "#22c55e",
              lineHeight: 1, textShadow: "0 0 14px rgba(34,197,94,0.6)",
            }}>
              {displayed.length}
            </span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.6rem",
              letterSpacing: "0.15em", color: "rgba(143,170,191,0.7)",
              textTransform: "uppercase",
            }}>
              Photos
            </span>
          </div>
        </div>

        {/* ── Masonry grid ── */}
        <div
          className="gallery-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "clamp(160px,18vw,220px)",
            gap: "clamp(6px,1.2vw,12px)",
            opacity: animating ? 0 : 1,
            transform: animating ? "scale(0.98) translateY(6px)" : "scale(1) translateY(0)",
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}
        >
          {displayed.map((item, i) => {
            const isFiltered = activeFilter !== "all";
            let gridColumn = "span 1";
            let gridRow = "span 1";
            if (!isFiltered) {
              if (item.span === "col-span-2 row-span-2") {
                gridColumn = "span 2"; gridRow = "span 2";
              } else if (item.span === "col-span-2") {
                gridColumn = "span 2";
              }
            }
            return (
              <div key={item.id} style={{ gridColumn, gridRow }}>
                <GalleryCard
                  item={item}
                  index={i}
                  visible={!animating && headerVisible}
                  onClick={() => openLightbox(i)}
                />
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {displayed.length === 0 && (
          <div style={{
            textAlign: "center", padding: "5rem 2rem",
            animation: "fadeIn 0.4s ease forwards",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem", filter: "grayscale(1) opacity(0.5)" }}>📷</div>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "1.1rem",
              color: "rgba(143,170,191,0.5)", letterSpacing: "0.1em",
            }}>
              No photos in this category yet
            </p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          item={displayed[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < displayed.length - 1}
        />
      )}

      <style>{`
        @keyframes gBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-60px,80px) scale(1.1); }
        }
        @keyframes gBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(80px,-60px) scale(1.15); }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes lbSlideUp {
          from { opacity: 0; transform: scale(0.94) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        /* Lightbox nav arrows */
        .lb-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(8,16,26,0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f0f6ff;
          font-size: 1.6rem;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          transition: all 0.2s ease;
        }
        .lb-nav:hover {
          background: rgba(34,197,94,0.2);
          border-color: rgba(34,197,94,0.4);
          transform: translateY(-50%) scale(1.08);
        }
        .lb-prev { left: clamp(0.5rem,2vw,1.5rem); }
        .lb-next { right: clamp(0.5rem,2vw,1.5rem); }

        /* ── TABLET (≤ 860px) ── */
        @media (max-width: 860px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* ── MOBILE (≤ 520px) ── */
        @media (max-width: 520px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: opacity 0.2s ease !important; }
        }
      `}</style>
    </section>
  );
}