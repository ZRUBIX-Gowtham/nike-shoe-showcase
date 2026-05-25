'use client';

import { useEffect, useState } from 'react';

export default function Preloader({ loaded, total, onExitComplete }) {
  const [percent, setPercent]           = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [exiting, setExiting]           = useState(false);

  const target = total > 0 ? Math.round((loaded / total) * 100) : 0;

  /* Smooth percentage — catch up gradually */
  useEffect(() => {
    if (target <= percent) return;
    const diff = target - percent;
    const t = setTimeout(
      () => setPercent(p => Math.min(100, p + Math.ceil(diff / 4))),
      16
    );
    return () => clearTimeout(t);
  }, [target, percent]);

  /* Exit sequence — starts after percent hits 100 */
  useEffect(() => {
    if (percent < 100) return;
    const t1 = setTimeout(() => setExiting(true), 800);
    const t2 = setTimeout(() => {
      setShouldRender(false);
      if (onExitComplete) onExitComplete();
    }, 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [percent, onExitComplete]);

  if (!shouldRender) return null;

  return (
    <>
      <style>{`
        @keyframes pl-glowPulse {
          0% { opacity: 0.12; transform: scale(0.95); }
          100% { opacity: 0.28; transform: scale(1.05); }
        }

        @keyframes pl-exit {
          to {
            opacity: 0;
          }
        }

        #pl-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: #050505;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        #pl-root.exiting {
          animation: pl-exit 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Large background ambient glow */
        .pl-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0) 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
          animation: pl-glowPulse 4s ease-in-out infinite alternate;
        }

        /* Giant typographic wrapper to match hero layout exactly */
        .pl-giant-brand-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 2;
        }

        .pl-giant-text {
          margin: 0;
          padding: 0 1em;
          font-family: "Impact", "Arial Black", -apple-system, sans-serif;
          font-size: clamp(90px, 23vw, 420px);
          font-weight: 950;
          font-style: italic;
          line-height: 0.8;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          text-align: center;
          position: absolute;
          width: 100%;
          box-sizing: border-box;
        }

        .pl-giant-text-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.08);
          z-index: 1;
        }

        .pl-giant-text-fill {
          color: #ffffff;
          background: linear-gradient(to bottom, #ffffff 30%, #b0b0b0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.6));
          transition: clip-path 0.3s cubic-bezier(0.1, 0.8, 0.2, 1);
          z-index: 2;
        }
      `}</style>

      <div id="pl-root" className={exiting ? 'exiting' : ''}>
        {/* Luxury ambient glow that pulses behind the content */}
        <div className="pl-ambient-glow" />

        {/* Giant typographic reveal aligned to match hero text exactly */}
        <div className="pl-giant-brand-wrapper">
          <h1 className="pl-giant-text pl-giant-text-outline">NIKE</h1>
          <h1 className="pl-giant-text pl-giant-text-fill" style={{ clipPath: `inset(${100 - percent}% 0 0 0)`, WebkitClipPath: `inset(${100 - percent}% 0 0 0)` }}>NIKE</h1>
        </div>
      </div>
    </>
  );
}
