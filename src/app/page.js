'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import ScrollSequence from '@/components/ScrollSequence';
import HomeFloatingMenu from '@/components/HomeFloatingMenu';
import Preloader from '@/components/Preloader';
import NetworkIndicator from '@/components/NetworkIndicator';
import CustomCursor from '@/components/CustomCursor';
import HomeHero from '@/components/HomeHero';

export default function Home() {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // True until the preloader exit animation FULLY completes
  const [preloaderGone, setPreloaderGone] = useState(false);

  // Live frame tracking (from ScrollSequence callback)
  const currentFrameRef = useRef(0);
  const totalFrameRef = useRef(0);

  const finalRef = useRef(null);
  const heroTextRef = useRef(null);
  const indicatorRef = useRef(null);
  const contentOverlay1Ref = useRef(null);
  const contentOverlay2Ref = useRef(null);
  const contentOverlay3Ref = useRef(null);
  const contentOverlay4Ref = useRef(null);

  // HUD DOM refs (direct DOM writes for performance — avoids react re-renders on every frame)
  const frameCurrentRef = useRef(null);
  const frameTotalRef = useRef(null);
  const frameBarRef = useRef(null);

  // Lock scroll until preloader animation is 100% done (not just when images load)
  useEffect(() => {
    if (!preloaderGone) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [preloaderGone]);

  // ── SCROLL ANIMATIONS ──────────────────────────────────────────────────────
  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        // --- SCROLL INDICATOR: fades out between 0% and 5% ---
        if (indicatorRef.current) {
          const indicatorHideProgress = Math.min(1, Math.max(0, progress / 0.05));
          const indicatorOpacity = 1 - indicatorHideProgress;
          const indicatorTranslateY = indicatorHideProgress * 32;

          indicatorRef.current.style.opacity = indicatorOpacity;
          indicatorRef.current.style.transform = `translate(-50%, ${indicatorTranslateY}px)`;
        }

        // --- FINAL TITLE: fades in between 95% and 100% scroll ---
        if (finalRef.current) {
          const finalShowProgress = Math.min(1, Math.max(0, (progress - 0.95) / 0.05));
          const finalOpacity = finalShowProgress;
          const finalScale = 1.1 - (finalShowProgress * 0.1);
          const finalBlur = (1 - finalShowProgress) * 20;

          finalRef.current.style.opacity = finalOpacity;
          finalRef.current.style.transform = `scale(${finalScale})`;
          finalRef.current.style.filter = `blur(${finalBlur}px)`;
        }

        // Note: The frame-specific content overlays are now handled synchronously inside the
        // handleFrameChange callback to guarantee perfect frame alignment with the shoe animation.
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Frame change handler — wrapped in useCallback for stable identity
  const handleFrameChange = useCallback((frame, total) => {
    currentFrameRef.current = frame;
    totalFrameRef.current = total;

    const displayFrame = frame + 1; // 1-indexed to match user's frame numbers

    if (frameCurrentRef.current) {
      frameCurrentRef.current.textContent = String(displayFrame).padStart(4, '0');
    }
    if (frameTotalRef.current) {
      frameTotalRef.current.textContent = String(total).padStart(4, '0');
    }
    if (frameBarRef.current) {
      const pct = total > 0 ? (displayFrame / total) * 100 : 0;
      frameBarRef.current.style.width = `${pct}%`;
    }

    // Update the giant hero text "NIKE" opacity based on frame
    if (heroTextRef.current) {
      let heroOpacity = 0;
      let heroScale = 1;

      if (displayFrame <= 48) {
        heroOpacity = 1;
        heroScale = 1;
      } else if (displayFrame < 58) {
        // fade out from 48 to 58
        const t = (displayFrame - 48) / 10;
        heroOpacity = 1 - t;
        heroScale = 1 - (t * 0.05); // subtle shrinking effect as it fades
      } else {
        heroOpacity = 0;
        heroScale = 0.95;
      }

      heroTextRef.current.style.opacity = heroOpacity;
      heroTextRef.current.style.transform = `scale(${heroScale})`;
      heroTextRef.current.style.pointerEvents = heroOpacity > 0.01 ? 'auto' : 'none';
    }

    // Helper to calculate and apply overlay animation style based on the frame position
    const updateOverlay = (ref, start, end, fadeInLen = 20, fadeOutLen = 20) => {
      if (!ref.current) return;
      let opacity = 0;
      let translateY = 30;

      if (displayFrame >= start && displayFrame <= end) {
        if (displayFrame < start + fadeInLen) {
          const t = (displayFrame - start) / fadeInLen;
          opacity = t;
          translateY = 30 * (1 - t);
        } else if (displayFrame > end - fadeOutLen) {
          const t = (end - displayFrame) / fadeOutLen;
          opacity = t;
          translateY = -20 * (1 - t);
        } else {
          opacity = 1;
          translateY = 0;
        }
      }

      ref.current.style.opacity = opacity;
      ref.current.style.transform = `translateY(${translateY}px)`;
      ref.current.style.pointerEvents = opacity > 0.01 ? 'auto' : 'none';
    };

    // Update each overlay using its specific frame range
    updateOverlay(contentOverlay1Ref, 58, 167, 20, 20);
    updateOverlay(contentOverlay2Ref, 293, 363, 15, 15);
    updateOverlay(contentOverlay3Ref, 887, 940, 15, 15);
    updateOverlay(contentOverlay4Ref, 1315, 1400, 18, 18);
  }, []);

  return (
    <main className="relative min-h-[1000vh] bg-black select-none">

      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Local style injection for self-contained animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes heroEntrance {
          0% {
            opacity: 0;
            letter-spacing: 0.15em;
            filter: blur(25px) drop-shadow(0 20px 40px rgba(0, 0, 0, 0));
            transform: translateX(-0.03em) scale(0.92);
          }
          30% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
            letter-spacing: -0.045em;
            filter: blur(0px) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
            transform: translateX(-0.03em) scale(1);
          }
        }

        .hero-entrance {
          animation: heroEntrance 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-initial {
          opacity: 0;
          letter-spacing: 0.15em;
          filter: blur(25px);
          transform: translateX(-0.03em) scale(0.92);
          will-change: transform, opacity, filter, letter-spacing;
        }
      `}} />

      {/* Premium Preloader — scroll stays locked until exit animation completes */}
      <Preloader
        loaded={loadedCount}
        total={totalCount}
        onExitComplete={() => setPreloaderGone(true)}
      />

      {/* Floating Menu */}
      <HomeFloatingMenu />

      {/* High-Performance Canvas Scroll Sequence */}
      <ScrollSequence
        onProgress={(loaded, total) => {
          setLoadedCount(loaded);
          setTotalCount(total);
        }}
        onLoadingComplete={() => {
          setIsLoading(false);
        }}
        onFrameChange={handleFrameChange}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* ── GIANT HERO TEXT "NIKE" & BG RINGS ── */}
      <HomeHero ref={heroTextRef} />

      {/* ── TOP-RIGHT HUD: Frame + Network — z-index 10000 so it shows ABOVE the preloader ── */}
      <div className="fixed top-5 right-5 pointer-events-none" style={{ zIndex: 10000 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0px',
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '999px',
          padding: '0 12px',
          height: '26px',
          whiteSpace: 'nowrap',
        }}>
          {/* FRAME label */}
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Frame</span>
          <span style={{ marginLeft: '6px', color: '#fff', fontSize: '11.5px', fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }} ref={frameCurrentRef}>0001</span>
          <span style={{ margin: '0 4px', color: 'rgba(255,255,255,0.18)', fontSize: '9px' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10.5px', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }} ref={frameTotalRef}>2155</span>
          {/* progress bar */}
          <div style={{ marginLeft: '8px', width: '36px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', flexShrink: 0 }}>
            <div ref={frameBarRef} style={{ height: '100%', width: '0%', background: '#fff', borderRadius: '2px' }} />
          </div>

          {/* thin divider */}
          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.12)', margin: '0 10px', flexShrink: 0 }} />

          {/* Network speed — from dedicated component (uses real navigator.connection) */}
          <NetworkIndicator />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="fixed bottom-10 gap-2 left-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
        style={{ transform: 'translate(-50%, 0)' }}
      >
        <span className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase font-light whitespace-nowrap">
          Scroll to explore
        </span>
        <div className="animate-bounce">
          <div className="w-[1px] h-5 md:h-6 bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </div>

      {/* ── FRAME 58 TO 167: Air Max Pulse Overlay ── */}
      <div
        ref={contentOverlay1Ref}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'none' }}
      >
        {/* Left column — main editorial copy */}
        <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-[90vw] md:max-w-[480px]">
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '4px 14px',
            width: 'fit-content',
          }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: '#FF3A2D',
              boxShadow: '0 0 8px #FF3A2D',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>
              New Drop — 2025
            </span>
          </div>

          {/* Hero headline */}
          <div>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 0 60px rgba(255,255,255,0.15)',
            }}>
              Air Max
            </h2>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#FF3A2D,#FF8C00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Pulse
            </h2>
          </div>

          {/* Sub-copy */}
          <p style={{
            margin: 0,
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            lineHeight: 1.7,
            maxWidth: '380px',
          }}>
            Built for the relentless. Every stride amplified by next-generation Air cushioning that reads the road and responds before you do.
          </p>

          {/* Feature badges row */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { icon: '⚡', label: 'Responsive Air Unit' },
              { icon: '🌬', label: 'Breathable Mesh' },
              { icon: '🏃', label: 'All-Day Comfort' },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                padding: '5px 12px',
              }}>
                <span style={{ fontSize: '11px' }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#FF3A2D,#FF8C00)', borderRadius: '2px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              Nike Sportswear
            </span>
          </div>
        </div>

        {/* Right column — vertical stat strip */}
        <div className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 flex-col items-end gap-6">
          {[
            { value: '270°', label: 'Air Visibility' },
            { value: '12mm', label: 'Stack Height' },
            { value: '196g', label: 'Weight' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FRAME 293 TO 363: Court Legacy / Hoops Culture Overlay ── */}
      <div
        ref={contentOverlay2Ref}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'none' }}
      >
        {/* Left column — main editorial copy */}
        <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-[90vw] md:max-w-[480px]">
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '4px 14px',
            width: 'fit-content',
          }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: '#FF007F',
              boxShadow: '0 0 8px #FF007F',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>
              Heritage Series
            </span>
          </div>

          {/* Hero headline */}
          <div>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 0 60px rgba(255,255,255,0.15)',
            }}>
              Hoops
            </h2>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#FF007F,#00F5D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Legacy
            </h2>
          </div>

          {/* Sub-copy */}
          <p style={{
            margin: 0,
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            lineHeight: 1.7,
            maxWidth: '380px',
          }}>
            Rooted in hardwood history, styled for the modern creator. A premium blend of retro vibes and modern comfort that keeps the game alive off the court.
          </p>

          {/* Feature badges row */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { icon: '🏀', label: 'Classic Silhouette' },
              { icon: '🎨', label: 'Retro Colorways' },
              { icon: '🔒', label: 'Locked-In Support' },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                padding: '5px 12px',
              }}>
                <span style={{ fontSize: '11px' }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#FF007F,#00F5D4)', borderRadius: '2px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              Nike Court
            </span>
          </div>
        </div>

        {/* Right column — vertical stat strip */}
        <div className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 flex-col items-end gap-6">
          {[
            { value: '1985', label: 'Debut Year' },
            { value: '100%', label: 'Leather Upper' },
            { value: 'Cup', label: 'Rubber Outsole' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FRAME 887 TO 940: Air Jordan Retro Overlay ── */}
      <div
        ref={contentOverlay3Ref}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'none' }}
      >
        {/* Left column — main editorial copy */}
        <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-[90vw] md:max-w-[480px]">
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '4px 14px',
            width: 'fit-content',
          }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: '#FF9F0A',
              boxShadow: '0 0 8px #FF9F0A',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>
              Flight Club
            </span>
          </div>

          {/* Hero headline */}
          <div>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 0 60px rgba(255,255,255,0.15)',
            }}>
              Jordan
            </h2>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#FF9F0A,#BF5AF2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Retro
            </h2>
          </div>

          {/* Sub-copy */}
          <p style={{
            margin: 0,
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            lineHeight: 1.7,
            maxWidth: '380px',
          }}>
            The champion of sneakers. Featuring bold varsity color blocking, premium materials, and the legendary encapsulated Air unit for lightweight bounce.
          </p>

          {/* Feature badges row */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { icon: '🔥', label: 'Jumpman Wings' },
              { icon: '👑', label: 'Premium Suede' },
              { icon: '💨', label: 'Cushioned Walk' },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                padding: '5px 12px',
              }}>
                <span style={{ fontSize: '11px' }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#FF9F0A,#BF5AF2)', borderRadius: '2px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              Jordan Brand
            </span>
          </div>
        </div>

        {/* Right column — vertical stat strip */}
        <div className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 flex-col items-end gap-6">
          {[
            { value: 'Air', label: 'Sole Cushioning' },
            { value: 'High', label: 'Collar Height' },
            { value: 'OG', label: 'Color Block' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FRAME 1315 TO 1400: Air Max Dn Overlay ── */}
      <div
        ref={contentOverlay4Ref}
        className="fixed inset-0 z-20 pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'none' }}
      >
        {/* Left column — main editorial copy */}
        <div className="absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-[90vw] md:max-w-[480px]">
          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '4px 14px',
            width: 'fit-content',
          }}>
            <span style={{
              display: 'inline-block', width: 6, height: 6,
              borderRadius: '50%', background: '#dffe00',
              boxShadow: '0 0 8px #dffe00',
            }} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>
              Future of Air
            </span>
          </div>

          {/* Hero headline */}
          <div>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: '#ffffff',
              textShadow: '0 0 60px rgba(255,255,255,0.15)',
            }}>
              Air Max
            </h2>
            <h2 style={{
              margin: 0, padding: 0,
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg,#dffe00,#00d2ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Dn
            </h2>
          </div>

          {/* Sub-copy */}
          <p style={{
            margin: 0,
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            color: 'rgba(255,255,255,0.55)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            lineHeight: 1.7,
            maxWidth: '380px',
          }}>
            Step into the next dimension of Air. Our dual-pressure Dynamic Air unit system responds to your gait, delivering an active transition with every single step.
          </p>

          {/* Feature badges row */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
            {[
              { icon: '🌀', label: 'Dynamic Air Pods' },
              { icon: '🚀', label: 'Next-Gen Energy' },
              { icon: '🕸', label: 'Multi-Layer Mesh' },
            ].map(({ icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                padding: '5px 12px',
              }}>
                <span style={{ fontSize: '11px' }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accent rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#dffe00,#00d2ff)', borderRadius: '2px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              Nike Innovation
            </span>
          </div>
        </div>

        {/* Right column — vertical stat strip */}
        <div className="hidden md:flex absolute right-[6%] top-1/2 -translate-y-1/2 flex-col items-end gap-6">
          {[
            { value: '2-Set', label: 'Pressure Tubes' },
            { value: '13.9k', label: 'Price tier' },
            { value: 'Futur', label: 'Tech Build' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Frame Title */}
      <div
        ref={finalRef}
        className="fixed bottom-[15%] right-[8%] md:right-[10%] flex flex-col items-end justify-center pointer-events-none z-20"
        style={{ opacity: 0, transform: 'scale(1.1)', filter: 'blur(20px)' }}
      >
        <h2 className="text-[12vw] md:text-[8vw] leading-none font-black tracking-tighter text-white uppercase text-right drop-shadow-2xl">
          NIKE
        </h2>
        <p className="mt-2 md:mt-4 text-white/70 tracking-[0.4em] font-light text-xs md:text-base uppercase text-right drop-shadow-md">
          Just Do It.
        </p>
      </div>

    </main>
  );
}
