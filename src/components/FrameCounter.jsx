'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * FrameCounter
 *
 * Renders the frame count inline (no fixed positioning).
 * Expose DOM refs upward via `ref` so the parent can write directly
 * without React re-renders on every frame (60fps safe).
 *
 * Usage in parent:
 *   const fcRef = useRef();
 *   <FrameCounter ref={fcRef} />
 *   // then update:
 *   fcRef.current.setFrame(frame, total);
 */
const FrameCounter = forwardRef(function FrameCounter(_, ref) {
  const currentRef = useRef(null);
  const totalRef   = useRef(null);
  const barRef     = useRef(null);

  // Expose an imperative API so parent can update with direct DOM writes
  useImperativeHandle(ref, () => ({
    setFrame(frame, total) {
      if (currentRef.current)
        currentRef.current.textContent = String(frame + 1).padStart(4, '0');
      if (totalRef.current)
        totalRef.current.textContent   = String(total).padStart(4, '0');
      if (barRef.current) {
        const pct = total > 0 ? ((frame + 1) / total) * 100 : 0;
        barRef.current.style.width = `${pct}%`;
      }
    },
  }));

  return (
    <>
      {/* FRAME label */}
      <span style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase',
      }}>
        Frame
      </span>

      {/* current frame */}
      <span
        ref={currentRef}
        style={{
          marginLeft: '6px', color: '#fff',
          fontSize: '11.5px', fontWeight: 700,
          fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
        }}
      >
        0001
      </span>

      <span style={{ margin: '0 4px', color: 'rgba(255,255,255,0.18)', fontSize: '9px' }}>/</span>

      {/* total frames */}
      <span
        ref={totalRef}
        style={{
          color: 'rgba(255,255,255,0.28)',
          fontSize: '10.5px', fontWeight: 400,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        2155
      </span>

      {/* mini progress bar */}
      <div style={{
        marginLeft: '8px', width: '36px', height: '2px',
        background: 'rgba(255,255,255,0.1)', borderRadius: '2px',
        overflow: 'hidden', flexShrink: 0,
      }}>
        <div
          ref={barRef}
          style={{ height: '100%', width: '0%', background: '#fff', borderRadius: '2px' }}
        />
      </div>
    </>
  );
});

export default FrameCounter;
