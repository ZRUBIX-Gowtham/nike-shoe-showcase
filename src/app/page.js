'use client';

import { useEffect, useState } from 'react';
import ScrollSequence from '@/components/ScrollSequence';

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-[1000vh] bg-black select-none">
      
      {/* High-Performance Canvas Scroll Sequence */}
      <ScrollSequence />

      {/* Atmospheric Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* Hero Title */}
      <div 
        className={`fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-20 transition-all duration-1000 ease-out ${
          hasScrolled ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-2xl text-center">
          Headphone
        </h1>
        <p className="mt-4 text-white/50 tracking-[0.3em] font-light text-xs md:text-sm uppercase text-center">
          Immersive 3D Audio Experience
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div 
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none z-20 transition-all duration-1000 ease-out ${
          hasScrolled ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-light whitespace-nowrap">
          Scroll to explore
        </span>
        <div className="animate-bounce">
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </div>

    </main>
  );
}
