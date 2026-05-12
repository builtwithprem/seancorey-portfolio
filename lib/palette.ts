export const COLOR_VARS = {
  forest:  "--color-forest",
  sage:    "--color-sage",
  modalBg: "--color-modal-bg",
} as const;

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  return [parseInt(h.slice(0,2), 16), parseInt(h.slice(2,4), 16), parseInt(h.slice(4,6), 16)];
}

/**
 * Reads a hex CSS custom property at runtime and returns an [R, G, B] tuple.
 * SSR returns default-theme fallbacks so the server render is consistent.
 */
export function getCssColorRgb(varName: string): readonly [number, number, number] {
  if (typeof window === "undefined") {
    if (varName === COLOR_VARS.forest) return [37,  54,  49];
    if (varName === COLOR_VARS.sage)   return [213, 227, 222];
    return [0, 0, 0];
  }
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!hex || !hex.startsWith("#")) {
    if (varName === COLOR_VARS.forest) return [37,  54,  49];
    if (varName === COLOR_VARS.sage)   return [213, 227, 222];
    return [0, 0, 0];
  }
  return hexToRgb(hex);
}
