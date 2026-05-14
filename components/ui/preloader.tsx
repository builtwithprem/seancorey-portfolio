"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const MIN_MS = 2200;
    const start  = Date.now();

    const hide = () => {
      const elapsed   = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--color-forest)" }}
        >
          {/* Sonar pulse — two rings expand outward from a centre dot */}
          <div className="relative flex items-center justify-center w-28 h-28 mb-10">
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid color-mix(in srgb, var(--color-sage) 30%, transparent)" }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid color-mix(in srgb, var(--color-sage) 20%, transparent)" }}
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, delay: 0.6, ease: "easeOut" }}
            />
            {/* Centre dot */}
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-sage) 70%, transparent)" }}
            />
          </div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold text-[0.8rem] uppercase tracking-[0.35em]"
            style={{ color: "color-mix(in srgb, var(--color-sage) 75%, transparent)" }}
          >
            Sean Corey
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
