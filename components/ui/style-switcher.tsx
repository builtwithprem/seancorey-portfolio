"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun } from "lucide-react";
import { Tooltip } from "@base-ui/react/tooltip";
import { SCHEMES, applyScheme, type Scheme } from "@/lib/schemes";

const STORAGE_KEY = "palette-scheme";

export function StyleSwitcher() {
  const [open, setOpen]         = useState(false);
  const [activeId, setActiveId] = useState<string>(SCHEMES[0].id);
  const containerRef            = useRef<HTMLDivElement>(null);
  const closeTimer              = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Hover open/close — desktop only. Touch devices skip these entirely
  // because browsers fire mouseenter → mouseleave → click in sequence,
  // creating a race between the close timer and the click toggle.
  const handleEnter = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Close on scroll (mobile — after 5px movement)
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 5) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        onClick={() => {
          if (closeTimer.current !== null) clearTimeout(closeTimer.current);
          setOpen(v => !v);
        }}
        className="p-3 rounded-full hover:opacity-70 transition-opacity duration-200 cursor-pointer flex items-center justify-center"
      >
        <Sun className="size-7 md:size-5" />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          // Plain div owns the centering transform; motion.div handles animation only
          <div
            style={{
              position: "absolute",
              top:       "100%",
              left:      "50%",
              transform: "translateX(-50%)",
              marginTop: "8px",
              zIndex:    301,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0,  scale: 1   }}
              exit={{    opacity: 0, y: -6, scale: 0.9 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-2.5 px-2.5 py-3 rounded-full"
              style={{
                background:          "color-mix(in srgb, var(--color-sage) 45%, transparent)",
                backdropFilter:      "blur(24px)",
                WebkitBackdropFilter:"blur(24px)",
                border:              "1px solid color-mix(in srgb, var(--color-forest) 12%, transparent)",
                boxShadow:           "0 8px 32px rgba(0,0,0,0.12)",
              }}
            >
              <Tooltip.Provider delay={0} closeDelay={0}>
              {SCHEMES.map((scheme, i) => {
                const isActive = scheme.id === activeId;
                return (
                  <Tooltip.Root key={scheme.id}>
                    <Tooltip.Trigger
                      render={
                        <motion.button
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1   }}
                          transition={{ duration: 0.15, delay: i * 0.04 }}
                          whileHover={{ scale: 1.12 }}
                          onClick={() => select(scheme)}
                          aria-label={scheme.label}
                          className="relative w-7 h-7 rounded-full cursor-pointer flex-shrink-0"
                          style={{
                            backgroundColor: scheme.light,
                            boxShadow: isActive
                              ? `0 0 0 2px ${scheme.light}, 0 0 0 3.5px ${scheme.dark}`
                              : "0 1px 3px rgba(0,0,0,0.25)",
                          }}
                        >
                          <span
                            className="absolute inset-0 m-auto w-2 h-2 rounded-full pointer-events-none"
                            style={{ backgroundColor: scheme.dark, opacity: isActive ? 1 : 0.4 }}
                          />
                        </motion.button>
                      }
                    />
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="right" sideOffset={10} style={{ zIndex: 9999 }}>
                        <Tooltip.Popup
                          className="tooltip-popup px-2.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--color-forest) 90%, transparent)",
                            color:           "var(--color-sage)",
                            backdropFilter:  "blur(8px)",
                            border:          "1px solid color-mix(in srgb, var(--color-forest) 60%, transparent)",
                          }}
                        >
                          {scheme.label}
                        </Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                );
              })}
              </Tooltip.Provider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
