"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark]   = useState(true); // default: body bg is dark

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;

      // Visibility — hysteresis prevents threshold blink
      setVisible(prev => {
        if (y > 400) return true;
        if (y < 300) return false;
        return prev;
      });

      // Colour — check which data-section-theme sits behind the button.
      // Button is fixed bottom-6 right-6; approximate document Y is scrollY + vh - ~50px.
      const buttonDocY = y + window.innerHeight - 50;
      const sections   = document.querySelectorAll<HTMLElement>("[data-section-theme]");
      let dark = true;
      for (const el of sections) {
        const top    = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (buttonDocY >= top && buttonDocY < bottom) {
          dark = el.dataset.sectionTheme === "dark";
          break;
        }
      }
      setIsDark(dark);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
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
          className={[
            "fixed bottom-6 right-6 z-50",
            "w-14 h-14 sm:w-16 sm:h-16",
            "rounded-full flex items-center justify-center cursor-pointer",
            "border-2 bg-transparent transition-colors duration-300",
            isDark
              ? "border-white/70 text-white hover:border-white hover:text-white"
              : "border-forest/70 text-forest hover:border-forest hover:text-forest",
          ].join(" ")}
        >
          <ArrowUp className="size-5 sm:size-6" strokeWidth={1.75} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
