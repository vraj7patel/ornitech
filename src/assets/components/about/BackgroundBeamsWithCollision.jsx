import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./BackgroundBeamsWithCollision.css";

export function BackgroundBeamsWithCollision({ children, className = "" }) {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  const beams = [
    { initialX: "10%", duration: 7, repeatDelay: 2, delay: 0.5, color1: "#a855f7", color2: "#ec4899" },
    { initialX: "24%", duration: 5, repeatDelay: 3, delay: 1.5, color1: "#38bdf8", color2: "#818cf8" },
    { initialX: "40%", duration: 6.5, repeatDelay: 4, delay: 0, color1: "#c084fc", color2: "#e879f9" },
    { initialX: "58%", duration: 4.8, repeatDelay: 2, delay: 2.2, color1: "#818cf8", color2: "#a855f7" },
    { initialX: "74%", duration: 7.2, repeatDelay: 3, delay: 1, color1: "#2dd4bf", color2: "#38bdf8" },
    { initialX: "88%", duration: 5.8, repeatDelay: 2, delay: 0.8, color1: "#e879f9", color2: "#c084fc" },
  ];

  return (
    <div
      ref={parentRef}
      className={`beams-collision-container ${className}`}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={beam.initialX + "-beam-" + index}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}
      <div className="beams-collision-content">
        {children}
      </div>
      <div
        ref={containerRef}
        className="beams-collision-floor"
      />
    </div>
  );
}

const CollisionMechanism = React.forwardRef(
  ({ parentRef, containerRef, beamOptions }, ref) => {
    const beamRef = useRef(null);
    const [collision, setCollision] = useState({
      detected: false,
      coordinates: null,
    });
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
      const checkCollision = () => {
        if (
          beamRef.current &&
          containerRef.current &&
          parentRef.current &&
          !cycleCollisionDetected
        ) {
          const beamRect = beamRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const parentRect = parentRef.current.getBoundingClientRect();

          if (beamRect.bottom >= containerRect.top) {
            const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = containerRect.top - parentRect.top;

            setCollision({
              detected: true,
              coordinates: {
                x: relativeX,
                y: relativeY,
              },
            });
            setCycleCollisionDetected(true);
          }
        }
      };

      const animationFrame = requestAnimationFrame(function animate() {
        checkCollision();
        requestAnimationFrame(animate);
      });

      return () => cancelAnimationFrame(animationFrame);
    }, [cycleCollisionDetected, containerRef, parentRef]);

    useEffect(() => {
      if (collision.detected) {
        const timer = setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [collision.detected]);

    return (
      <>
        <motion.div
          ref={beamRef}
          animate={{
            translateY: ["0px", "700px"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: beamOptions.duration || 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beamOptions.delay || 0,
            repeatDelay: beamOptions.repeatDelay || 0,
          }}
          className="collision-beam"
          style={{
            left: beamOptions.initialX,
            background: `linear-gradient(to bottom, transparent 0%, ${beamOptions.color1} 60%, ${beamOptions.color2} 100%)`,
            boxShadow: `0 0 10px ${beamOptions.color1}, 0 0 4px ${beamOptions.color2}`,
          }}
        />
        <AnimatePresence>
          {collision.detected && collision.coordinates && (
            <Explosion
              key={`${collision.coordinates.x}-${collision.coordinates.y}`}
              color1={beamOptions.color1}
              color2={beamOptions.color2}
              style={{
                left: `${collision.coordinates.x}px`,
                top: `${collision.coordinates.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ color1 = "#a855f7", color2 = "#ec4899", ...props }) => {
  const particles = Array.from({ length: 16 });

  return (
    <div {...props} className="collision-explosion-wrap">
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 1.8] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="collision-ring"
        style={{
          borderColor: color1,
          boxShadow: `0 0 15px ${color1}, inset 0 0 10px ${color2}`,
        }}
      />
      {particles.map((_, i) => {
        const angle = (i * (360 / particles.length) * Math.PI) / 180;
        const distance = 18 + Math.random() * 32;
        const pColor = i % 2 === 0 ? color1 : color2;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0.1,
            }}
            transition={{ duration: 0.5 + Math.random() * 0.3, ease: "easeOut" }}
            className="collision-particle"
            style={{
              background: pColor,
              boxShadow: `0 0 6px ${pColor}`,
            }}
          />
        );
      })}
    </div>
  );
};
