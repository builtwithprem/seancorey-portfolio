"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Hysteresis: show at 400px, hide below 300px — prevents threshold blink.
      // Functional updater avoids setState when value hasn't changed.
      setVisible(prev => {
        if (window.scrollY > 400) return true;
        if (window.scrollY < 300) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border"
          style={{
            backgroundColor: "var(--color-forest)",
            borderColor:     "color-mix(in srgb, var(--color-sage) 25%, transparent)",
            color:           "var(--color-sage)",
          }}
        >
          <ArrowUp size={22} strokeWidth={1.75} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
