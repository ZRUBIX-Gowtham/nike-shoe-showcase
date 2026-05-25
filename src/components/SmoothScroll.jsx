'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin if client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with enhanced buttery-smooth settings
    const lenis = new Lenis({
      lerp: 0.05,            // Lower value = smoother and more gradual deceleration (default is ~0.1)
      wheelMultiplier: 0.9,  // Slightly gentler scroll increments for elegant pacing
      touchMultiplier: 1.5,
      smoothWheel: true,
      infinite: false,
    });

    // Update GSAP ScrollTrigger on Lenis scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Add Lenis to GSAP ticker for synchronized animation updates
    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Disable lag smoothing to prevent ScrollTrigger sync lag
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
