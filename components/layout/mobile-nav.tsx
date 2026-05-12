"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";


// One-page site: section IDs, no external routes
const navLinks = [
  { id: "hero",    label: "Home"    },
  { id: "work",    label: "Work"    },
  { id: "values",  label: "Values"  },
  { id: "about",   label: "About"   },
  { id: "contact", label: "Contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-40 bg-sage flex flex-col"
        >
          <div className="flex flex-col justify-between h-full px-6 pt-28 pb-12">
            <nav>
              <ul className="space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05 + idx * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      onClick={() => { scrollTo(link.id); onClose(); }}
                      className="block font-display font-bold text-[clamp(2.5rem,8vw,4rem)] text-forest hover:opacity-50 transition-opacity duration-300 leading-tight py-2 cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => { scrollTo("contact"); onClose(); }}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-forest hover:bg-forest/85 text-white font-sans text-sm font-medium transition-colors duration-300 self-start cursor-pointer"
              >
                Work with me
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface HamburgerProps {
  open: boolean;
  onClick: () => void;
}

export function Hamburger({ open, onClick }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center md:hidden focus-visible:outline-none",
        open && "text-forest"
      )}
    >
      {/* Both icons stay in the DOM — CSS opacity swap means no render delay */}
      <span className={cn(
        "absolute transition-all duration-200",
        open ? "opacity-100 rotate-0" : "opacity-0 rotate-45 pointer-events-none"
      )}>
        <X size={28} strokeWidth={1.75} />
      </span>
      <span className={cn(
        "absolute transition-all duration-200",
        open ? "opacity-0 -rotate-45 pointer-events-none" : "opacity-100 rotate-0"
      )}>
        <Menu size={28} strokeWidth={1.75} />
      </span>
    </button>
  );
}
