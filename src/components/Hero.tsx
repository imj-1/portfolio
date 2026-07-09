"use client";

import dynamic from "next/dynamic";
import {useEffect, useState} from "react";

// Dynamic import with SSR disabled — Three.js can't render on the server
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-bg-primary"/> // blank placeholder while loading
  ),
});

export default function Hero() {
  const [indicatorOpacity, setIndicatorOpacity] = useState(1);

  useEffect(() => {
    const fadeDistance = 300; // px of scroll over which the indicator fully fades

    const handleScroll = () => {
      const opacity = Math.max(0, 1 - window.scrollY / fadeDistance);
      setIndicatorOpacity(opacity);
    };

    handleScroll(); // sync on mount in case the page loads already scrolled
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,109,240,0.1), transparent),
            radial-gradient(ellipse 40% 30% at 70% 60%, rgba(80,200,180,0.05), transparent)
          `,
        }}
      />

      {/* Three.js scene (behind text) */}
      <HeroScene/>

      {/* Text overlay */}
      <div className="relative z-10 max-w-2xl px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">
          Isidro Molina
        </h1>
        <p className="text-2xl md:text-3xl font-medium tracking-tight mb-6">
          <span className="gradient-text">Software Engineer</span>
        </p>
        <p className="text-base text-text-secondary leading-relaxed max-w-md mx-auto mb-8">
          Dedicated to building fast, accessible, and modern web interfaces. I
          bridge the gap between powerful backend logic and beautiful, user-centric design.
          Currently open to new opportunities.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent-purple text-white text-sm font-medium
          rounded-lg hover:bg-[#6a5bd8] transition-colors duration-300"
          >
            View projects
          </a>
          <a
            href="/Isidro_Molina_2026_Resume.pdf"
            className="px-6 py-3 border border-border-subtle text-text-secondary text-sm
        font-medium rounded-lg hover:border-border-hover hover:text-text-primary
        transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        aria-label="Scroll down"
        aria-hidden={indicatorOpacity < 0.05}
        className="absolute bottom-10 md:bottom-30 left-1/2 -translate-x-1/2 z-10
  flex flex-col items-center gap-2 text-text-secondary
  hover:text-text-primary transition-colors"
        style={{
          opacity: indicatorOpacity,
          transition: "opacity 150ms ease-out, color 300ms",
          pointerEvents: indicatorOpacity < 0.05 ? "none" : "auto",
        }}
      >
        <span className="text-sm tracking-wide">Scroll</span>
        <svg
          className="animate-bounce"
          width="30" height="30" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </a>
    </section>
  );
}