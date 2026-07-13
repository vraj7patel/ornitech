import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import "./HeroParallax.css";

/* ─── Main Component ────────────────────────────────────────── */
export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 16);
  const ref = React.useRef(null);

  // Detect mobile to disable parallax transforms
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0.4, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [-500, 150]),
    springConfig
  );

  // On mobile: no 3D transforms, no horizontal translate
  const wrapperStyle = isMobile
    ? {}
    : { rotateX, rotateZ, translateY, opacity };
  const txForward = isMobile ? 0 : translateX;
  const txReverse = isMobile ? 0 : translateXReverse;

  return (
    <div ref={ref} className="hp-root">
      <ParallaxHeader />
      <motion.div
        style={wrapperStyle}
        className="hp-rows-wrapper"
      >
        {/* Row 1 — right to left */}
        <motion.div className="hp-row hp-row--reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={txForward}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Row 2 — left to right */}
        <motion.div className="hp-row">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={txReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Row 3 — right to left */}
        <motion.div className="hp-row hp-row--reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={txForward}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ─── Header ─────────────────────────────────────────────────── */
const ParallaxHeader = () => (
  <div className="hp-header">
    <h2 className="hp-header-title">
      Our Work &amp; <br /> Solutions
    </h2>
    <p className="hp-header-sub">
      We craft intelligent, beautiful products powered by cutting-edge AI
      and modern technology — built for impact, designed for humans.
    </p>
  </div>
);

/* ─── Product Card ───────────────────────────────────────────── */
const ProductCard = ({ product, translate }) => {
  const cardRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.04) translateY(-8px)`;
    card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0px)`;
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ x: translate }}
      className="hp-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hp-card-link"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="hp-card-img"
        />
      </a>
      <div className="hp-card-shine" />
      <div className="hp-card-overlay" />
      {product.category && (
        <span className="hp-card-tag">{product.category}</span>
      )}
      <div className="hp-card-footer">
        <h3 className="hp-card-title">{product.title}</h3>
        {product.description && (
          <p className="hp-card-desc">{product.description}</p>
        )}
      </div>
    </motion.div>
  );
};
