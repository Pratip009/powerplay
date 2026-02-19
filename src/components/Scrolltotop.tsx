/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ── track window width for responsive behaviour ── */
function useWindowWidth() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

type Particle = {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  life: number;
};

export default function ScrollToTop() {
  const [visible, setVisible]               = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [launching, setLaunching]           = useState(false);
  const [particles, setParticles]           = useState<Particle[]>([]);
  const [ripples, setRipples]               = useState<{ id: number }[]>([]);
  const [orbiting, setOrbiting]             = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const particleIdRef = useRef(0);
  const rippleIdRef   = useRef(0);
  const animFrameRef  = useRef<number | undefined>(undefined);

  const windowWidth = useWindowWidth();

  /* ── breakpoints ── */
  const isMobile  = windowWidth < 480;
  const isTablet  = windowWidth >= 480 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  /* ── responsive sizes ── */
  const btnSize       = isMobile ? 48 : isTablet ? 54 : 60;
  const arrowSize     = isMobile ? 16 : isTablet ? 19 : 22;
  const orbitInset    = isMobile ? -10 : -14;
  const orbitInset2   = isMobile ? -16 : -22;
  const progressInset = isMobile ? -3 : -4;
  const progressPad   = isMobile ? 6 : 8;
  const dotSize       = isMobile ? 5 : 6;
  const dotSize2      = isMobile ? 3 : 4;

  /* ── position — respects safe-area on notched phones ── */
  const posBottom = isMobile ? "max(1rem, env(safe-area-inset-bottom, 0px) + 0.75rem)"
                  : isTablet ? "1.5rem"
                  : "2.5rem";
  const posRight  = isMobile ? "1rem" : isTablet ? "1.5rem" : "2.5rem";

  /* ── scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH      = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? scrollTop / docH : 0);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── orbit + desktop tooltip delay ── */
  useEffect(() => {
    if (visible) {
      const t1 = setTimeout(() => setOrbiting(true), 800);
      const t2 = isDesktop ? setTimeout(() => setTooltipVisible(true), 1200) : null;
      return () => { clearTimeout(t1); if (t2) clearTimeout(t2); };
    } else {
      setOrbiting(false);
      setTooltipVisible(false);
    }
  }, [visible, isDesktop]);

  /* ── launch sequence ── */
  const handleClick = useCallback(() => {
    if (launching) return;
    setLaunching(true);
    setTooltipVisible(false);

    const colors = ["#22c55e", "#f59e0b", "#3b82f6", "#ffffff", "#a3e635", "#fbbf24"];
    const count  = isMobile ? 16 : 28;

    const burst: Particle[] = Array.from({ length: count }, (_, i) => ({
      id:    particleIdRef.current++,
      x:     0,
      y:     0,
      angle: (i / count) * Math.PI * 2,
      speed: isMobile ? 2 + Math.random() * 4 : 3 + Math.random() * 5,
      size:  isMobile ? 2 + Math.random() * 4 : 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      life:  1,
    }));
    setParticles(burst);
    setRipples([
      { id: rippleIdRef.current++ },
      { id: rippleIdRef.current++ },
      { id: rippleIdRef.current++ },
    ]);

    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x:    p.x + Math.cos(p.angle) * p.speed,
            y:    p.y + Math.sin(p.angle) * p.speed,
            life: Math.max(0, 1 - elapsed * 1.8),
            size: p.size * (1 - elapsed * 0.6),
          }))
          .filter((p) => p.life > 0)
      );
      if (elapsed < 0.9) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setParticles([]);
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);

    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 120);
    setTimeout(() => { setLaunching(false); setRipples([]); }, 1100);
  }, [launching, isMobile]);

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const circumference = 2 * Math.PI * 22;
  const strokeDash    = circumference * (1 - scrollProgress);

  return (
    <>
      {/* ══════════════════════════════════════
          MAIN BUTTON
      ══════════════════════════════════════ */}
      <button
        onClick={handleClick}
        aria-label="Scroll to top"
        style={{
          position:     "fixed",
          bottom:       posBottom,
          right:        posRight,
          zIndex:       9999,
          width:        `${btnSize}px`,
          height:       `${btnSize}px`,
          /* guarantee a comfortable touch target */
          minWidth:     "44px",
          minHeight:    "44px",
          borderRadius: "50%",
          border:       "none",
          cursor:       launching ? "default" : "pointer",
          outline:      "none",
          padding:      0,
          background:   "transparent",
          opacity:      visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transform:    visible
            ? launching
              ? "translateY(-120px) scale(0.5)"
              : "translateY(0) scale(1)"
            : "translateY(80px) scale(0.6)",
          transition:   visible
            ? launching
              ? "transform 0.9s cubic-bezier(0.2,-0.6,0.8,1.4), opacity 0.4s ease"
              : "transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease"
            : "transform 0.4s ease, opacity 0.4s ease",
          isolation:    "isolate",
          /* Remove tap flash on iOS */
          WebkitTapHighlightColor: "transparent",
          touchAction:  "manipulation",
        }}
      >
        {/* Outer ambient glow */}
        <div style={{
          position: "absolute", inset: "-8px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)",
          animation: orbiting && !launching ? "outerGlow 2.5s ease-in-out infinite" : "none",
          filter: "blur(6px)",
        }} />

        {/* Orbit ring #1 */}
        <div style={{
          position: "absolute", inset: `${orbitInset}px`, borderRadius: "50%",
          border: "1px dashed rgba(34,197,94,0.35)",
          animation: orbiting && !launching ? "spinOrbit 4s linear infinite" : "none",
        }} />

        {/* Orbiting dot #1 */}
        {orbiting && !launching && (
          <div style={{ position: "absolute", inset: `${orbitInset}px`, borderRadius: "50%", animation: "spinOrbit 4s linear infinite" }}>
            <div style={{
              position: "absolute", top: "-3px", left: "50%",
              transform: "translateX(-50%)",
              width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.6)",
            }} />
          </div>
        )}

        {/* Orbit ring #2 — tablet+ only (less clutter on small screens) */}
        {!isMobile && orbiting && !launching && (
          <div style={{
            position: "absolute", inset: `${orbitInset2}px`, borderRadius: "50%",
            border: "1px solid rgba(245,158,11,0.12)",
            animation: "spinOrbitRev 7s linear infinite",
          }}>
            <div style={{
              position: "absolute", bottom: "-3px", left: "50%",
              transform: "translateX(-50%)",
              width: `${dotSize2}px`, height: `${dotSize2}px`, borderRadius: "50%",
              background: "#f59e0b", boxShadow: "0 0 8px #f59e0b",
            }} />
          </div>
        )}

        {/* Scroll progress ring */}
        <svg
          style={{
            position: "absolute", inset: `${progressInset}px`,
            width: `calc(100% + ${progressPad}px)`, height: `calc(100% + ${progressPad}px)`,
            transform: "rotate(-90deg)",
          }}
          viewBox="0 0 52 52"
        >
          <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="2" />
          <circle
            cx="26" cy="26" r="22" fill="none"
            stroke="url(#progressGrad)"
            strokeWidth={isMobile ? "2" : "2.5"}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            style={{ transition: "stroke-dashoffset 0.15s ease" }}
          />
          <defs>
            <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#22c55e" />
              <stop offset="50%"  stopColor="#a3e635" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Core face */}
        <div style={{
          position: "relative", width: "100%", height: "100%", borderRadius: "50%",
          background: launching
            ? "linear-gradient(145deg, #22c55e, #16a34a)"
            : "linear-gradient(145deg, #0b1520 0%, #0d1e30 100%)",
          border: "1px solid rgba(34,197,94,0.4)",
          boxShadow: launching
            ? "0 0 60px rgba(34,197,94,0.9), 0 0 120px rgba(34,197,94,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "0 0 25px rgba(34,197,94,0.3), 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(34,197,94,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", transition: "all 0.3s ease",
        }}>
          {/* Inner shimmer */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(34,197,94,0.18) 0%, transparent 60%)",
            animation: !launching ? "innerShimmer 3s ease-in-out infinite" : "none",
          }} />
          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 3px)",
          }} />

          {/* Arrow */}
          <svg
            width={arrowSize} height={arrowSize} viewBox="0 0 22 22" fill="none"
            style={{
              position: "relative", zIndex: 1,
              transform:  launching ? "translateY(-30px) scale(0)" : "translateY(0) scale(1)",
              transition: "transform 0.5s cubic-bezier(0.68,-0.55,0.27,1.55)",
              filter: "drop-shadow(0 0 6px rgba(34,197,94,0.8))",
            }}
          >
            <path d="M11 17V5M5 11l6-6 6 6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          {/* Launch flame */}
          {launching && (
            <div style={{
              position: "absolute", bottom: "-4px", left: "50%",
              transform: "translateX(-50%)",
              width: isMobile ? "14px" : "20px", height: isMobile ? "22px" : "30px",
              background: "linear-gradient(180deg, #ffffff 0%, #22c55e 30%, #f59e0b 65%, transparent 100%)",
              clipPath: "polygon(40% 0%, 60% 0%, 80% 100%, 50% 80%, 20% 100%)",
              animation: "flamePulse 0.1s ease-in-out infinite", filter: "blur(1px)",
            }} />
          )}
        </div>

        {/* Explosion particles */}
        {particles.map((p) => (
          <div key={p.id} style={{
            position: "absolute", top: "50%", left: "50%",
            width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%",
            background: p.color, boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
            opacity: p.life, pointerEvents: "none", zIndex: 10,
          }} />
        ))}

        {/* Ripple rings */}
        {ripples.map((r, i) => (
          <div key={r.id} style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "2px solid rgba(34,197,94,0.7)",
            animation: `rippleOut 0.9s cubic-bezier(0,0.5,0.5,1) ${i * 0.12}s forwards`,
            pointerEvents: "none",
          }} />
        ))}
      </button>

      {/* ══════════════════════════════════════
          DESKTOP TOOLTIP — full label + %
      ══════════════════════════════════════ */}
      {isDesktop && (
        <div style={{
          position: "fixed",
          bottom:   posBottom,
          right:    `calc(${posRight} + ${btnSize + 12}px)`,
          zIndex:   9998,
          background:    "rgba(6,16,26,0.92)",
          border:        "1px solid rgba(34,197,94,0.3)",
          backdropFilter: "blur(12px)",
          borderRadius:  "8px",
          padding:       "6px 12px",
          display:       "flex",
          alignItems:    "center",
          gap:           "8px",
          opacity:       tooltipVisible && visible && !launching ? 1 : 0,
          transform:     tooltipVisible && visible && !launching
            ? "translateX(0)"
            : "translateX(14px)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: "none",
          boxShadow:   "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(34,197,94,0.1)",
          whiteSpace:  "nowrap",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#22c55e", boxShadow: "0 0 8px #22c55e",
            animation: "liveDot2 1.5s ease-in-out infinite", flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.65rem",
            letterSpacing: "0.2em", textTransform: "uppercase", color: "#22c55e",
          }}>
            Back to Top
          </span>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "0.6rem", color: "rgba(143,170,191,0.5)", letterSpacing: "0.1em",
          }}>
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      )}

      {/* ══════════════════════════════════════
          TABLET — compact % badge above button
      ══════════════════════════════════════ */}
      {isTablet && (
        <div style={{
          position:      "fixed",
          bottom:        `calc(${posBottom} + ${btnSize + 8}px)`,
          right:         posRight,
          zIndex:        9998,
          background:    "rgba(6,16,26,0.88)",
          border:        "1px solid rgba(34,197,94,0.28)",
          backdropFilter: "blur(10px)",
          borderRadius:  "6px",
          padding:       "4px 9px",
          display:       "flex",
          alignItems:    "center",
          justifyContent: "center",
          gap:           "5px",
          opacity:       visible && !launching ? 1 : 0,
          transform:     visible && !launching ? "translateY(0) scale(1)" : "translateY(6px) scale(0.85)",
          transition:    "opacity 0.35s ease 0.5s, transform 0.35s ease 0.5s",
          pointerEvents: "none",
          minWidth:      "38px",
        }}>
          <div style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: "#22c55e", boxShadow: "0 0 6px #22c55e",
            animation: "liveDot2 1.5s ease-in-out infinite", flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.6rem",
            letterSpacing: "0.15em", color: "#22c55e",
          }}>
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      )}

      {/* ══════════════════════════════════════
          MOBILE — tiny % arc label inside button
          shown as a subtle text overlay when idle
      ══════════════════════════════════════ */}
      {isMobile && visible && !launching && (
        <div style={{
          position:      "fixed",
          bottom:        `calc(${posBottom} + ${btnSize + 6}px)`,
          right:         posRight,
          zIndex:        9998,
          background:    "rgba(6,16,26,0.82)",
          border:        "1px solid rgba(34,197,94,0.22)",
          backdropFilter: "blur(8px)",
          borderRadius:  "5px",
          padding:       "3px 7px",
          opacity:       visible && !launching ? 1 : 0,
          transform:     visible && !launching ? "scale(1)" : "scale(0.8)",
          transition:    "opacity 0.3s ease 0.6s, transform 0.3s ease 0.6s",
          pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.55rem",
            letterSpacing: "0.12em", color: "#22c55e",
          }}>
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes outerGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinOrbitRev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes innerShimmer {
          0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
          50%       { opacity: 1;   transform: scale(1.1) rotate(180deg); }
        }
        @keyframes flamePulse {
          0%, 100% { transform: translateX(-50%) scaleX(1)   scaleY(1);   }
          50%       { transform: translateX(-50%) scaleX(1.3) scaleY(1.2); }
        }
        @keyframes rippleOut {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(3.5); opacity: 0;   }
        }
        @keyframes liveDot2 {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; box-shadow: 0 0 16px #22c55e; }
        }

        /* Honour iOS safe-area (notch / home bar) */
        @supports (bottom: env(safe-area-inset-bottom)) {
          button[aria-label="Scroll to top"] {
            bottom: calc(max(1rem, env(safe-area-inset-bottom) + 0.5rem)) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </>
  );
}