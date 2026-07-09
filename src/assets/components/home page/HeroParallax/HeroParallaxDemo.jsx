import React from "react";
import { HeroParallax } from "./HeroParallax.jsx";

/* ─── Ornitech Portfolio Products ──────────────────────────────
   Replace thumbnail URLs with your own project screenshots.
   All images below are high-quality placeholders from Aceternity.
────────────────────────────────────────────────────────────────  */
const products = [
  {
    title: "AI Chatbot Platform",
    link: "#chatbot",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Data Analytics Dashboard",
    link: "#analytics",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Smart Automation Suite",
    link: "#automation",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Document Intelligence",
    link: "#docs",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "AI Content Engine",
    link: "#content",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Vision Recognition",
    link: "#vision",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Predictive Analytics",
    link: "#predict",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "NLP Processing Engine",
    link: "#nlp",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Customer Insights AI",
    link: "#insights",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "Enterprise Integration",
    link: "#enterprise",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Workflow Automation",
    link: "#workflow",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Real-Time Monitoring",
    link: "#monitor",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "AI Training Platform",
    link: "#training",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Voice AI Interface",
    link: "#voice",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "Cloud AI Infrastructure",
    link: "#cloud",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
  {
    title: "Neural Network Studio",
    link: "#neural",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
];

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
