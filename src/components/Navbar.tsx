"use client";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Facilities", href: "#facilities", num: "01", icon: "🏟" },
  { label: "Sports", href: "#sports", num: "02", icon: "⚽" },
  { label: "Gallery", href: "#gallery", num: "03", icon: "📸" },
  { label: "About", href: "#about", num: "04", icon: "🌿" },
  { label: "Contact", href: "#contact", num: "05", icon: "✉️" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const [mounted, setMounted]     = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defer setMounted to avoid synchronous setState-in-effect lint error
    const id = setTimeout(() => setMounted(true), 0);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ─── Main navbar strip ─── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: scrolled ? "0.75rem 0" : "1.25rem 0",
          background: scrolled
            ? "rgba(3,8,14,0.88)"
            : "linear-gradient(180deg, rgba(3,8,14,0.7) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled ? "1px solid rgba(34,197,94,0.1)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
          transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div style={{
          maxWidth: "88rem", margin: "0 auto",
          paddingLeft: "clamp(1rem,5vw,2.5rem)",
          paddingRight: "clamp(1rem,5vw,2.5rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <a
            href="#"
            style={{
              display: "flex", alignItems: "center",
              gap: "clamp(8px,1.5vw,12px)",
              textDecoration: "none",
              position: "relative", zIndex: 1001,
            }}
          >
            <div style={{
              width: "clamp(34px,5vw,40px)",
              height: "clamp(34px,5vw,40px)",
              borderRadius: "9px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 22px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
              flexShrink: 0,
              animation: "logoPulse 3s ease-in-out infinite",
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <polygon points="3,17 10,3 17,17" fill="white" opacity="0.95"/>
                <polygon points="6,17 10,9 14,17" fill="rgba(0,0,0,0.28)"/>
              </svg>
            </div>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, letterSpacing: "0.07em",
              fontSize: "clamp(1rem,2.5vw,1.25rem)",
              color: "#f0f6ff",
              lineHeight: 1,
            }}>
              POWER<span style={{ color: "#22c55e", textShadow: "0 0 16px rgba(34,197,94,0.5)" }}>PLAY</span>
            </span>
          </a>

          {/* Right side: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.8rem,2vw,1.2rem)" }}>
            {/* CTA — hidden on mobile */}
            <div className="nav-cta-wrap">
              <NavCTA />
            </div>

            {/* Hamburger — always visible */}
            <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
      </nav>

      {/* ─── Fullscreen right-slide overlay menu ─── */}
      <MenuOverlay open={menuOpen} onClose={close} activeLink={activeLink} setActiveLink={setActiveLink} />

      <style>{`
        @keyframes logoPulse {
          0%,100% { box-shadow: 0 0 22px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.2); }
          50%      { box-shadow: 0 0 38px rgba(34,197,94,0.7), inset 0 1px 0 rgba(255,255,255,0.2); }
        }
        .nav-cta-wrap { display: none; }
        @media (min-width: 640px) {
          .nav-cta-wrap { display: block; }
        }
      `}</style>
    </>
  );
}

/* ─── CTA Button ─── */
function NavCTA() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#contact"

      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(0.7rem,1.2vw,0.78rem)",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        textDecoration: "none",
        color: hovered ? "#040a12" : "#22c55e",
        background: hovered
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "transparent",
        border: "1px solid rgba(34,197,94,0.5)",
        padding: "0.55rem clamp(0.9rem,2vw,1.3rem)",
        borderRadius: "7px",
        display: "flex", alignItems: "center", gap: "6px",
        boxShadow: hovered ? "0 0 28px rgba(34,197,94,0.4)" : "none",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        whiteSpace: "nowrap",
      }}
    >
      Book Now
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
        style={{ transform: hovered ? "translateX(2px)" : "translateX(0)", transition: "transform 0.3s ease" }}>
        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─── Animated hamburger button ─── */
function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        position: "relative", zIndex: 1001,
        width: "clamp(40px,6vw,46px)",
        height: "clamp(40px,6vw,46px)",
        borderRadius: "10px",
        background: open
          ? "rgba(34,197,94,0.12)"
          : hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${open ? "rgba(34,197,94,0.4)" : hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "5px", cursor: "pointer",
        boxShadow: open ? "0 0 20px rgba(34,197,94,0.2)" : "none",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          display: "block",
          width: i === 1 ? (open ? "0px" : hovered ? "14px" : "18px") : "18px",
          height: "1.5px",
          background: open ? "#22c55e" : "#f0f6ff",
          borderRadius: "2px",
          transformOrigin: "center",
          transform: open
            ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
            : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
            : "scaleX(0)"
            : "none",
          opacity: open ? (i === 1 ? 0 : 1) : 1,
          transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: open ? "0 0 6px rgba(34,197,94,0.6)" : "none",
        }}/>
      ))}
    </button>
  );
}

/* ─── Full-screen right-slide overlay ─── */
function MenuOverlay({
  open, onClose, activeLink, setActiveLink,
}: {
  open: boolean;
  onClose: () => void;
  activeLink: string;
  setActiveLink: (s: string) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 998,
          background: "rgba(2,6,10,0.75)",
          backdropFilter: open ? "blur(6px)" : "blur(0px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.5s ease, backdrop-filter 0.5s ease",
        }}
      />

      {/* Slide panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        zIndex: 999,
        width: "min(520px, 100vw)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.65s cubic-bezier(0.76,0,0.24,1)",
        display: "flex", flexDirection: "column",
        background: "linear-gradient(135deg, #060f1a 0%, #03080f 100%)",
        borderLeft: "1px solid rgba(34,197,94,0.12)",
        boxShadow: open ? "-30px 0 80px rgba(0,0,0,0.7)" : "none",
        overflow: "hidden",
      }}>

        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, #22c55e, #4ade80, transparent)",
          boxShadow: "0 0 20px rgba(34,197,94,0.5)",
          opacity: open ? 1 : 0,
          transition: "opacity 0.5s ease 0.3s",
        }}/>

        {/* Background decoration */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden",
        }}>
          {/* Ghost sport number */}
          <div style={{
            position: "absolute", bottom: "-2rem", right: "-1rem",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(14rem,28vw,20rem)",
            fontWeight: 900, fontStyle: "italic",
            color: "rgba(34,197,94,0.018)",
            lineHeight: 1, userSelect: "none",
            letterSpacing: "-0.04em",
          }}>PP</div>
          {/* Ambient blob */}
          <div style={{
            position: "absolute", top: "-10%", right: "-20%",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
            filter: "blur(50px)",
            animation: open ? "menuBlob 8s ease-in-out infinite" : "none",
          }}/>
          <div style={{
            position: "absolute", bottom: "10%", left: "-10%",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
            filter: "blur(45px)",
            animation: open ? "menuBlob2 11s ease-in-out infinite" : "none",
          }}/>
          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.006) 3px, rgba(255,255,255,0.006) 4px)",
          }}/>
          {/* Vertical grid lines */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(34,197,94,0.018) 60px, rgba(34,197,94,0.018) 61px)",
          }}/>
        </div>

        {/* Panel header */}
        <div style={{
          padding: "clamp(1.2rem,3vw,1.8rem) clamp(1.5rem,4vw,2.5rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative", zIndex: 1,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateX(0)" : "translateX(20px)",
            transition: "opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s",
          }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.62rem",
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(34,197,94,0.6)", marginBottom: "2px",
            }}>Navigation</p>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: "clamp(1rem,2.5vw,1.2rem)",
              color: "#f0f6ff", letterSpacing: "0.06em",
            }}>POWERPLAY</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              width: "40px", height: "40px", borderRadius: "9px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(143,170,191,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "1rem",
              transition: "all 0.25s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,197,94,0.35)";
              (e.currentTarget as HTMLElement).style.color = "#22c55e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.color = "rgba(143,170,191,0.7)";
            }}
          >✕</button>
        </div>

        {/* Nav links */}
        <nav style={{
          flex: 1, padding: "clamp(1.5rem,4vw,2.5rem) clamp(1.5rem,4vw,2.5rem) 1rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: "clamp(0.2rem,1vh,0.4rem)",
          position: "relative", zIndex: 1,
        }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { setActiveLink(link.href); onClose(); }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex", alignItems: "center",
                gap: "clamp(0.8rem,2vw,1.2rem)",
                padding: "clamp(0.9rem,2.5vh,1.3rem) clamp(1rem,3vw,1.5rem)",
                borderRadius: "12px",
                textDecoration: "none",
                position: "relative", overflow: "hidden",
                background: hoveredIdx === i
                  ? "rgba(34,197,94,0.06)"
                  : "rgba(255,255,255,0.01)",
                border: `1px solid ${hoveredIdx === i ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.04)"}`,
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(60px)",
                transition: `opacity 0.55s ease ${0.2 + i * 0.07}s, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${0.2 + i * 0.07}s, background 0.25s ease, border-color 0.25s ease`,
                cursor: "pointer",
              }}
            >
              {/* Hover left bar */}
              <div style={{
                position: "absolute", left: 0, top: "15%", bottom: "15%",
                width: "3px", borderRadius: "2px",
                background: "linear-gradient(180deg, #22c55e, #4ade80)",
                boxShadow: "0 0 10px rgba(34,197,94,0.6)",
                opacity: hoveredIdx === i ? 1 : 0,
                transform: hoveredIdx === i ? "scaleY(1)" : "scaleY(0)",
                transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                transformOrigin: "center",
              }}/>

              {/* Number */}
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontStyle: "italic",
                fontSize: "clamp(0.7rem,1.5vw,0.82rem)",
                color: hoveredIdx === i ? "rgba(34,197,94,0.7)" : "rgba(143,170,191,0.28)",
                letterSpacing: "0.06em",
                minWidth: "24px",
                transition: "color 0.25s ease",
                flexShrink: 0,
              }}>{link.num}</span>

              {/* Icon bubble */}
              <div style={{
                width: "clamp(34px,5vw,40px)",
                height: "clamp(34px,5vw,40px)",
                borderRadius: "9px",
                background: hoveredIdx === i ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${hoveredIdx === i ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.07)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(0.95rem,1.8vw,1.1rem)",
                flexShrink: 0,
                transition: "all 0.3s ease",
                transform: hoveredIdx === i ? "scale(1.08) rotate(-5deg)" : "scale(1) rotate(0deg)",
                boxShadow: hoveredIdx === i ? "0 0 16px rgba(34,197,94,0.2)" : "none",
              }}>
                {link.icon}
              </div>

              {/* Label */}
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem,4vw,2.2rem)",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                color: hoveredIdx === i ? "#ffffff" : "rgba(220,235,245,0.75)",
                transition: "color 0.25s ease, text-shadow 0.25s ease",
                textShadow: hoveredIdx === i ? "0 0 40px rgba(34,197,94,0.3)" : "none",
                flex: 1,
              }}>
                {link.label.toUpperCase()}
              </span>

              {/* Arrow */}
              <svg
                width="18" height="18" viewBox="0 0 18 18" fill="none"
                style={{
                  color: "#22c55e",
                  opacity: hoveredIdx === i ? 1 : 0,
                  transform: hoveredIdx === i ? "translateX(0)" : "translateX(-8px)",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}
              >
                <path d="M3 9h12M11 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </nav>

        {/* Bottom CTA + social */}
        <div style={{
          padding: "clamp(1rem,3vh,1.5rem) clamp(1.5rem,4vw,2.5rem) clamp(1.5rem,4vh,2.5rem)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative", zIndex: 1,
        }}>
          {/* CTA */}
          <a
            href="#contact"
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              padding: "clamp(0.85rem,2.5vh,1.1rem)",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#040a12",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(0.78rem,1.5vw,0.88rem)",
              letterSpacing: "0.18em", textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 0 35px rgba(34,197,94,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              marginBottom: "clamp(0.8rem,2vh,1.2rem)",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.5s ease ${0.55}s, transform 0.5s ease ${0.55}s`,
            }}
          >
            <span>BOOK A SESSION</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Social row */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.7rem",
            opacity: open ? 1 : 0,
            transition: `opacity 0.5s ease 0.62s`,
          }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.58rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(143,170,191,0.35)",
            }}>Follow</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }}/>
            {[
              { title: "Instagram", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
              { title: "Facebook", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
              { title: "YouTube", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg> },
              { title: "X", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
            ].map((s) => (
              <button
                key={s.title}
                title={s.title}
                style={{
                  width: "34px", height: "34px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "rgba(143,170,191,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(34,197,94,0.1)";
                  el.style.borderColor = "rgba(34,197,94,0.3)";
                  el.style.color = "#22c55e";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.color = "rgba(143,170,191,0.5)";
                  el.style.transform = "translateY(0)";
                }}
              >{s.icon}</button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes menuBlob {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px,40px) scale(1.1); }
        }
        @keyframes menuBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.08); }
        }
      `}</style>
    </>
  );
}