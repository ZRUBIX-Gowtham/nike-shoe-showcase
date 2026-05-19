'use client';

import { useEffect, useRef } from 'react';
import ScrollSequence from '@/components/ScrollSequence';

export default function Home() {
  const heroRef = useRef(null);
  const finalRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        // --- HERO TITLE: fades out between 0% and 5% scroll ---
        if (heroRef.current) {
          const heroHideProgress = Math.min(1, Math.max(0, progress / 0.05));
          const heroOpacity = 1 - heroHideProgress;
          const heroScale = 1 + (heroHideProgress * 0.1);
          const heroBlur = heroHideProgress * 20;

          heroRef.current.style.opacity = heroOpacity;
          heroRef.current.style.transform = `translate(-50%, -50%) scale(${heroScale})`;
          heroRef.current.style.filter = `blur(${heroBlur}px)`;
        }

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
          finalRef.current.style.transform = `translate(-50%, -50%) scale(${finalScale})`;
          finalRef.current.style.filter = `blur(${finalBlur}px)`;
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-[1000vh] bg-black select-none">

      {/* High-Performance Canvas Scroll Sequence */}
      <ScrollSequence />

      {/* Atmospheric Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* Hero Title */}
      <div
        ref={heroRef}
        className="fixed top-[40%] left-1/2 flex flex-col items-center justify-center pointer-events-none z-20 w-full"
        style={{ transform: 'translate(-50%, -50%) scale(1)' }}
      >
        <h1 className="text-[14vw] leading-none font-black tracking-tighter text-white uppercase text-center drop-shadow-2xl">
          SONY
        </h1>
        <p className="mt-2 text-white/50 tracking-[0.5em] font-light text-xs md:text-lg uppercase text-center drop-shadow-md">
          Immersive 3D Audio Experience
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="fixed bottom-12 left-1/2 flex flex-col items-center justify-center pointer-events-none z-20"
        style={{ transform: 'translate(-50%, 0)' }}
      >
        <span className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase font-light whitespace-nowrap">
          Scroll to explore
        </span>
        <div className="animate-bounce">
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </div>

      {/* Final Frame Title */}
      <div
        ref={finalRef}
        className="fixed top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none z-20 w-full"
        style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(1.1)', filter: 'blur(20px)' }}
      >
        <h2 className="text-[10vw] leading-none font-black tracking-tighter text-white uppercase text-center drop-shadow-2xl">
          WH-1000XM5
        </h2>
        <p className="mt-4 text-white/70 tracking-[0.4em] font-light text-xs md:text-base uppercase text-center drop-shadow-md">
          Two shades. Pure silence.
        </p>
      </div>

    </main>
  );
}
