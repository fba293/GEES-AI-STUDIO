/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * GEES Global Education Expert Services - Master Footer
 * Features:
 * 1. Fully dynamic CSS grid with auto-adjusting columns (grid-cols-1 md:grid-cols-2 lg:grid-cols-4).
 * 2. Theme-adaptive background: crisp light slate (#F8FAFC) in light mode, neutral dark slate (#0B1329) in dark mode.
 * 3. Consistent office location blocks spacing and alignment across mobile, tablet, and desktop.
 * 4. Concise office timing: "Sunday–Thursday · 10:00 AM–5:00 PM".
 * 5. Background world map image with soft opacity for pristine text legibility in both light and dark themes.
 * 6. Monochrome Black & White circular social buttons.
 * 7. Quick Links: Blog, Courses, Home, Universities, Contact, Our Services.
 * 8. Legal bar: Privacy Policy, Refund Policy, Terms & Conditions.
 * 9. High-performance 120 FPS hardware-accelerated beam lighting and interactive GEES wordmark.
 */

import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
}

// Math and Physics helpers for 120 FPS smooth interpolation
const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);

const hexToRgb = (hex: string, fallback: string = "251, 176, 52"): string => {
  const m = /^#?([\da-f]{3}|([\da-f]{6}))$/i.exec((hex || "").trim());
  if (!m) return fallback;
  const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
  const n = parseInt(h, 16);
  return ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255);
};

const fitSize = (measuredAt100: number, target: number, cap: number): number => {
  if (!(measuredAt100 > 0) || !(target > 0)) return 0;
  const size = (100 * target) / measuredAt100;
  return cap > 0 ? Math.min(size, cap) : size;
};

const beamTarget = (u: number, lo: number = 25, hi: number = 85): number =>
  lo + (hi - lo) * clamp(Number.isFinite(u) ? u : 0.5, 0, 1);

const drift = (t: number, centre: number = 55, amp: number = 10): number =>
  centre + amp * (0.7 * Math.sin(t * 0.21) + 0.3 * Math.sin(t * 0.077 + 1.3));

const approach = (from: number, to: number, k: number, dt: number): number =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60);

const baselineAt = (ascent: number, descent: number): number => {
  if (!(ascent > 0) || !(descent >= 0)) return 0.8;
  return clamp(((100 - ascent - descent) / 2 + ascent) / 100, 0.5, 1.2);
};

const wordHeight = (fontSize: number, baseline: number, cut: number): number =>
  Math.max(0, fontSize * (baseline + clamp(Number.isFinite(cut) ? cut : 0, -0.4, 0.4)));

const measureBaseline = (family: string, weight: number, text: string): number => {
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return 0.8;
    ctx.font = weight + " 100px " + family;
    const m = ctx.measureText(text);
    return baselineAt(m.fontBoundingBoxAscent, m.fontBoundingBoxDescent);
  } catch {
    return 0.8;
  }
};

const CSS_BEAM = `
.gees-footer-theme {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  container-type: inline-size;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  touch-action: pan-y;
  will-change: transform;
}
.gees-footer-rule {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  z-index: 3;
  background: linear-gradient(90deg, rgba(var(--bwf-acc),.15), rgba(var(--bwf-acc),.55) var(--bwf-b), rgba(var(--bwf-acc),.15));
}
.gees-footer-sky {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.gees-footer-wash {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 8% 0%, rgba(37,99,235,.08), transparent 55%), radial-gradient(90% 70% at 92% 8%, rgba(var(--bwf-acc),.07), transparent 60%);
}
.gees-footer-beam {
  position: absolute;
  inset: 0;
  filter: blur(calc(1px + 1.6cqw));
  transform: translate3d(0, 0, 0);
  background: linear-gradient(var(--bwf-ang), transparent calc(var(--bwf-b) - 11%), rgba(var(--bwf-acc),.06) calc(var(--bwf-b) - 5%), rgba(var(--bwf-acc),.20) var(--bwf-b), rgba(var(--bwf-acc),.05) calc(var(--bwf-b) + 4%), transparent calc(var(--bwf-b) + 9%));
}
.gees-footer-glow {
  position: absolute;
  inset: 0;
  opacity: var(--bwf-g);
  background: radial-gradient(circle 24cqw at var(--bwf-px) var(--bwf-py), rgba(var(--bwf-acc),.10), transparent 70%);
}
.gees-word {
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: clamp(16px, 4cqw, 44px);
}
.gees-word-box {
  padding: 0 clamp(20px, 6cqw, 88px);
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.gees-word-in {
  display: inline-flex;
  white-space: nowrap;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  user-select: none;
  -webkit-user-select: none;
}
.gees-lw {
  display: inline-block;
  translate: 0 0;
  transition: translate 1.25s cubic-bezier(.16,.84,.2,1) var(--bwf-d, 0ms);
}
.gees-footer-theme[data-in='false'] .gees-lw {
  translate: 0 85%;
}
.gees-l {
  display: inline-block;
  cursor: pointer;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-repeat: no-repeat;
  background-size: var(--bwf-rw) var(--bwf-rh);
  background-position: calc(var(--bwf-x) * -1) calc(var(--bwf-y) * -1);
  background-image:
    radial-gradient(circle 22cqw at var(--bwf-px) var(--bwf-py), rgba(var(--bwf-lit), calc(var(--bwf-g) * .85)), transparent 70%),
    linear-gradient(var(--bwf-ang), transparent calc(var(--bwf-b) - 9%), rgba(var(--bwf-lit), .55) calc(var(--bwf-b) - 1.5%), rgba(var(--bwf-lit), .7) var(--bwf-b), rgba(var(--bwf-lit), .2) calc(var(--bwf-b) + 3.5%), transparent calc(var(--bwf-b) + 8%)),
    linear-gradient(180deg, var(--bwf-wt) var(--bwf-top), var(--bwf-wf) var(--bwf-bot));
  transition: transform .5s cubic-bezier(.2,.9,.25,1.2), filter .4s;
  transform-origin: 50% 100%;
}
.gees-l:hover {
  transform: translateY(-0.045em);
  filter: brightness(1.35) saturate(1.1);
}
.gees-l.is-hop {
  animation: gees-bwf-hop .75s cubic-bezier(.2,.8,.2,1);
}
@keyframes gees-bwf-hop {
  0% { transform: translateY(0) scale(1,1); }
  18% { transform: translateY(.02em) scale(1.06,.9); }
  45% { transform: translateY(-.14em) scale(.97,1.05); }
  70% { transform: translateY(.01em) scale(1.02,.97); }
  100% { transform: translateY(-.045em) scale(1,1); }
}
.gees-foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 38%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(248,250,252,.8) 55%, #F8FAFC);
}
.dark .gees-foot {
  background: linear-gradient(180deg, transparent, rgba(11,19,41,.8) 55%, #0B1329);
}
`;

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const word = "GEES";
  const letters = useMemo(() => Array.from(word), [word]);
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [base, setBase] = useState(0.8);
  const [seen, setSeen] = useState(false);

  // Pointer state for reactive beam tracking
  const ptr = useRef({ u: 0.5, x: 0, y: 0, inside: false });

  // Wordmark font-fitting and beam coordinate alignment
  useLayoutEffect(() => {
    const root = rootRef.current;
    const box = wordRef.current;
    const inner = innerRef.current;
    if (!root || !box || !inner) return;
    let frame = 0;
    const fit = () => {
      const wb = inner.parentElement ?? box;
      const pad = parseFloat(getComputedStyle(wb).paddingLeft) || 0;
      const target = wb.clientWidth - pad * 2;
      inner.style.fontSize = "100px";
      const measured = inner.offsetWidth;
      setBase(measureBaseline(getComputedStyle(inner).fontFamily, 900, word));
      const next = fitSize(measured, target, target * 0.42);
      inner.style.fontSize = next + "px";
      setSize(next);
      place();
    };
    const place = () => {
      const r = root.getBoundingClientRect();
      root.style.setProperty("--bwf-rw", r.width + "px");
      root.style.setProperty("--bwf-rh", r.height + "px");
      const spans = inner.querySelectorAll<HTMLElement>(".gees-l");
      let top = 0;
      spans.forEach((s, i) => {
        let x = 0;
        let y = 0;
        let el: HTMLElement | null = s;
        while (el && el !== root) {
          x += el.offsetLeft;
          y += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        s.style.setProperty("--bwf-x", x + "px");
        s.style.setProperty("--bwf-y", y + "px");
        if (i === 0) top = y;
      });
      root.style.setProperty("--bwf-top", top + "px");
      root.style.setProperty("--bwf-bot", top + (parseFloat(inner.style.fontSize) || 0) * 0.92 + "px");
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    fit();
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    let alive = true;
    document.fonts?.ready.then(() => alive && schedule());
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [word]);

  // Observer for animation trigger
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.1 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // High-performance 120 FPS buttery-smooth RAF animation loop
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const set = (b: number, px: number, py: number, g: number) => {
      root.style.setProperty("--bwf-b", b.toFixed(2) + "%");
      root.style.setProperty("--bwf-px", px.toFixed(1) + "px");
      root.style.setProperty("--bwf-py", py.toFixed(1) + "px");
      root.style.setProperty("--bwf-g", g.toFixed(3));
    };

    if (!visible) {
      const p = ptr.current;
      set(55, p.x, p.y, p.inside ? 1 : 0);
      return;
    }

    let raf = 0;
    let last = performance.now();
    let t = last / 1000;
    let b = 55;
    let px = ptr.current.x;
    let py = ptr.current.y;
    let g = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const p = ptr.current;
      const idle = drift(t);
      const target = p.inside ? beamTarget(p.u) * 0.75 + idle * 0.25 : idle;
      b = approach(b, target, 0.04, dt);
      px = approach(px, p.x, 0.18, dt);
      py = approach(py, p.y, 0.18, dt);
      g = approach(g, p.inside ? 1 : 0, 0.08, dt);
      set(b, px, py, g);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const p = ptr.current;
    p.x = e.clientX - r.left;
    p.y = e.clientY - r.top;
    p.u = r.width ? p.x / r.width : 0.5;
    p.inside = e.type !== "pointerleave";
  };

  const hop = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    el.classList.remove("is-hop");
    void el.offsetWidth;
    el.classList.add("is-hop");
  };

  const vars = {
    "--bwf-bg": "#0B1329",
    "--bwf-bg-rgb": "11, 19, 41",
    "--bwf-ink": "#e2e8f0",
    "--bwf-ink-rgb": "226, 232, 240",
    "--bwf-muted": "#94a3b8",
    "--bwf-acc": hexToRgb("#FBB034"),
    "--bwf-lit": hexToRgb("#FBB034"),
    "--bwf-wt": "#2563eb",
    "--bwf-wf": "#0B1329",
    "--bwf-sans": "'Plus Jakarta Sans', system-ui, sans-serif",
    "--bwf-ww": "900",
    "--bwf-ang": "118deg",
    "--bwf-b": "55%",
    "--bwf-px": "50%",
    "--bwf-py": "50%",
    "--bwf-g": "0",
    "--bwf-top": "0px",
    "--bwf-bot": "100%",
  } as React.CSSProperties;

  // 8 Specific Circular Black and White Social Buttons
  const allSocials = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/globaleduexpert',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/global.eduexpert',
      icon: (
        <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@globaleduexpert',
      icon: (
        <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.6" viewBox="0 0 24 24">
          <rect x="2.75" y="5.5" width="18.5" height="13" rx="4" />
          <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" fill="currentColor" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/globaleduexpert',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@globaleduexpert',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/601112376224',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      )
    },
    {
      label: 'BSIM Group',
      href: 'https://www.facebook.com/groups/bsim.official',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.34-1.63.92-2.24C9.64 13.9 9.3 13 9 13z" />
        </svg>
      )
    },
    {
      label: 'Messenger',
      href: 'https://www.facebook.com/messages/t/globaleduexpert/',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.093.303 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.963 3.13 3.259 5.889-3.259-6.56 6.963z" />
        </svg>
      )
    }
  ];

  return (
    <footer
      ref={rootRef}
      className="gees-footer-theme w-full pt-16 pb-6 bg-[#F8FAFC] dark:bg-[#0B1329] text-slate-700 dark:text-slate-200 border-t border-slate-200/90 dark:border-slate-800 transition-colors"
      style={vars}
      data-in={seen ? "true" : "false"}
      onPointerMove={onPointer}
      onPointerEnter={onPointer}
      onPointerLeave={onPointer}
    >
      <style>{CSS_BEAM}</style>
      <div className="gees-footer-rule" aria-hidden="true" />
      
      {/* Background World Map Image with adjusted opacity for light and dark modes */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center" aria-hidden="true">
        <img
          src="https://www.pngkey.com/png/detail/170-1707126_world-map-footer-world-map.png"
          alt="World Map Footer - World Map@pngkey.com"
          className="w-full h-full object-cover sm:object-contain object-center opacity-[0.06] dark:opacity-[0.10] filter brightness-90 contrast-125 dark:brightness-125 dark:contrast-125 dark:invert"
          loading="lazy"
        />
      </div>

      {/* Dynamic Beam Sky & Light Layer */}
      <div className="gees-footer-sky" aria-hidden="true">
        <div className="gees-footer-wash" />
        <div className="gees-footer-beam" />
        <div className="gees-footer-glow" />
      </div>

      {/* Main Multi-Column Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Responsive 4-Column CSS Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-slate-200/90 dark:border-slate-800/80">
          
          {/* Col 1: Brand & Office Location Blocks with Consistent Spacing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display">GEES</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBB034] shadow-xs" />
            </div>

            {/* Address & Operational Hours with structured icon alignment */}
            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {/* Dhaka Office Block */}
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 text-sm mt-0.5 shrink-0 select-none">📍</span>
                <div className="min-w-0">
                  <strong className="text-slate-900 dark:text-white block font-semibold text-xs sm:text-[13px] mb-0.5">
                    Dhaka Office:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 block">
                    Green City Regency, Road 27/1, Level 10, Kakrail, Dhaka 1000.
                  </span>
                </div>
              </div>

              {/* Malaysia Office Block */}
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 text-sm mt-0.5 shrink-0 select-none">📍</span>
                <div className="min-w-0">
                  <strong className="text-slate-900 dark:text-white block font-semibold text-xs sm:text-[13px] mb-0.5">
                    Malaysia Office:
                  </strong>
                  <span className="text-slate-600 dark:text-slate-300 block">
                    USJ 19 City Mall, Level 1, Subang Jaya, Selangor 47620.
                  </span>
                </div>
              </div>

              {/* Office Timing: concise and aligned */}
              <div className="flex items-center gap-2.5">
                <span className="text-red-500 text-sm shrink-0 select-none">🕒</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">
                  Sunday–Thursday · 10:00 AM–5:00 PM
                </span>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-center gap-2.5">
                <span className="text-red-500 text-sm shrink-0 select-none">📞</span>
                <div className="flex items-center gap-2 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  <a href="tel:+8801805529578" className="hover:underline">+880 1805-529578</a>
                  <span className="text-slate-400 dark:text-slate-600">/</span>
                  <a href="tel:+601112376224" className="hover:underline">+60 11-1237 6224</a>
                </div>
              </div>

              {/* Email strictly in 1 single line */}
              <div className="flex items-center gap-2.5">
                <span className="text-red-500 text-sm shrink-0 select-none">✉️</span>
                <a
                  href="mailto:info@globaleducationexpert.com"
                  className="text-slate-800 dark:text-slate-200 hover:text-[#D97706] dark:hover:text-[#FBB034] font-medium whitespace-nowrap inline-block hover:underline"
                >
                  info@globaleducationexpert.com
                </a>
              </div>
            </div>

            {/* 8 Round Circular Black and White Social Media Icons */}
            <div className="pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                {allSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-800 hover:border-slate-900 dark:hover:border-[#FBB034] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xs hover:shadow-md"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Study Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-red-500 dark:text-red-400 tracking-wide">
              Study Destinations
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {[
                { flag: '🇬🇧', label: 'Study in UK', slug: 'United Kingdom' },
                { flag: '🇦🇺', label: 'Study in Australia', slug: 'Australia' },
                { flag: '🇳🇿', label: 'Study in New Zealand', slug: 'New Zealand' },
                { flag: '🇨🇦', label: 'Study in Canada', slug: 'Canada' },
                { flag: '🇺🇸', label: 'Study in USA', slug: 'United States' },
                { flag: '🇩🇪', label: 'Study in Europe / Germany', slug: 'Germany' },
                { flag: '🇲🇾', label: 'Study in Malaysia', slug: 'Malaysia' },
                { flag: '🇰🇷', label: 'Study in South Korea', slug: 'South Korea' },
              ].map((d) => (
                <li key={d.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate('destinations', d.slug)}
                    className="flex items-center gap-2 text-left hover:text-[#D97706] dark:hover:text-[#FBB034] transition-colors cursor-pointer w-full"
                  >
                    <span>{d.flag}</span>
                    <span>{d.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Usefull Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-red-500 dark:text-red-400 tracking-wide">
              Usefull Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {[
                { label: 'About Us', view: 'about' },
                { label: 'Study Abroad Guidance', view: 'services', slug: 'admission-support' },
                { label: 'University Selection Support', view: 'universities' },
                { label: 'Admission & Application Process', view: 'services', slug: 'student-visa-assistance' },
                { label: 'Student Success Stories', view: 'home' },
                { label: 'Latest News & Updates', view: 'blog' },
                { label: 'FAQ', view: 'faq' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.view, link.slug)}
                    className="hover:text-[#D97706] dark:hover:text-[#FBB034] transition-colors cursor-pointer text-left block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick links with requested exact items */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-red-500 dark:text-red-400 tracking-wide">
              Quick links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              {[
                { label: 'Blog', view: 'blog' },
                { label: 'Courses', view: 'courses' },
                { label: 'Home', view: 'home' },
                { label: 'Universities', view: 'universities' },
                { label: 'Contact', view: 'home' },
                { label: 'Our Services', view: 'services' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.view)}
                    className="hover:text-[#D97706] dark:hover:text-[#FBB034] transition-colors cursor-pointer text-left block"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar: Privacy Policy, Refund Policy, Terms & Conditions */}
        <div className="pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Global Education Expert Services (GEES). All rights reserved.</p>
          <div className="flex items-center gap-6 flex-wrap">
            <button type="button" onClick={() => onNavigate('home')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onNavigate('home')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              Refund Policy
            </button>
            <button type="button" onClick={() => onNavigate('home')} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Giant Interactive "GEES" Beam Wordmark Stage */}
      <div
        ref={wordRef}
        className="gees-word"
        style={{ height: size ? wordHeight(size, base, 0.14) : "calc(0.94 * 26cqw)" }}
      >
        <p className="sr-only">{word}</p>
        <div className="gees-word-box">
          <div ref={innerRef} className="gees-word-in" aria-hidden="true">
            {letters.map((ch, i) => (
              <span key={i} className="gees-lw" style={{ "--bwf-d": 260 + i * 75 + "ms" } as React.CSSProperties}>
                <span className="gees-l" onClick={hop} onAnimationEnd={(e) => e.currentTarget.classList.remove("is-hop")}>
                  {ch === " " ? " " : ch}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="gees-foot" aria-hidden="true" />
      </div>
    </footer>
  );
};
