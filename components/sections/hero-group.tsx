"use client";

import { useMotionValue, useMotionValueEvent, motion, useScroll } from "motion/react";
import { Hero } from "./hero";

export function HeroGroup() {
  const opacity = useMotionValue(1);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    /*
      Direct mapping: opacity = 1 - scrollY / vh
      When scrollY = 0          → opacity = 1   (full hero)
      When scrollY = vh (100vh) → opacity = 0   (hero fully scrolled away)
      Mathematically exact, screen-size independent.
    */
    const vh = window.innerHeight;
    // Match FADE_THRESHOLD in navbar.tsx (0.6) — both complete at the same scroll point
    opacity.set(Math.max(0, 1 - y / (vh * 0.6)));
  });

  return (
    <motion.div style={{ opacity }}>
      <Hero />

      {/*
        Transition div — from sannewijbenga.com technique.
        height: 75vh with negative margins creates a soft overlap zone:
          margin-top: -8em  pulls div up into hero's bottom
          margin-bottom: -11em pulls WorkGrid up into this div's bottom
        Same bg colour as hero → reads as one continuous fading surface.

        data-section-theme="dark" fires the navbar switch.
        This div starts at (100vh - 8em) from page top.
        Nav switches when scrollY + 72 >= that position → scrollY ≈ 93vh.
        At that point, opacity = 1 - 0.93 = 7% — essentially transparent.
        Nav and visual both go dark at the same effective moment.
      */}
      <div
        data-section-theme="dark"
        style={{
          height: "75vh",
          marginTop: "-8em",
          marginBottom: "-11em",
          backgroundColor: "#D5E3DE",
          display: "block",
        }}
      />
    </motion.div>
  );
}
