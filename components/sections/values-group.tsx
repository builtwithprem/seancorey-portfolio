"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useMotionValueEvent, motion, useScroll } from "motion/react";

const FOREST = [37,  54,  49] as const; // #253631
const SAGE   = [213, 227, 222] as const; // #D5E3DE

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

/*
  Dark → light transition group.

  All four surfaces animate their BG color together at the same t:
    1. Body bg            #253631 → #D5E3DE
    2. Work section bg    #253631 → #D5E3DE
    3. Transition div bg  #253631 → #D5E3DE  ← color, not opacity
    4. Work content       opacity 1 → 0

  Using bgcolor on the transition div (not opacity) keeps it visually
  in sync — opacity creates a different compositing path that reads as
  "slower" even at the same t.

  Fade COMPLETES when WorkGrid's bottom exits the viewport top (y = groupTop),
  so all 6 projects are fully visible before any change begins.
*/
export function DarkTransitionGroup() {
  const ref    = useRef<HTMLDivElement>(null);
  const divBg  = useMotionValue("#253631");
  const { scrollY } = useScroll();

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
      const workEl = document.getElementById("work") as HTMLElement | null;
      if (workEl) {
        workEl.style.backgroundColor = "";
        const contentEl = workEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = "";
      }
      const valuesEl = document.getElementById("values") as HTMLElement | null;
      if (valuesEl) valuesEl.style.backgroundColor = "";
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const el = ref.current;
    if (!el) return;
    const vh      = window.innerHeight;
    const groupTop = el.getBoundingClientRect().top + y;
    const range   = vh * 0.6;
    const start   = groupTop - range;
    const t = Math.min(1, Math.max(0, (y - start) / range));

    const color = `rgb(${lerp(FOREST[0], SAGE[0], t)},${lerp(FOREST[1], SAGE[1], t)},${lerp(FOREST[2], SAGE[2], t)})`;

    // All five surfaces, same color, same frame
    divBg.set(color);
    document.body.style.backgroundColor = color;

    const workEl = document.getElementById("work") as HTMLElement | null;
    if (workEl) {
      workEl.style.backgroundColor = color;
      const contentEl = workEl.querySelector<HTMLElement>(":scope > div");
      if (contentEl) contentEl.style.opacity = String(1 - t);
    }

    const valuesEl = document.getElementById("values") as HTMLElement | null;
    if (valuesEl) valuesEl.style.backgroundColor = color;
  });

  return (
    <div ref={ref} id="values-transition">
      <motion.div
        data-section-theme="dark"
        style={{
          backgroundColor: divBg,
          height: "42vh",
          marginTop: "-8em",
          display: "block",
        }}
      />
    </div>
  );
}
