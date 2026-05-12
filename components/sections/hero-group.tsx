"use client";

import { useMotionValue, useMotionValueEvent, motion, useScroll } from "motion/react";
import { Hero } from "./hero";

export function HeroGroup() {
  const opacity = useMotionValue(1);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const vh = window.innerHeight;
    // Matches FADE_THRESHOLD = 0.6 in navbar.tsx
    opacity.set(Math.max(0, 1 - y / (vh * 0.6)));
  });

  return (
    <motion.div style={{ opacity }}>
      <Hero />

      {/*
        Transition div — sannewijbenga.com technique.
        Negative margins create a soft overlap zone:
          margin-top: -8em  → pulls into hero bottom
          margin-bottom: -11em → pulls WorkGrid up
        Same bg as hero → reads as one continuous fading surface.
        data-section-theme="dark" triggers the navbar dark switch.
      */}
      <div
        data-section-theme="dark"
        className="h-[65vh] sm:h-[75vh]"
        style={{
          marginTop: "-8em",
          marginBottom: "-11em",
          backgroundColor: "var(--color-sage)",
          display: "block",
        }}
      />
    </motion.div>
  );
}
