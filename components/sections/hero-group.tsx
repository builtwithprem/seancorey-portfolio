"use client";

import { useMotionValue, useMotionValueEvent, motion, useScroll } from "motion/react";
import { useTheme } from "next-themes";
import { Hero } from "./hero";

export function HeroGroup() {
  const opacity = useMotionValue(1);
  const { scrollY } = useScroll();
  const { resolvedTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (y) => {
    const vh = window.innerHeight;
    // Matches FADE_THRESHOLD = 0.6 in navbar.tsx
    opacity.set(Math.max(0, 1 - y / (vh * 0.6)));
  });

  // In dark mode the hero is already #253631, so the transition div should
  // match to keep the continuous-surface illusion.
  const transitionBg = resolvedTheme === "dark" ? "#253631" : "#D5E3DE";

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
        style={{
          height: "75vh",
          marginTop: "-8em",
          marginBottom: "-11em",
          backgroundColor: transitionBg,
          display: "block",
        }}
      />
    </motion.div>
  );
}
