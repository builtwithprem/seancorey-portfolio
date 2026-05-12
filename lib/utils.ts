import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

export function rgb(c: readonly [number, number, number]) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
