"use client";

import {useEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
    y?: number;         // how far below to start (px)
    opacity?: number;   // starting opacity
    duration?: number;  // seconds
    delay?: number;     // seconds
    stagger?: number;   // if targeting multiple children
}

export function useScrollAnimation<T extends HTMLElement>(
    options: ScrollAnimationOptions = {}
) {
    const ref = useRef<T>(null);
    const {y = 40, opacity = 0, duration = 0.8, delay = 0, stagger = 0.1} = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If stagger > 0, animate direct children individually
        const targets = stagger ? el.children : el;

        const tween = gsap.from(targets, {
            y,
            opacity,
            duration,
            delay,
            stagger: stagger || undefined,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",   // animation starts when top of element hits 85% down the viewport
                toggleActions: "play none none none", // play once on enter
            },
        });

        // Cleanup on unmount — kill the animation and its ScrollTrigger
        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [y, opacity, duration, delay, stagger]);

    return ref;
}