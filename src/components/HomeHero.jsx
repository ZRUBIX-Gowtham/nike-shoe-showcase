'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagicRings from './MagicRings';

const HomeHero = forwardRef((props, ref) => {
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Calculate normalized mouse coordinates from center: -0.5 to 0.5
      const nx = (clientX / w) - 0.5;
      const ny = (clientY / h) - 0.5;

      // Opposite magnet effect: push the text away from the cursor
      // Set the max movement range in pixels (e.g. 45px)
      const maxMove = 45;
      const targetX = -nx * maxMove;
      const targetY = -ny * maxMove;

      gsap.to(textRef.current, {
        x: targetX,
        y: targetY,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      // Reset position when mouse leaves the viewport
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
      style={{ opacity: 1, transform: 'scale(1)', transition: 'none' }}
    >
      {/* Magic Rings background behind the NIKE letters — full screen */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ pointerEvents: 'auto' }}
      >
        <MagicRings
          color="#A855F7"
          colorTwo="#6366F1"
          ringCount={6}
          speed={1.0}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.85}
          blur={0}
          noiseAmount={0.06}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.2}
          hoverScale={1.15}
          parallax={0.05}
          clickBurst={true}
        />
      </div>

      <h1
        ref={textRef}
        style={{
          margin: 0,
          padding: '0 1em',
          fontFamily: '"Impact", "Arial Black", -apple-system, sans-serif',
          fontSize: 'clamp(90px, 23vw, 420px)',
          fontWeight: 950,
          fontStyle: 'italic',
          lineHeight: 0.8,
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          background: 'linear-gradient(to bottom, #ffffff 30%, #b0b0b0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        NIKE
      </h1>
    </div>
  );
});

HomeHero.displayName = 'HomeHero';

export default HomeHero;
