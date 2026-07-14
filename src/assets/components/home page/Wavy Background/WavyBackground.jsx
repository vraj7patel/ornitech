import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import "./WavyBackground.css";

/**
 * WavyBackground — Aceternity UI official component.
 * Uses simplex-noise to render organic flowing wave ribbons on HTML5 Canvas.
 */
export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) {
  const noise = createNoise3D();
  const canvasRef = useRef(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.0015;
    }
  };

  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#2dd4bf",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let h = (canvas.height = canvas.offsetHeight || window.innerHeight);
    ctx.filter = `blur(${blur}px)`;
    let nt = 0;

    const drawWave = (n) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth ?? 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    let animationId;
    const render = () => {
      ctx.fillStyle = backgroundFill ?? "#000000";
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth || window.innerWidth;
      h = canvas.height = canvas.offsetHeight || window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [blur, speed, waveWidth, backgroundFill, waveOpacity]);

  return (
    <div className={`wavy-container ${containerClassName || ""}`}>
      <canvas
        className="wavy-canvas"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div className={`wavy-content ${className || ""}`} {...props}>
        {children}
      </div>
    </div>
  );
}

export function WavyBackgroundDemo() {
  return (
    <WavyBackground className="wavy-demo-content">
      <h2 className="wavy-title">Smart Web AI</h2>
      <p className="wavy-subtitle">
        Combining cutting-edge web technologies with AI to build smarter, faster, and future-ready applications.
      </p>
    </WavyBackground>
  );
}
