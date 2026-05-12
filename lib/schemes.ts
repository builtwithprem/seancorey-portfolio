import { animate } from "motion/react";

export type Scheme = {
  readonly id:      string;
  readonly label:   string;
  readonly light:   string; // --color-sage
  readonly dark:    string; // --color-forest
  readonly modalBg: string; // --color-modal-bg
};

export const SCHEMES = [
  { id: "forest", label: "Forest", light: "#D5E3DE", dark: "#253631", modalBg: "#111c18" },
  { id: "ocean",  label: "Ocean",  light: "#CFDEF0", dark: "#182938", modalBg: "#0c1d2b" },
  { id: "dusk",   label: "Moon",   light: "#DCD3EB", dark: "#2E3249", modalBg: "#1a1c2e" },
  { id: "terra",  label: "Terra",  light: "#F3E7D0", dark: "#764E34", modalBg: "#3a2118" },
  { id: "mono",   label: "Mono",   light: "#FFFFFF", dark: "#000000", modalBg: "#111111" },
] as const satisfies readonly Scheme[];

// ── Helpers ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  return [parseInt(h.slice(0,2), 16), parseInt(h.slice(2,4), 16), parseInt(h.slice(4,6), 16)];
}

function lerpHex(from: string, to: string, t: number): string {
  const [r1,g1,b1] = hexToRgb(from);
  const [r2,g2,b2] = hexToRgb(to);
  const hex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
  return `#${hex(r1+(r2-r1)*t)}${hex(g1+(g2-g1)*t)}${hex(b1+(b2-b1)*t)}`;
}

function readVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Tracks any in-flight animation so rapid switches don't stack
let inFlight: ReturnType<typeof animate> | null = null;

/**
 * Smoothly animates the site palette from its current CSS variable values
 * to the target scheme. Dispatches 'palette-tick' on every animation frame
 * so the navbar scroll handler re-reads the new colour values and stays in sync.
 */
export function applyScheme(to: Scheme): void {
  inFlight?.stop();

  const fromSage   = readVar("--color-sage")    || to.light;
  const fromForest = readVar("--color-forest")   || to.dark;
  const fromModal  = readVar("--color-modal-bg") || to.modalBg;

  // Clear scroll-transition inline overrides so CSS vars drive all elements
  document.body.style.backgroundColor = "";
  for (const id of ["work", "values", "about", "contact"] as const) {
    const el = document.getElementById(id);
    if (el) el.style.backgroundColor = "";
  }

  const root = document.documentElement;

  inFlight = animate(0, 1, {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
    onUpdate(t) {
      root.style.setProperty("--color-sage",     lerpHex(fromSage,   to.light,    t));
      root.style.setProperty("--color-forest",   lerpHex(fromForest, to.dark,     t));
      root.style.setProperty("--color-modal-bg", lerpHex(fromModal,  to.modalBg,  t));
      // Tell the navbar to re-read the updated CSS variables this frame
      window.dispatchEvent(new Event("palette-tick"));
    },
    onComplete() { inFlight = null; },
  });
}
