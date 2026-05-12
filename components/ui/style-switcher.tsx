"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun } from "lucide-react";
import { SCHEMES, applyScheme, type Scheme } from "@/lib/schemes";

const STORAGE_KEY = "palette-scheme";

export function StyleSwitcher() {
  const [open, setOpen]         = useState(false);
  const [activeId, setActiveId] = useState(SCHEMES[0].id);
  const containerRef            = useRef<HTMLDivElement>(null);
  const closeTimer              = useRef<ReturnType<typeof setTimeout>>();

  // Restore saved scheme on mount (instant, no animation)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const scheme = SCHEMES.find(s => s.id === saved);
    if (scheme && scheme.id !== SCHEMES[0].id) {
      applyScheme(scheme);
      setActiveId(scheme.id);
    }
  }, []);

  // Hover handlers — small delay on leave prevents flickering through the gap
  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const select = (scheme: Scheme) => {
    if (scheme.id !== activeId) {
      applyScheme(scheme);
      setActiveId(scheme.id);
      localStorage.setItem(STORAGE_KEY, scheme.id);
    }
    setOpen(false);
  };

  const active = SCHEMES.find(s => s.id === activeId) ?? SCHEMES[0];

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger — sun icon */}
      <button
        aria-label="Change colour scheme"
        aria-expanded={open}
        className="p-2 rounded-full hover:opacity-70 transition-opacity duration-200 cursor-pointer flex items-center justify-center"
      >
        <Sun size={18} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{    opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-1 z-[301] flex flex-col items-center gap-2.5 px-2.5 py-3 rounded-2xl"
            style={{
              background:          "rgba(255,255,255,0.12)",
              backdropFilter:      "blur(16px)",
              WebkitBackdropFilter:"blur(16px)",
              border:              "1px solid rgba(255,255,255,0.2)",
              boxShadow:           "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {SCHEMES.map((scheme, i) => {
              const isActive = scheme.id === activeId;
              return (
                <motion.button
                  key={scheme.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1   }}
                  transition={{ duration: 0.15, delay: i * 0.04 }}
                  onClick={() => select(scheme)}
                  aria-label={scheme.label}
                  title={scheme.label}
                  className="relative w-7 h-7 rounded-full cursor-pointer transition-transform duration-150 hover:scale-110 flex-shrink-0"
                  style={{
                    backgroundColor: scheme.light,
                    boxShadow: isActive
                      ? `0 0 0 2px ${scheme.light}, 0 0 0 3.5px ${scheme.dark}`
                      : "0 1px 3px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Inner pip in the dark colour so each swatch is legible */}
                  <span
                    className="absolute inset-0 m-auto w-2 h-2 rounded-full pointer-events-none"
                    style={{
                      backgroundColor: scheme.dark,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
