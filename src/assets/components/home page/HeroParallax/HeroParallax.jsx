import React from "react";
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
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);

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

  return (
    <div ref={ref} className="hp-root">
      <ParallaxHeader />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="hp-rows-wrapper"
      >
        {/* Row 1 — right to left */}
        <motion.div className="hp-row hp-row--reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Row 2 — left to right */}
        <motion.div className="hp-row">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>

        {/* Row 3 — right to left */}
        <motion.div className="hp-row hp-row--reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
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
const ProductCard = ({ product, translate }) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -20 }}
    className="hp-card"
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
    {/* Hover overlay */}
    <div className="hp-card-overlay" />
    <h3 className="hp-card-title">{product.title}</h3>
  </motion.div>
);
