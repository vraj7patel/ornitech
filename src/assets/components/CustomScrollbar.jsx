import React, { useEffect, useState, useRef } from 'react';

export function CustomScrollbar() {
  const [visualScrollTop, setVisualScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [height, setHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pathLength, setPathLength] = useState(0);
  const targetScrollTop = useRef(0);
  const animationFrameId = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sTop = window.scrollY || document.documentElement.scrollTop;
      const realScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Dynamic buffer: 120px for long pages, or 30% of scroll height for short pages
      const buffer = realScrollHeight > 400 ? 120 : Math.max(0, realScrollHeight * 0.3);
      const sHeight = Math.max(0, realScrollHeight - buffer);

      targetScrollTop.current = sTop;
      setScrollHeight(sHeight);
    };

    const handleResize = () => {
      setHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
      handleScroll();
    };

    // Initial setup
    handleScroll();
    setVisualScrollTop(window.scrollY);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleScroll, true); // Capture dynamic asset load events

    // Periodic check to ensure height stays perfectly in sync
    const intervalId = setInterval(handleScroll, 400);

    // Watch for DOM changes to update scroll height dynamically
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleScroll, true);
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);

  // requestAnimationFrame loop to smoothly interpolate visual scroll position
  useEffect(() => {
    const updateInterpolation = () => {
      setVisualScrollTop((prev) => {
        const diff = targetScrollTop.current - prev;
        // If extremely close, snap to final target to stop the loop
        if (Math.abs(diff) < 0.1) {
          return targetScrollTop.current;
        }
        // Lerp coefficient: 0.16 gives a perfect, fluid macOS-like scrollbar trail
        return prev + diff * 0.16;
      });
      animationFrameId.current = requestAnimationFrame(updateInterpolation);
    };

    animationFrameId.current = requestAnimationFrame(updateInterpolation);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [height, windowWidth]);

  // Hide on mobile screens to preserve screen estate and native behavior
  if (windowWidth < 768) {
    return null;
  }

  // Curve coordinates and dimensions
  const radius = 32;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 10;
  const horizontalLength = 80; // Curves extending left by 80px (total width ~112px from right side)

  // Path starts at the top-left, curves to the right, goes down, and curves to the bottom-left
  const pathD = `M ${150 - paddingRight - radius - horizontalLength} ${paddingTop} ` +
    `L ${150 - paddingRight - radius} ${paddingTop} ` +
    `A ${radius} ${radius} 0 0 1 ${150 - paddingRight} ${paddingTop + radius} ` +
    `L ${150 - paddingRight} ${height - paddingBottom - radius} ` +
    `A ${radius} ${radius} 0 0 1 ${150 - paddingRight - radius} ${height - paddingBottom} ` +
    `L ${150 - paddingRight - radius - horizontalLength} ${height - paddingBottom}`;

  // Scroll ratio & thumb math (clamped to prevent overflow clipping)
  const scrollFraction = scrollHeight > 0 ? Math.min(1, Math.max(0, visualScrollTop / scrollHeight)) : 0;
  const thumbLength = pathLength ? Math.max(80, pathLength * (height / (scrollHeight + height))) : 80;
  const strokeDashoffset = pathLength ? -(scrollFraction * (pathLength - thumbLength)) : 0;

  // Track click handler to scroll directly to section
  const handleTrackMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = clickY / height;
    window.scrollTo({
      top: ratio * scrollHeight,
      behavior: 'smooth',
    });
  };

  // Drag handlers for mouse
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.clientY;
    const startScrollTop = window.scrollY;

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const scrollRange = scrollHeight;
      const dragRange = height - paddingTop - paddingBottom - thumbLength;
      const ratio = dragRange > 0 ? scrollRange / dragRange : 0;

      window.scrollTo(0, startScrollTop + deltaY * ratio);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };

    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Drag handlers for touch
  const handleThumbTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startY = e.touches[0].clientY;
    const startScrollTop = window.scrollY;

    const handleTouchMove = (moveEvent) => {
      const deltaY = moveEvent.touches[0].clientY - startY;
      const scrollRange = scrollHeight;
      const dragRange = height - paddingTop - paddingBottom - thumbLength;
      const ratio = dragRange > 0 ? scrollRange / dragRange : 0;

      window.scrollTo(0, startScrollTop + deltaY * ratio);
    };

    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '150px',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="150"
        height={height}
        viewBox={`0 0 150 ${height}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Default Thumb Gradient */}
          <linearGradient id="scrollbar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>

          {/* Hover Thumb Gradient */}
          <linearGradient id="scrollbar-gradient-hover" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {/* 1. Outer Border of the Track */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="10"
          strokeLinecap="round"
          style={{
            pointerEvents: 'stroke',
            cursor: 'pointer',
          }}
          onMouseDown={handleTrackMouseDown}
        />

        {/* 2. Inner mask to blend with the body background */}
        <path
          d={pathD}
          fill="none"
          stroke="#000000"
          strokeWidth="7.5"
          strokeLinecap="round"
          style={{
            pointerEvents: 'none',
          }}
        />

        {/* 3. Track Fill (slightly lighter cyan) */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(56, 189, 248, 0.06)"
          strokeWidth="7.5"
          strokeLinecap="round"
          style={{
            pointerEvents: 'none',
          }}
        />

        {/* 4. Active Thumb */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#scrollbar-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${thumbLength} ${pathLength}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            pointerEvents: 'stroke',
            cursor: 'grab',
            transition: 'stroke 0.2s ease',
          }}
          className="custom-scrollbar-thumb"
          onMouseDown={handleThumbMouseDown}
          onTouchStart={handleThumbTouchStart}
        />
      </svg>

      <style>{`
        .custom-scrollbar-thumb:hover {
          stroke: url(#scrollbar-gradient-hover) !important;
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}

