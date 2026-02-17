/* eslint-disable react-hooks/purity */
"use client";
import { useEffect, useState, useRef } from "react";

const WORDS = ["SPEED.", "POWER.", "PRECISION.", "GLORY."];

export default function Loader() {
  const [phase, setPhase]           = useState<"boot"|"wordflash"|"logo"|"exit"|"done">("boot");
  const [wordIndex, setWordIndex]   = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [progress, setProgress]     = useState(0);
  const [scanLine, setScanLine]     = useState(0);
  const [glitch, setGlitch]         = useState(false);
  const [particles, setParticles]   = useState<{id:number;x:number;y:number;vx:number;vy:number;life:number;size:number;color:string}[]>([]);
  const [logoIn, setLogoIn]         = useState(false);
  const [exitPhase, setExitPhase]   = useState(false);
  const rafRef = useRef<number>(0);
  const particleIdRef = useRef(0);

  // ── Particle system ──
  useEffect(() => {
    if (phase !== "logo") return;
    const spawnBurst = () => {
      const newPs = Array.from({ length: 12 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3;
        const colors = ["#22c55e","#4ade80","#86efac","#f59e0b","#ffffff"];
        return {
          id: particleIdRef.current++,
          x: 50 + (Math.random() - 0.5) * 10,
          y: 42 + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 1,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      });
      setParticles(prev => [...prev.slice(-60), ...newPs]);
    };
    const interval = setInterval(spawnBurst, 200);
    const tick = () => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, x: p.x + p.vx * 0.4, y: p.y + p.vy * 0.4, vy: p.vy + 0.08, life: p.life - 0.025 }))
          .filter(p => p.life > 0)
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { clearInterval(interval); cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // ── Scan line animation ──
  useEffect(() => {
    if (phase !== "logo") return;
    const interval = setInterval(() => {
      setScanLine(s => (s + 1.2) % 110);
    }, 16);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Glitch random trigger ──
  useEffect(() => {
    if (phase !== "logo") return;
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 80 + Math.random() * 120);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Progress bar ──
  useEffect(() => {
    if (phase === "done" || phase === "exit") return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        const inc = p < 30 ? 4 : p < 60 ? 2 : p < 85 ? 1 : p < 95 ? 0.5 : 3;
        return Math.min(100, p + inc);
      });
    }, 28);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Master timeline ──
  useEffect(() => {
    // BOOT → word flash sequence
    const t1 = setTimeout(() => setPhase("wordflash"), 300);

    // Flash each word for 300ms each
    let wordTimer = 350;
    WORDS.forEach((_, i) => {
      const show = setTimeout(() => { setWordIndex(i); setWordVisible(true); }, wordTimer);
      const hide = setTimeout(() => setWordVisible(false), wordTimer + 240);
      wordTimer += 310;
    });

    // → logo phase
    const t2 = setTimeout(() => {
      setPhase("logo");
      setTimeout(() => setLogoIn(true), 60);
    }, wordTimer + 80);

    // → exit
    const t3 = setTimeout(() => setExitPhase(true), wordTimer + 2600);

    // → done
    const t4 = setTimeout(() => setPhase("done"), wordTimer + 3400);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (phase === "done") return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#050a0e",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", fontFamily: "'Barlow Condensed', sans-serif",
    }}>

      {/* ── Exit curtain ── */}
      {exitPhase && (
        <>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            background: "#050a0e", zIndex: 20,
            transform: "translateY(-100%)",
            animation: "curtainUp 0.75s cubic-bezier(0.76,0,0.24,1) forwards",
          }}/>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
            background: "#050a0e", zIndex: 20,
            transform: "translateY(100%)",
            animation: "curtainDown 0.75s cubic-bezier(0.76,0,0.24,1) forwards",
          }}/>
        </>
      )}

      {/* ── Word flash phase ── */}
      {phase === "wordflash" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 8,
        }}>
          <span style={{
            fontSize: "clamp(4rem, 15vw, 11rem)",
            fontWeight: 900, fontStyle: "italic",
            color: "#f0f6ff",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            opacity: wordVisible ? 1 : 0,
            transform: wordVisible ? "scaleX(1) translateY(0)" : "scaleX(1.1) translateY(-10px)",
            transition: "opacity 0.08s ease, transform 0.08s ease",
            textShadow: "0 0 80px rgba(34,197,94,0.6)",
            userSelect: "none",
          }}>
            {WORDS[wordIndex]}
          </span>
          {/* Flash frame lines */}
          <div style={{
            position: "absolute", inset: 0,
            border: `2px solid rgba(34,197,94,${wordVisible ? 0.4 : 0})`,
            transition: "border-color 0.05s",
            pointerEvents: "none",
          }}/>
        </div>
      )}

      {/* ── Logo phase background: field SVG ── */}
      {phase === "logo" && (
        <>
          {/* Field lines */}
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: logoIn ? 0.1 : 0,
            transition: "opacity 1s ease",
          }} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
            <rect x="80" y="60" width="840" height="580" fill="none" stroke="#22c55e" strokeWidth="1.5"
              strokeDasharray="2000" strokeDashoffset={logoIn ? "0" : "2000"}
              style={{ transition: "stroke-dashoffset 1.8s ease 0.2s" }}
            />
            <line x1="500" y1="60" x2="500" y2="640" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="600" strokeDashoffset={logoIn ? "0" : "600"}
              style={{ transition: "stroke-dashoffset 1.2s ease 0.5s" }}
            />
            <circle cx="500" cy="350" r="110" fill="none" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="692" strokeDashoffset={logoIn ? "0" : "692"}
              style={{ transition: "stroke-dashoffset 1.4s ease 0.7s" }}
            />
            <circle cx="500" cy="350" r="6" fill="#22c55e" opacity="0.5"/>
            <rect x="80" y="220" width="135" height="260" fill="none" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="790" strokeDashoffset={logoIn ? "0" : "790"}
              style={{ transition: "stroke-dashoffset 1.1s ease 0.9s" }}
            />
            <rect x="785" y="220" width="135" height="260" fill="none" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="790" strokeDashoffset={logoIn ? "0" : "790"}
              style={{ transition: "stroke-dashoffset 1.1s ease 0.9s" }}
            />
          </svg>

          {/* Scan line */}
          <div style={{
            position: "absolute", left: 0, right: 0,
            top: `${scanLine}%`,
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.2), rgba(34,197,94,0.5), rgba(34,197,94,0.2), transparent)",
            pointerEvents: "none", zIndex: 3,
          }}/>

          {/* Particles */}
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 4, overflow: "visible",
          }}>
            {particles.map(p => (
              <circle
                key={p.id}
                cx={`${p.x}%`} cy={`${p.y}%`}
                r={p.size * p.life}
                fill={p.color}
                opacity={p.life * 0.8}
              />
            ))}
          </svg>

          {/* Glitch overlay */}
          {glitch && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
              background: `rgba(34,197,94,0.04)`,
              clipPath: `inset(${20 + Math.random()*60}% 0 ${Math.random()*20}% 0)`,
              transform: `translateX(${(Math.random()-0.5)*8}px)`,
              mixBlendMode: "screen",
            }}/>
          )}

          {/* Floodlight beams */}
          {[14, 86].map((x, i) => (
            <div key={i} style={{
              position: "absolute", top: 0,
              left: `${x}%`, transform: "translateX(-50%)",
              opacity: logoIn ? 1 : 0,
              transition: `opacity 0.6s ease ${0.3 + i * 0.1}s`,
              zIndex: 2, pointerEvents: "none",
            }}>
              <div style={{
                width: "2px", height: "90px",
                background: "linear-gradient(180deg, rgba(255,255,200,0.8), transparent)",
                margin: "0 auto",
              }}/>
              <div style={{
                position: "absolute", top: "90px", left: "50%",
                transform: "translateX(-50%)",
                width: "500px", height: "600px",
                background: "linear-gradient(180deg, rgba(34,197,94,0.07) 0%, transparent 80%)",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}/>
            </div>
          ))}

          {/* Radial glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(34,197,94,0.09) 0%, transparent 70%)",
            opacity: logoIn ? 1 : 0, transition: "opacity 1s ease 0.4s",
            pointerEvents: "none", zIndex: 1,
          }}/>
        </>
      )}

      {/* ── Logo content ── */}
      {phase === "logo" && (
        <div style={{
          position: "relative", zIndex: 7,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          filter: glitch ? `hue-rotate(${Math.random()*20}deg)` : "none",
        }}>
          {/* Icon */}
          <div style={{
            width: "68px", height: "68px",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "22px",
            boxShadow: "0 0 50px rgba(34,197,94,0.7), 0 0 100px rgba(34,197,94,0.25)",
            opacity: logoIn ? 1 : 0,
            transform: logoIn ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(-20deg)",
            transition: "opacity 0.5s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}>
            <svg width="34" height="34" viewBox="0 0 20 20" fill="none">
              <polygon points="3,17 10,3 17,17" fill="white" opacity="0.95"/>
              <polygon points="6,17 10,9 14,17" fill="rgba(0,0,0,0.35)"/>
            </svg>
          </div>

          {/* Wordmark */}
          <div style={{ overflow: "hidden" }}>
            <h1 style={{
              fontSize: "clamp(3.5rem, 11vw, 8rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              lineHeight: 1, margin: 0,
              color: "#f0f6ff",
              transform: logoIn ? "translateY(0)" : "translateY(110%)",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s",
              display: "flex", gap: "0.01em",
            }}>
              <span>POWER</span>
              <span style={{
                color: "#22c55e",
                textShadow: "0 0 60px rgba(34,197,94,0.6), 0 0 120px rgba(34,197,94,0.2)",
              }}>PLAY</span>
            </h1>
          </div>

          {/* Tagline */}
          <div style={{ overflow: "hidden", marginTop: "10px" }}>
            <p style={{
              fontWeight: 600, letterSpacing: "0.32em",
              fontSize: "0.72rem", color: "#22c55e",
              textTransform: "uppercase", margin: 0,
              transform: logoIn ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}>
              Premium Multi-Sport Turf Facility
            </p>
          </div>

          {/* Glow divider */}
          <div style={{
            width: logoIn ? "220px" : "0px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #22c55e, #4ade80, #22c55e, transparent)",
            boxShadow: "0 0 16px #22c55e, 0 0 32px rgba(34,197,94,0.4)",
            margin: "26px 0 22px",
            transition: "width 0.9s ease 0.55s",
          }}/>

          {/* Sport icons */}
          <div style={{
            display: "flex", gap: "36px",
            opacity: logoIn ? 1 : 0,
            transition: "opacity 0.5s ease 0.85s",
          }}>
            {[{ e: "⚽", l: "Football" }, { e: "🏏", l: "Cricket" }].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "1.8rem",
                  filter: "drop-shadow(0 0 8px rgba(34,197,94,0.5))",
                  animation: "iconFloat 3s ease-in-out infinite",
                }}>{s.e}</div>
                <p style={{
                  fontWeight: 700, letterSpacing: "0.18em",
                  fontSize: "0.58rem", color: "#8faabf",
                  marginTop: "6px", textTransform: "uppercase",
                }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Progress bar ── */}
      {phase === "logo" && (
        <div style={{
          position: "absolute", bottom: "36px", left: "50%",
          transform: "translateX(-50%)",
          width: "260px", zIndex: 7,
          opacity: logoIn ? 1 : 0, transition: "opacity 0.4s ease 0.3s",
        }}>
          <div style={{
            width: "100%", height: "2px",
            background: "rgba(34,197,94,0.12)",
            borderRadius: "2px", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #16a34a, #22c55e, #4ade80)",
              boxShadow: "0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.4)",
              borderRadius: "2px",
              transition: "width 0.1s linear",
            }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{
              fontWeight: 600, letterSpacing: "0.18em",
              fontSize: "0.58rem", color: "rgba(143,170,191,0.4)",
              textTransform: "uppercase",
            }}>Initialising</span>
            <span style={{
              fontWeight: 800, fontSize: "0.65rem",
              color: "#22c55e", letterSpacing: "0.05em",
            }}>{Math.round(progress)}%</span>
          </div>
        </div>
      )}

      {/* ── Corner marks (cinematic letterbox feel) ── */}
      {["top-4 left-4","top-4 right-4","bottom-4 left-4","bottom-4 right-4"].map((pos, i) => (
        <div key={i} className={`absolute ${pos}`} style={{
          width: "20px", height: "20px",
          opacity: phase === "logo" ? (logoIn ? 0.4 : 0) : 0,
          transition: `opacity 0.5s ease ${0.6 + i * 0.05}s`,
          borderTop: i < 2 ? "1px solid #22c55e" : "none",
          borderBottom: i >= 2 ? "1px solid #22c55e" : "none",
          borderLeft: i % 2 === 0 ? "1px solid #22c55e" : "none",
          borderRight: i % 2 === 1 ? "1px solid #22c55e" : "none",
        }}/>
      ))}

      {/* Boot flash (first 300ms) */}
      {phase === "boot" && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 15,
          background: "#22c55e",
          animation: "bootFlash 0.3s ease forwards",
        }}/>
      )}

      <style>{`
        @keyframes curtainUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-100%); }
        }
        @keyframes curtainDown {
          from { transform: translateY(0); }
          to   { transform: translateY(100%); }
        }
        @keyframes bootFlash {
          0%   { opacity: 1; }
          60%  { opacity: 0.3; }
          100% { opacity: 0; }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}