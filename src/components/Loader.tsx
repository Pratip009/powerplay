/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useRef } from "react";

const WORDS = ["SPEED.", "POWER.", "PRECISION.", "GLORY."];
const WORD_COLORS = ["#22c55e", "#38bdf8", "#a78bfa", "#f59e0b"];

export default function Loader() {
  const [phase, setPhase]             = useState<"boot"|"wordflash"|"logo"|"exit"|"done">("boot");
  const [wordIndex, setWordIndex]     = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [progress, setProgress]       = useState(0);
  const [scanLine, setScanLine]       = useState(0);
  const [glitch, setGlitch]           = useState(false);
  const [glitchX, setGlitchX]        = useState(0);
  const [particles, setParticles]     = useState<{id:number;x:number;y:number;vx:number;vy:number;life:number;size:number;color:string;shape:string}[]>([]);
  const [logoIn, setLogoIn]           = useState(false);
  const [exitPhase, setExitPhase]     = useState(false);
  const [linesDone, setLinesDone]     = useState(false);
  const [statusText, setStatusText]   = useState("INITIALISING SYSTEMS");
  const rafRef = useRef<number>(0);
  const particleIdRef = useRef(0);

  const STATUS_TEXTS = ["INITIALISING SYSTEMS", "LOADING TURF DATA", "WARMING UP FLOODLIGHTS", "READY TO PLAY"];

  // ── Particle system ──
  useEffect(() => {
    if (phase !== "logo") return;
    const spawnBurst = () => {
      const newPs = Array.from({ length: 14 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.5;
        const colors = ["#22c55e","#4ade80","#86efac","#f59e0b","#ffffff","#38bdf8"];
        const shapes = ["circle","diamond","star"];
        return {
          id: particleIdRef.current++,
          x: 50 + (Math.random() - 0.5) * 12,
          y: 44 + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          life: 1,
          size: 1.5 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        };
      });
      setParticles(prev => [...prev.slice(-80), ...newPs]);
    };
    const interval = setInterval(spawnBurst, 180);
    const tick = () => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, x: p.x + p.vx * 0.38, y: p.y + p.vy * 0.38, vy: p.vy + 0.07, life: p.life - 0.022 }))
          .filter(p => p.life > 0)
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { clearInterval(interval); cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // ── Scan line ──
  useEffect(() => {
    if (phase !== "logo") return;
    const interval = setInterval(() => setScanLine(s => (s + 1.4) % 110), 16);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Glitch ──
  useEffect(() => {
    if (phase !== "logo") return;
    const interval = setInterval(() => {
      if (Math.random() < 0.28) {
        setGlitch(true);
        setGlitchX((Math.random() - 0.5) * 12);
        setTimeout(() => setGlitch(false), 60 + Math.random() * 130);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Progress bar + status text cycling ──
  useEffect(() => {
    if (phase === "done" || phase === "exit") return;
    const interval = setInterval(() => {
      setProgress(p => {
        const next = Math.min(100, p + (p < 30 ? 4 : p < 60 ? 2.2 : p < 85 ? 1.2 : p < 95 ? 0.6 : 3.5));
        if (next > 25 && next <= 26) setStatusText(STATUS_TEXTS[1]);
        if (next > 55 && next <= 57) setStatusText(STATUS_TEXTS[2]);
        if (next > 88 && next <= 90) setStatusText(STATUS_TEXTS[3]);
        return next;
      });
    }, 26);
    return () => clearInterval(interval);
  }, [phase]);

  // ── Lock scroll while loader is visible, restore when done ──
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  // ── Master timeline ──
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("wordflash"), 280);

    let wordTimer = 320;
    WORDS.forEach((_, i) => {
      const show = setTimeout(() => { setWordIndex(i); setWordVisible(true); }, wordTimer);
      const hide = setTimeout(() => setWordVisible(false), wordTimer + 230);
      wordTimer += 300;
    });

    const t2 = setTimeout(() => {
      setPhase("logo");
      setTimeout(() => { setLogoIn(true); setTimeout(() => setLinesDone(true), 1800); }, 60);
    }, wordTimer + 80);

    const t3 = setTimeout(() => setExitPhase(true), wordTimer + 2700);
    const t4 = setTimeout(() => setPhase("done"), wordTimer + 3500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (phase === "done") return null;

  const currentWordColor = WORD_COLORS[wordIndex] || "#22c55e";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#030810",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      fontFamily: "'Barlow Condensed', sans-serif",
    }}>

      {/* ── Noise grain overlay ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "180px 180px",
        opacity: 0.03, mixBlendMode: "overlay",
      }} />

      {/* ── Exit curtain (split wipe) ── */}
      {exitPhase && (
        <>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            background: "#030810", zIndex: 20,
            animation: "curtainUp 0.8s cubic-bezier(0.76,0,0.24,1) forwards",
          }}/>
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
            background: "#030810", zIndex: 20,
            animation: "curtainDown 0.8s cubic-bezier(0.76,0,0.24,1) forwards",
          }}/>
          {/* Exit green flash line */}
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: "2px",
            background: "linear-gradient(90deg, transparent, #22c55e, #4ade80, #22c55e, transparent)",
            boxShadow: "0 0 30px #22c55e, 0 0 60px rgba(34,197,94,0.5)",
            zIndex: 21,
            animation: "flashLine 0.8s ease forwards",
          }}/>
        </>
      )}

      {/* ── Word flash phase ── */}
      {phase === "wordflash" && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 8,
        }}>
          {/* Full-screen accent border flash */}
          <div style={{
            position: "absolute", inset: 0,
            border: `2px solid ${wordVisible ? currentWordColor + "55" : "transparent"}`,
            transition: "border-color 0.06s",
            pointerEvents: "none",
          }}/>
          {/* Corner accents */}
          {[
            { top: "16px", left: "16px", borderTop: `2px solid ${currentWordColor}`, borderLeft: `2px solid ${currentWordColor}` },
            { top: "16px", right: "16px", borderTop: `2px solid ${currentWordColor}`, borderRight: `2px solid ${currentWordColor}` },
            { bottom: "16px", left: "16px", borderBottom: `2px solid ${currentWordColor}`, borderLeft: `2px solid ${currentWordColor}` },
            { bottom: "16px", right: "16px", borderBottom: `2px solid ${currentWordColor}`, borderRight: `2px solid ${currentWordColor}` },
          ].map((s, i) => (
            <div key={i} style={{
              position: "absolute", width: "clamp(16px,3vw,24px)", height: "clamp(16px,3vw,24px)",
              opacity: wordVisible ? 0.8 : 0,
              transition: "opacity 0.05s",
              pointerEvents: "none",
              ...s,
            }}/>
          ))}
          {/* Word */}
          <div style={{ textAlign: "center", position: "relative" }}>
            {/* Word number indicator */}
            <div style={{
              fontWeight: 700, fontSize: "clamp(0.55rem,1.5vw,0.7rem)",
              letterSpacing: "0.3em",
              color: wordVisible ? currentWordColor : "transparent",
              marginBottom: "0.5rem",
              transition: "color 0.08s",
              textTransform: "uppercase",
            }}>
              {String(wordIndex + 1).padStart(2, "0")} / {String(WORDS.length).padStart(2, "0")}
            </div>
            <span style={{
              fontSize: "clamp(3.5rem, 13vw, 10rem)",
              fontWeight: 900, fontStyle: "italic",
              color: "#f0f6ff",
              letterSpacing: "-0.02em", lineHeight: 1,
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? "scaleX(1) translateY(0)" : "scaleX(1.08) translateY(-14px)",
              transition: "opacity 0.07s ease, transform 0.07s ease",
              textShadow: `0 0 60px ${currentWordColor}90, 0 0 120px ${currentWordColor}40`,
              userSelect: "none", display: "block",
            }}>
              {WORDS[wordIndex]}
            </span>
            {/* Underline streak */}
            <div style={{
              height: "3px",
              width: wordVisible ? "100%" : "0%",
              background: `linear-gradient(90deg, transparent, ${currentWordColor}, transparent)`,
              boxShadow: `0 0 12px ${currentWordColor}`,
              transition: "width 0.1s ease",
              margin: "0 auto",
              borderRadius: "2px",
              marginTop: "0.5rem",
            }}/>
          </div>
        </div>
      )}

      {/* ── Logo phase: field SVG background ── */}
      {phase === "logo" && (
        <>
          {/* Football field lines */}
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: logoIn ? 0.09 : 0,
            transition: "opacity 1.2s ease",
            zIndex: 2,
          }} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
            <rect x="80" y="60" width="840" height="580" fill="none" stroke="#22c55e" strokeWidth="1.5"
              strokeDasharray="2000" strokeDashoffset={linesDone ? "0" : "2000"}
              style={{ transition: "stroke-dashoffset 2s ease 0.1s" }}
            />
            <line x1="500" y1="60" x2="500" y2="640" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="600" strokeDashoffset={linesDone ? "0" : "600"}
              style={{ transition: "stroke-dashoffset 1.4s ease 0.4s" }}
            />
            <circle cx="500" cy="350" r="110" fill="none" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="692" strokeDashoffset={linesDone ? "0" : "692"}
              style={{ transition: "stroke-dashoffset 1.6s ease 0.6s" }}
            />
            <circle cx="500" cy="350" r="6" fill="#22c55e" opacity="0.6"/>
            <rect x="80" y="220" width="135" height="260" fill="none" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="790" strokeDashoffset={linesDone ? "0" : "790"}
              style={{ transition: "stroke-dashoffset 1.2s ease 0.8s" }}
            />
            <rect x="785" y="220" width="135" height="260" fill="none" stroke="#22c55e" strokeWidth="1"
              strokeDasharray="790" strokeDashoffset={linesDone ? "0" : "790"}
              style={{ transition: "stroke-dashoffset 1.2s ease 0.8s" }}
            />
            {/* Arc at each goal */}
            <path d="M215,350 A55,55 0 0,1 215,350" fill="none" stroke="#22c55e" strokeWidth="0.8" opacity="0.5"/>
          </svg>

          {/* Scan line */}
          <div style={{
            position: "absolute", left: 0, right: 0,
            top: `${scanLine}%`,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.15), rgba(34,197,94,0.45), rgba(34,197,94,0.15), transparent)",
            pointerEvents: "none", zIndex: 3,
          }}/>

          {/* Particles SVG */}
          <svg style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 4, overflow: "visible",
          }}>
            {particles.map(p => {
              if (p.shape === "diamond") {
                const s = p.size * p.life * 1.2;
                return (
                  <rect
                    key={p.id}
                    x={`${p.x}%`} y={`${p.y}%`}
                    width={s} height={s}
                    fill={p.color}
                    opacity={p.life * 0.75}
                    transform={`rotate(45, ${p.x * window.innerWidth / 100}, ${p.y * window.innerHeight / 100})`}
                  />
                );
              }
              return (
                <circle
                  key={p.id}
                  cx={`${p.x}%`} cy={`${p.y}%`}
                  r={p.size * p.life}
                  fill={p.color}
                  opacity={p.life * 0.75}
                />
              );
            })}
          </svg>

          {/* Glitch slices */}
          {glitch && (
            <>
              <div style={{
                position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
                background: `rgba(34,197,94,0.035)`,
                clipPath: `inset(${15 + Math.random()*55}% 0 ${5 + Math.random()*25}% 0)`,
                transform: `translateX(${glitchX}px)`,
                mixBlendMode: "screen",
              }}/>
              <div style={{
                position: "absolute", inset: 0, zIndex: 6, pointerEvents: "none",
                background: `rgba(56,189,248,0.025)`,
                clipPath: `inset(${40 + Math.random()*40}% 0 ${Math.random()*15}% 0)`,
                transform: `translateX(${-glitchX * 0.7}px)`,
                mixBlendMode: "screen",
              }}/>
            </>
          )}

          {/* Floodlight beams — responsive positions */}
          {[8, 92].map((x, i) => (
            <div key={i} style={{
              position: "absolute", top: 0,
              left: `${x}%`, transform: "translateX(-50%)",
              opacity: logoIn ? 1 : 0,
              transition: `opacity 0.8s ease ${0.3 + i * 0.12}s`,
              zIndex: 2, pointerEvents: "none",
            }}>
              <div style={{
                width: "2px",
                height: "clamp(50px, 8vh, 90px)",
                background: "linear-gradient(180deg, rgba(255,255,200,0.9), transparent)",
                margin: "0 auto",
              }}/>
              <div style={{
                position: "absolute",
                top: "clamp(50px, 8vh, 90px)",
                left: "50%", transform: "translateX(-50%)",
                width: "clamp(200px, 40vw, 500px)",
                height: "clamp(300px, 60vh, 600px)",
                background: "linear-gradient(180deg, rgba(34,197,94,0.07) 0%, transparent 80%)",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}/>
              {/* Lamp dot */}
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#fffde0",
                boxShadow: "0 0 12px #fffde0, 0 0 24px rgba(255,253,200,0.5)",
                margin: "0 auto",
                marginTop: "-2px",
              }}/>
            </div>
          ))}

          {/* Radial ambient glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "min(800px, 120vw)", height: "min(800px, 120vh)",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.03) 40%, transparent 70%)",
            opacity: logoIn ? 1 : 0, transition: "opacity 1.2s ease 0.3s",
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
          transform: glitch ? `translateX(${glitchX * 0.4}px)` : "translateX(0)",
          transition: glitch ? "none" : "transform 0.1s ease",
        }}>

          {/* Animated ring around icon */}
          <div style={{
            position: "relative",
            marginBottom: "clamp(12px, 2.5vh, 22px)",
            opacity: logoIn ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}>
            <svg
              width="clamp(80px,12vw,100px)"
              height="clamp(80px,12vw,100px)"
              viewBox="0 0 100 100"
              style={{ position: "absolute", top: "-16px", left: "-16px", animation: "spinSlow 8s linear infinite" }}
            >
              <circle cx="50" cy="50" r="44"
                fill="none" stroke="#22c55e" strokeWidth="0.8"
                strokeDasharray="12 6" opacity="0.35"
              />
            </svg>
            <svg
              width="clamp(80px,12vw,100px)"
              height="clamp(80px,12vw,100px)"
              viewBox="0 0 100 100"
              style={{ position: "absolute", top: "-16px", left: "-16px", animation: "spinSlow 12s linear infinite reverse" }}
            >
              <circle cx="50" cy="50" r="36"
                fill="none" stroke="#22c55e22" strokeWidth="0.5"
                strokeDasharray="4 10"
              />
            </svg>

            {/* Icon box */}
            <div style={{
              width: "clamp(52px,9vw,70px)",
              height: "clamp(52px,9vw,70px)",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              borderRadius: "clamp(8px,1.5vw,12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(34,197,94,0.65), 0 0 80px rgba(34,197,94,0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
              transform: logoIn ? "scale(1) rotate(0deg)" : "scale(0.2) rotate(-25deg)",
              transition: "transform 0.75s cubic-bezier(0.34,1.56,0.64,1)",
              position: "relative", zIndex: 1,
            }}>
              <svg width="clamp(26px,5vw,36px)" height="clamp(26px,5vw,36px)" viewBox="0 0 20 20" fill="none">
                <polygon points="3,17 10,3 17,17" fill="white" opacity="0.96"/>
                <polygon points="6,17 10,9 14,17" fill="rgba(0,0,0,0.3)"/>
              </svg>
            </div>
          </div>

          {/* Wordmark */}
          <div style={{ overflow: "hidden", marginBottom: "clamp(4px, 1vh, 8px)" }}>
            <h1 style={{
              fontSize: "clamp(3rem, 12vw, 8.5rem)",
              fontWeight: 900, letterSpacing: "0.06em",
              lineHeight: 1, margin: 0,
              color: "#f0f6ff",
              transform: logoIn ? "translateY(0)" : "translateY(110%)",
              transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.12s",
              display: "flex", gap: "0.01em",
              textShadow: glitch ? "2px 0 #38bdf8, -2px 0 rgba(245,158,11,0.5)" : "none",
            }}>
              <span>POWER</span>
              <span style={{
                color: "#22c55e",
                textShadow: "0 0 50px rgba(34,197,94,0.65), 0 0 100px rgba(34,197,94,0.22)",
              }}>PLAY</span>
            </h1>
          </div>

          {/* Tagline */}
          <div style={{ overflow: "hidden", marginBottom: "clamp(16px,3vh,26px)" }}>
            <p style={{
              fontWeight: 600,
              letterSpacing: "clamp(0.18em, 1.5vw, 0.32em)",
              fontSize: "clamp(0.55rem, 1.5vw, 0.72rem)",
              color: "#22c55e",
              textTransform: "uppercase", margin: 0,
              transform: logoIn ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}>
              Premium Multi-Sport Turf Facility
            </p>
          </div>

          {/* Animated divider */}
          <div style={{
            width: logoIn ? "clamp(140px,30vw,220px)" : "0px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #22c55e, #4ade80, #22c55e, transparent)",
            boxShadow: "0 0 14px #22c55e, 0 0 28px rgba(34,197,94,0.35)",
            marginBottom: "clamp(16px,3vh,24px)",
            transition: "width 1s ease 0.5s",
          }}/>

          {/* Sport icon pills */}
          <div style={{
            display: "flex",
            gap: "clamp(1.5rem,5vw,3rem)",
            opacity: logoIn ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}>
            {[
              { e: "⚽", l: "Football", color: "#22c55e" },
              { e: "🏏", l: "Cricket", color: "#f59e0b" },
            ].map((s, i) => (
              <div key={s.l} style={{
                textAlign: "center",
                opacity: logoIn ? 1 : 0,
                transform: logoIn ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${0.9 + i * 0.12}s, transform 0.5s ease ${0.9 + i * 0.12}s`,
              }}>
                <div style={{
                  fontSize: "clamp(1.4rem,3.5vw,2rem)",
                  filter: `drop-shadow(0 0 10px ${s.color}80)`,
                  animation: `iconFloat${i} 2.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                  display: "block",
                  marginBottom: "6px",
                }}>{s.e}</div>
                <div style={{
                  fontWeight: 700, letterSpacing: "0.2em",
                  fontSize: "clamp(0.5rem,1.2vw,0.6rem)",
                  color: s.color, textTransform: "uppercase",
                  textShadow: `0 0 10px ${s.color}60`,
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Progress bar ── */}
      {phase === "logo" && (
        <div style={{
          position: "absolute",
          bottom: "clamp(20px, 4vh, 42px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(200px, 45vw, 280px)",
          zIndex: 7,
          opacity: logoIn ? 1 : 0,
          transition: "opacity 0.5s ease 0.25s",
        }}>
          {/* Status text */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginBottom: "8px", alignItems: "center",
          }}>
            <span style={{
              fontWeight: 700, letterSpacing: "0.16em",
              fontSize: "clamp(0.5rem,1.2vw,0.6rem)",
              color: "rgba(34,197,94,0.55)",
              textTransform: "uppercase",
              animation: "textPulse 1.5s ease-in-out infinite",
            }}>{statusText}</span>
            <span style={{
              fontWeight: 900, fontSize: "clamp(0.6rem,1.4vw,0.7rem)",
              color: "#22c55e",
              letterSpacing: "0.05em",
              textShadow: "0 0 10px rgba(34,197,94,0.5)",
            }}>{Math.round(progress)}%</span>
          </div>

          {/* Track */}
          <div style={{
            width: "100%", height: "2px",
            background: "rgba(34,197,94,0.1)",
            borderRadius: "2px", overflow: "visible",
            position: "relative",
          }}>
            {/* Fill */}
            <div style={{
              height: "100%", width: `${progress}%`,
              background: "linear-gradient(90deg, #166534, #22c55e, #4ade80)",
              boxShadow: "0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.35)",
              borderRadius: "2px",
              transition: "width 0.08s linear",
              position: "relative",
            }}>
              {/* Glowing head dot */}
              <div style={{
                position: "absolute", right: "-3px", top: "50%",
                transform: "translateY(-50%)",
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80, 0 0 16px rgba(74,222,128,0.6)",
                animation: "dotPulse 1s ease-in-out infinite",
              }}/>
            </div>
          </div>

          {/* Tick marks */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            {[0, 25, 50, 75, 100].map(tick => (
              <div key={tick} style={{
                width: "1px", height: "4px",
                background: progress >= tick ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.08)",
                transition: "background 0.3s ease",
              }}/>
            ))}
          </div>
        </div>
      )}

      {/* ── Cinematic corner marks ── */}
      {(() => {
        const cornerBase: React.CSSProperties = {
          position: "absolute",
          width: "clamp(14px,2.5vw,22px)",
          height: "clamp(14px,2.5vw,22px)",
          zIndex: 8,
        };
        const gap = "clamp(8px,2vw,16px)";
        const border = "1px solid rgba(34,197,94,0.5)";
        const opacity = phase === "logo" ? (logoIn ? 0.6 : 0) : (phase === "wordflash" && wordVisible ? 0.3 : 0);
        const corners: { style: React.CSSProperties; delay: number }[] = [
          { style: { top: gap, left: gap, borderTop: border, borderLeft: border }, delay: 0 },
          { style: { top: gap, right: gap, borderTop: border, borderRight: border }, delay: 0.05 },
          { style: { bottom: gap, left: gap, borderBottom: border, borderLeft: border }, delay: 0.1 },
          { style: { bottom: gap, right: gap, borderBottom: border, borderRight: border }, delay: 0.15 },
        ];
        return corners.map((c, i) => (
          <div key={i} style={{
            ...cornerBase,
            ...c.style,
            opacity,
            transition: `opacity 0.5s ease ${0.55 + c.delay}s`,
          }}/>
        ));
      })()}

      {/* Boot flash */}
      {phase === "boot" && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 15,
          background: "#22c55e",
          animation: "bootFlash 0.3s ease forwards",
        }}/>
      )}

      <style>{`
        @keyframes curtainUp   { from { transform: translateY(0); } to { transform: translateY(-100%); } }
        @keyframes curtainDown { from { transform: translateY(0); } to { transform: translateY(100%); } }
        @keyframes flashLine   { 0% { opacity:1; } 100% { opacity:0; } }
        @keyframes bootFlash   { 0% { opacity:1; } 60% { opacity:0.25; } 100% { opacity:0; } }
        @keyframes spinSlow    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes iconFloat0  { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
        @keyframes iconFloat1  { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
        @keyframes textPulse   { 0%,100% { opacity:0.55; } 50% { opacity:0.9; } }
        @keyframes dotPulse    { 0%,100% { transform: translateY(-50%) scale(1); opacity:1; } 50% { transform: translateY(-50%) scale(1.4); opacity:0.7; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: opacity 0.2s ease !important; }
        }
      `}</style>
    </div>
  );
}