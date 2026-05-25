'use client';

import { useEffect, useRef } from 'react';

/**
 * NetworkIndicator — shows real WiFi/network speed.
 *
 * Strategy (priority order):
 *  1. navigator.connection.downlink  — actual browser-measured link speed (Chrome/Edge).
 *     Updates on every 'change' event. This is the REAL WiFi speed.
 *  2. Polling fallback every 3s     — re-reads .downlink so it stays fresh even
 *     when the 'change' event doesn't fire.
 *
 * Props:
 *  fixed {boolean} — if true, renders as a self-positioned pill (for standalone use).
 *                    If false/omitted, renders inline content only (embed in parent pill).
 */
export default function NetworkIndicator({ fixed = false }) {
  const dotRef   = useRef(null);
  const speedRef = useRef(null);
  const kbRef    = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const getQ = (mbps) => {
      if (mbps >= 10)  return { label: 'FAST', color: '#22c55e' };
      if (mbps >= 2)   return { label: 'GOOD', color: '#84cc16' };
      if (mbps >= 0.5) return { label: 'SLOW', color: '#f59e0b' };
      return               { label: 'POOR', color: '#ef4444' };
    };

    const update = (mbps) => {
      if (mbps <= 0) return;
      const q   = getQ(mbps);
      const kbs = Math.round(mbps * 125); // 1 Mb/s = 125 KB/s
      if (speedRef.current) speedRef.current.textContent     = `${mbps.toFixed(1)} Mb/s`;
      if (kbRef.current)    kbRef.current.textContent        = `${kbs.toLocaleString()} KB/s`;
      if (dotRef.current)   dotRef.current.style.background  = q.color;
      if (labelRef.current) {
        labelRef.current.textContent = q.label;
        labelRef.current.style.color = q.color;
      }
    };

    // ── Primary: navigator.connection (Network Information API) ──────────────
    // Available in Chrome/Edge. Gives actual network speed estimate (real WiFi).
    // navigator.connection.downlink is in Mb/s, rounded to nearest 25kb/s.
    const conn = navigator.connection
               || navigator.mozConnection
               || navigator.webkitConnection;

    let pollInterval;

    if (conn) {
      // Read immediately
      if (conn.downlink > 0) update(conn.downlink);

      // Listen for network changes (e.g. WiFi → 4G)
      const onChange = () => {
        if (conn.downlink > 0) update(conn.downlink);
      };
      conn.addEventListener('change', onChange);

      // Also poll every 3s — 'change' fires only on big transitions
      pollInterval = setInterval(() => {
        if (conn.downlink > 0) update(conn.downlink);
      }, 3000);

      return () => {
        conn.removeEventListener('change', onChange);
        clearInterval(pollInterval);
      };
    }

    // ── Fallback: fetch-based probe (Firefox / Safari / no conn API) ─────────
    // Fetches a small external file to measure real download time.
    // Uses a CORS-friendly tiny image from a public CDN (no auth needed).
    const PROBE_URL = 'https://www.gstatic.com/generate_204'; // Google 204 — tiny, reliable
    const slidingWindow = [];
    let timer;

    const probe = async () => {
      try {
        const t0  = performance.now();
        // gstatic 204 returns an empty body — not useful for size measurement.
        // Use a tiny public image instead:
        const url = `https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png?_=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-store', mode: 'cors' });
        const buf = await res.arrayBuffer();
        const sec = Math.max(0.001, (performance.now() - t0) / 1000);
        const mbps = (buf.byteLength * 8) / sec / 1_000_000;

        slidingWindow.push(mbps);
        if (slidingWindow.length > 4) slidingWindow.shift();
        const avg = slidingWindow.reduce((a, b) => a + b, 0) / slidingWindow.length;
        update(avg);
      } catch { /* keep last value */ }
      timer = setTimeout(probe, 3000);
    };

    probe();
    return () => clearTimeout(timer);
  }, []);

  // ── Inner JSX (shared between fixed and inline modes) ────────────────────
  const inner = (
    <>
      <style>{`
        @keyframes niPulse {
          0%, 100% { opacity: 1;   transform: scale(1);   }
          50%       { opacity: 0.3; transform: scale(0.6); }
        }
      `}</style>

      {/* Pulse dot */}
      <span ref={dotRef} style={{
        display: 'inline-block', width: '5px', height: '5px',
        borderRadius: '50%', background: '#555', flexShrink: 0,
        animation: 'niPulse 1.5s ease-in-out infinite',
      }} />

      {/* "Net" label */}
      <span style={{
        marginLeft: '5px', color: 'rgba(255,255,255,0.3)',
        fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>
        Net
      </span>

      {/* Speed value — Mb/s */}
      <span ref={speedRef} style={{
        marginLeft: '6px', color: '#fff',
        fontSize: '11.5px', fontWeight: 700,
        letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
      }}>
        — Mb/s
      </span>

      {/* KB/s — smaller, dimmed */}
      <span ref={kbRef} style={{
        marginLeft: '4px', color: 'rgba(255,255,255,0.28)',
        fontSize: '8.5px', fontWeight: 400,
        fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em',
      }}>
        — KB/s
      </span>

      {/* Quality badge */}
      <span ref={labelRef} style={{
        marginLeft: '5px', fontSize: '7.5px',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: '#555', fontWeight: 600,
      }}>
        ···
      </span>
    </>
  );

  // ── Fixed mode: self-positioned pill ────────────────────────────────────
  if (fixed) {
    return (
      <div style={{
        position: 'fixed', top: '20px', right: '20px', zIndex: 10000,
        display: 'flex', alignItems: 'center',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '999px', padding: '0 12px', height: '26px',
        whiteSpace: 'nowrap', pointerEvents: 'none',
      }}>
        {inner}
      </div>
    );
  }

  // ── Inline mode: embed in parent container ───────────────────────────────
  return <>{inner}</>;
}
