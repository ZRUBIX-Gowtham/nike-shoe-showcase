'use client';

import { useEffect, useRef } from 'react';

export default function AutoScrollControl({
  isOpen,
  onClose,
  isAutoScrolling,
  setIsAutoScrolling,
  speed,
  setSpeed,
  isPaused,
  setIsPaused,
  isLocked,
}) {
  const speedRef = useRef(speed);
  const isPausedRef = useRef(isPaused);
  const isAutoScrollingRef = useRef(isAutoScrolling);
  const isLockedRef = useRef(isLocked);

  // Keep refs up-to-date to avoid recreating loop on state change
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { isAutoScrollingRef.current = isAutoScrolling; }, [isAutoScrolling]);
  useEffect(() => { isLockedRef.current = isLocked; }, [isLocked]);

  // Smooth Scroll Loop using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;

    const tick = () => {
      if (
        isAutoScrollingRef.current &&
        !isPausedRef.current &&
        !isLockedRef.current
      ) {
        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // Calculate increment: 1.0x speed maps to 1.5px per frame
        const scrollIncrement = speedRef.current * 1.5;

        if (currentScroll >= maxScroll - 1) {
          // Stop auto scrolling at the bottom
          setIsAutoScrolling(false);
          setIsPaused(false);
        } else {
          window.scrollTo(0, currentScroll + scrollIncrement);
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    if (isAutoScrolling) {
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling]);

  // Handle Preset Clicks
  const handlePreset = (val) => {
    setSpeed(val);
  };

  const handleOk = () => {
    setIsAutoScrolling(true);
    setIsPaused(false);
    onClose();
  };

  const handleStop = () => {
    setIsAutoScrolling(false);
    setIsPaused(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* --- Premium Glassmorphic Speed Adjustment Modal --- */
        .autoscroll-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .autoscroll-modal-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .autoscroll-modal-card {
          background: rgba(15, 15, 18, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 32px;
          width: 90%;
          max-width: 440px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 
                      0 0 100px rgba(255, 58, 45, 0.1);
          transform: translateY(20px) scale(0.95);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          color: #ffffff;
        }

        .autoscroll-modal-overlay.open .autoscroll-modal-card {
          transform: translateY(0) scale(1);
        }

        .autoscroll-title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          background: linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill_color: transparent;
          background-clip: text;
        }

        .autoscroll-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 24px;
          line-height: 1.5;
        }

        /* --- Slider Styling --- */
        .speed-slider-container {
          margin-bottom: 24px;
        }

        .speed-readout {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }

        .speed-readout-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.4);
        }

        .speed-readout-value {
          font-size: 28px;
          font-weight: 900;
          color: #FF3A2D;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 20px rgba(255, 58, 45, 0.3);
        }

        .custom-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          transition: background 0.3s;
        }

        .custom-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          cursor: pointer;
        }

        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #FF3A2D;
          cursor: pointer;
          margin-top: -7px;
          box-shadow: 0 0 10px rgba(255, 58, 45, 0.5);
          transition: transform 0.15s, background-color 0.15s;
        }

        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          background: #FF3A2D;
          border-color: #ffffff;
        }

        /* --- Preset Badges --- */
        .preset-container {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
        }

        .preset-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 8px 0;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .preset-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .preset-btn.active {
          background: rgba(255, 58, 45, 0.15);
          border-color: #FF3A2D;
          color: #FF3A2D;
          box-shadow: 0 0 12px rgba(255, 58, 45, 0.15);
        }

        /* --- Action Buttons --- */
        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .btn-cancel {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 14px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: all 0.25s;
        }

        .btn-cancel:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .btn-ok {
          flex: 2;
          background: linear-gradient(90deg, #FF3A2D, #FF8C00);
          border: none;
          border-radius: 14px;
          padding: 14px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255, 58, 45, 0.3);
          transition: all 0.25s;
        }

        .btn-ok:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(255, 58, 45, 0.45);
        }

        /* --- Premium Bottom Auto Scroll Controller (Compact Layout) --- */
        .bottom-scroll-bar {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%) translateY(40px);
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 10px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 9999;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
                      0 0 20px rgba(255, 58, 45, 0.03);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .bottom-scroll-bar.visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Status indicator pulsing light */
        .status-dot-container {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-left: 2px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 6px #4ade80;
        }

        .status-dot.pulsing {
          animation: pulseGreen 1.5s infinite alternate;
        }

        .status-dot.paused {
          background: #fbbf24;
          box-shadow: 0 0 6px #fbbf24;
          animation: none;
        }

        .status-text {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
        }

        .status-speed-badge {
          background: rgba(255, 255, 255, 0.08);
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 8px;
          font-weight: 700;
          color: #FF3A2D;
          font-variant-numeric: tabular-nums;
        }

        /* Divider inside bottom bar */
        .bar-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Control Buttons in Bottom Bar */
        .controls-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .control-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 9px;
          transition: all 0.2s ease;
        }

        .control-btn:hover {
          background: #ffffff;
          color: #000000;
          transform: scale(1.08);
          border-color: #ffffff;
        }

        .control-btn.btn-play-pause {
          background: rgba(255, 58, 45, 0.1);
          border-color: rgba(255, 58, 45, 0.2);
          color: #FF3A2D;
        }

        .control-btn.btn-play-pause:hover {
          background: #FF3A2D;
          color: #ffffff;
          border-color: #FF3A2D;
          box-shadow: 0 0 10px rgba(255, 58, 45, 0.4);
        }

        .control-btn.btn-stop:hover {
          background: #ef4444;
          color: #ffffff;
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
        }

        /* Keyframes */
        @keyframes pulseGreen {
          0% { transform: scale(0.9); opacity: 0.6; box-shadow: 0 0 4px #4ade80; }
          100% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 12px #4ade80; }
        }
      `}} />

      {/* Speed Modal Overlay */}
      <div
        id="autoscroll-overlay"
        className={`autoscroll-modal-overlay ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.target.id === 'autoscroll-overlay' && onClose()}
      >
        <div className="autoscroll-modal-card">
          <div className="autoscroll-title">Auto Scroll Speed</div>
          <div className="autoscroll-subtitle">
            Choose your automated exploration speed. You can pause, play, or adjust speed anytime from the bottom controller.
          </div>

          {/* Slider */}
          <div className="speed-slider-container">
            <div className="speed-readout">
              <span className="speed-readout-label">Exploration Speed</span>
              <span className="speed-readout-value">{speed.toFixed(1)}x</span>
            </div>
            <input
              id="autoscroll-speed-slider"
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="custom-slider"
            />
          </div>

          {/* Quick Presets */}
          <div className="preset-container">
            {[
              { label: 'Slow', val: 1.0 },
              { label: 'Medium', val: 2.0 },
              { label: 'Fast', val: 3.5 },
              { label: 'Turbo', val: 5.0 },
            ].map((p) => (
              <button
                key={p.label}
                id={`preset-${p.label.toLowerCase()}`}
                className={`preset-btn ${Math.abs(speed - p.val) < 0.05 ? 'active' : ''}`}
                onClick={() => handlePreset(p.val)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Modal Actions */}
          <div className="modal-actions">
            <button
              id="autoscroll-btn-cancel"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              id="autoscroll-btn-ok"
              className="btn-ok"
              onClick={handleOk}
            >
              Enable Auto Scroll
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Remote Control Bar */}
      <div className={`bottom-scroll-bar ${isAutoScrolling ? 'visible' : ''}`}>
        {/* Status Indication */}
        <div className="status-dot-container">
          <div className={`status-dot ${isPaused ? 'paused' : 'pulsing'}`} />
          <span className="status-text">
            {isPaused ? 'Paused' : 'Auto Scrolling'}
          </span>
          <span className="status-speed-badge">{speed.toFixed(1)}x</span>
        </div>

        {/* Vertical Divider */}
        <div className="bar-divider" />

        {/* Controls */}
        <div className="controls-row">
          {/* Speed Down */}
          <button
            id="autoscroll-btn-speed-down"
            className="control-btn"
            title="Slower"
            onClick={() => setSpeed(Math.max(0.5, parseFloat((speed - 0.2).toFixed(1))))}
            aria-label="Decrease Speed"
          >
            <i className="fas fa-minus" />
          </button>

          {/* Play/Pause */}
          <button
            id="autoscroll-btn-play-pause"
            className="control-btn btn-play-pause"
            title={isPaused ? 'Resume Scroll' : 'Pause Scroll'}
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            <i className={isPaused ? 'fas fa-play' : 'fas fa-pause'} />
          </button>

          {/* Speed Up */}
          <button
            id="autoscroll-btn-speed-up"
            className="control-btn"
            title="Faster"
            onClick={() => setSpeed(Math.min(5.0, parseFloat((speed + 0.2).toFixed(1))))}
            aria-label="Increase Speed"
          >
            <i className="fas fa-plus" />
          </button>

          {/* Stop / Turn Off */}
          <button
            id="autoscroll-btn-stop"
            className="control-btn btn-stop"
            title="Stop Auto Scroll"
            onClick={handleStop}
            aria-label="Stop"
          >
            <i className="fas fa-stop" />
          </button>
        </div>
      </div>
    </>
  );
}
