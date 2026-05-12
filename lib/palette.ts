/**
 * Palette helpers — single source of truth for runtime color access.
 *
 * CSS custom properties (--color-forest, --color-sage, --color-modal-bg)
 * are defined in app/globals.css and registered as Tailwind utilities.
 * All JS color animation (navbar lerp, scroll transitions) reads from them
 * at runtime so swapping the CSS variables is all that's needed to re-theme
 * the entire site — including the scroll interpolation.
 */

export const COLOR_VARS = {
  forest:  "--color-forest",
  sage:    "--color-sage",
  modalBg: "--color-modal-bg",
} as const;

/**
 * Parses a hex CSS custom property into an [R, G, B] tuple for lerp animation.
 * SSR returns the default-theme fallback so the server render is consistent.
 */
export function getCssColorRgb(
  varName: string
): readonly [number, number, number] {
  if (typeof window === "undefined") {
    // SSR fallbacks — must match the default @theme values in globals.css
    if (varName === COLOR_VARS.forest) return [37,  54,  49];
    if (varName === COLOR_VARS.sage)   return [213, 227, 222];
    return [0, 0, 0];
  }
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

/** Returns the raw hex string for a CSS custom property (e.g. "#253631"). */
export function getCssColorHex(varName: string): string {
  if (typeof window === "undefined") {
    if (varName === COLOR_VARS.forest) return "#253631";
    if (varName === COLOR_VARS.sage)   return "#D5E3DE";
    return "#000000";
  }
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}
