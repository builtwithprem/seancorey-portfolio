"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
          className="fixed inset-0 z-40 bg-zinc-950 flex flex-col"
        >
          {/* Inner content */}
          <div className="flex flex-col justify-between h-full px-6 pt-28 pb-12">
            {/* Links */}
            <nav>
              <ul className="space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05 + idx * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block font-display font-bold text-[clamp(2.5rem,8vw,4rem)] text-white hover:text-teal transition-colors duration-300 leading-tight py-2"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <Link
                href="mailto:hello@unitystud.io"
                onClick={onClose}
                className="text-zinc-400 hover:text-white text-sm font-sans transition-colors duration-200"
              >
                hello@unitystud.io
              </Link>
              <Link
                href="mailto:hello@unitystud.io"
                onClick={onClose}
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-teal hover:bg-teal-dark text-white font-sans text-sm font-medium transition-colors duration-300 self-start"
              >
                Book a call
              </Link>
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
  sectionDark: boolean;
}

export function Hamburger({ open, onClick, sectionDark }: HamburgerProps) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={cn(
        "relative w-8 h-8 flex flex-col items-center justify-center gap-0 md:hidden focus-visible:outline-none",
        open ? "text-white" : sectionDark ? "text-white" : "text-zinc-900 dark:text-white"
      )}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block w-5 h-px bg-current origin-center"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block w-5 h-px bg-current mt-1.5 origin-center"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="block w-5 h-px bg-current mt-1.5 origin-center"
      />
    </button>
  );
}
