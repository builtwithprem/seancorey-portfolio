"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, useMotionValueEvent, motion, useScroll } from "motion/react";

const FOREST = [37,  54,  49] as const; // #253631
const SAGE   = [213, 227, 222] as const; // #D5E3DE

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

// ─── Dark → Light ─────────────────────────────────────────────────────────────
/*
  Mirrors Sanne's technique for going dark→light.
  All surfaces (body, work section, transition div, values section) animate
  their bg color from #253631 → #D5E3DE at the same t.
  Fade COMPLETES when WorkGrid's bottom exits the viewport top.
*/
export function DarkTransitionGroup() {
  const ref   = useRef<HTMLDivElement>(null);
  const divBg = useMotionValue("#253631");
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

// ─── Light → Dark ─────────────────────────────────────────────────────────────
/*
  Mirrors the Hero approach for going light→dark.
  The page body is always #253631 underneath everything. DarkTransitionGroup
  temporarily paints it light. Here we:
    1. Animate body bg back to #253631 (restoring the dark body)
    2. Animate About section bg back to #253631
    3. Fade About content to opacity 0
    4. Animate transition div bg from light → dark
  Fade COMPLETES when About's bottom exits the viewport top.
*/
export function LightTransitionGroup() {
  const ref   = useRef<HTMLDivElement>(null);
  const divBg = useMotionValue("#D5E3DE"); // starts light, ends dark
  const { scrollY } = useScroll();

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
      const aboutEl = document.getElementById("about") as HTMLElement | null;
      if (aboutEl) {
        aboutEl.style.backgroundColor = "";
        const contentEl = aboutEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = "";
      }
      const contactEl = document.getElementById("contact") as HTMLElement | null;
      if (contactEl) contactEl.style.backgroundColor = "";
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

    // SAGE → FOREST (light → dark) — same direction as the hero
    const color = `rgb(${lerp(SAGE[0], FOREST[0], t)},${lerp(SAGE[1], FOREST[1], t)},${lerp(SAGE[2], FOREST[2], t)})`;

    divBg.set(color);

    /*
      Guard: only update global body bg and About section when t > 0.
      At y=0 (hero), t=0 for this group. Without the guard, LightTransitionGroup
      fires AFTER DarkTransitionGroup (later in the component tree) and overwrites
      the correct dark body (#253631) with light (#D5E3DE), breaking the hero fade.
    */
    if (t > 0) {
      document.body.style.backgroundColor = color;

      const aboutEl = document.getElementById("about") as HTMLElement | null;
      if (aboutEl) {
        aboutEl.style.backgroundColor = color;
        const contentEl = aboutEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = String(1 - t);
      }

      const contactEl = document.getElementById("contact") as HTMLElement | null;
      if (contactEl) contactEl.style.backgroundColor = color;
    } else {
      // t === 0: user is above/before this zone — clear all inline styles so
      // the CSS class values take over cleanly (prevents stale intermediate
      // colours left behind by a previous scroll-through)
      const aboutEl = document.getElementById("about") as HTMLElement | null;
      if (aboutEl) {
        aboutEl.style.backgroundColor = "";
        const contentEl = aboutEl.querySelector<HTMLElement>(":scope > div");
        if (contentEl) contentEl.style.opacity = "";
      }
      const contactEl = document.getElementById("contact") as HTMLElement | null;
      if (contactEl) contactEl.style.backgroundColor = "";
    }
  });

  return (
    <div ref={ref} id="about-transition">
      <motion.div
        data-section-theme="light"
        style={{
          backgroundColor: divBg,
          height: "42vh",
          display: "block",
        }}
      />
    </div>
  );
}
