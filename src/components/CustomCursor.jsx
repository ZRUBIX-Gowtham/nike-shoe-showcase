'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    // Suppress custom cursor follower on touch/mobile devices
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;

    let isHovering = false;
    let isClicking = false;
    let isHidden = true;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (isHidden) {
        isHidden = false;
        dot.style.opacity = '1';
      }
    };

    const onMouseEnterWindow = () => {
      isHidden = false;
      dot.style.opacity = '1';
    };

    const onMouseLeaveWindow = () => {
      isHidden = true;
      dot.style.opacity = '0';
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    // Global Event Delegation for hover state
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .clickable, [style*="cursor: pointer"], [style*="cursor:pointer"]');
      if (isInteractive) {
        isHovering = true;
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .clickable, [style*="cursor: pointer"], [style*="cursor:pointer"]');
      if (isInteractive) {
        const related = e.relatedTarget;
        if (related) {
          const isRelatedInteractive = related.closest('a, button, [role="button"], input, select, textarea, .clickable, [style*="cursor: pointer"], [style*="cursor:pointer"]');
          if (isRelatedInteractive) return;
        }
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnterWindow);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    // Performance delegated hover check
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });

    // Smooth trailing physics ease loop
    let animationFrameId;
    const updatePosition = () => {
      // Linear interpolation (lerp) for smooth trailing delay behind standard cursor
      const ease = 0.16;
      dotX += (mouseX - dotX) * ease;
      dotY += (mouseY - dotY) * ease;

      let scale = 1;
      if (isClicking) {
        scale = 0.7;
      } else if (isHovering) {
        scale = 2.2;
      }

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) scale(${scale})`;

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: -5, // center dot (10px / 2 = 5px)
        left: -5,
        width: '10px',
        height: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'opacity 0.25s cubic-bezier(0.25, 1, 0.5, 1)',
        opacity: 0,
        mixBlendMode: 'difference',
      }}
    />
  );
}
