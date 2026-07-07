"use client";

import {useEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {y = 40, opacity = 0, duration = 0.8, delay = 0, stagger = 0.1, ease = "power3.out"} = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? gsap.utils.toArray<HTMLElement>(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {autoAlpha: opacity, y},          // start: hidden, offset
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          stagger: stagger || undefined,
          ease,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [y, opacity, duration, delay, stagger, ease]);

  return ref;
}