import React, { useEffect, useState } from 'react';
import logoImg from '../imges/IMG_3816.PNG';
import './LoadingScreen.css';

/**
 * LoadingScreen
 *
 * Props:
 *  - onDone      : called after the initial auto-dismiss animation completes
 *  - persistent  : if true, the screen stays visible until `visible` becomes false (no auto-dismiss)
 *  - visible     : controls visibility when `persistent` is true
 */
export function LoadingScreen({ onDone, persistent = false, visible = true }) {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit'

  // ── Initial auto-dismiss (only when NOT persistent) ──────────
  useEffect(() => {
    if (persistent) return;

    const exitTimer = setTimeout(() => setPhase('exit'), 2000);
    const doneTimer = setTimeout(() => { if (onDone) onDone(); }, 2700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [persistent, onDone]);

  // ── Persistent mode: react to `visible` prop changes ─────────
  useEffect(() => {
    if (!persistent) return;

    if (!visible) {
      // Trigger fade-out then call onDone
      setPhase('exit');
      const doneTimer = setTimeout(() => { if (onDone) onDone(); }, 700);
      return () => clearTimeout(doneTimer);
    } else {
      setPhase('enter');
    }
  }, [persistent, visible, onDone]);

  return (
    <div className={`loading-overlay ${phase === 'exit' ? 'loading-overlay--exit' : ''}`}>
      <div className="loading-logo-wrap">
        {/* Outer spinning arc ring */}
        <svg
          className="loading-ring"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grey full circle track */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="3"
          />
          {/* Animated arc segment */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="3"
            strokeDasharray="80 246"
            strokeDashoffset="0"
            strokeLinecap="round"
            className="loading-arc"
          />
        </svg>

        {/* Logo in the centre */}
        <div className="loading-logo-circle">
          <img src={logoImg} alt="Ornitech" className="loading-logo-img" />
        </div>
      </div>

      {/* Brand name */}
      <p className="loading-brand">Ornitech</p>
    </div>
  );
}
