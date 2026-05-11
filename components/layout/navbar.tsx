"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectionDark, setSectionDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const NAV_HEIGHT = 72;

    const update = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
      for (const el of sections) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY + NAV_HEIGHT >= top && scrollY + NAV_HEIGHT < bottom) {
          setSectionDark(el.dataset.sectionTheme === "dark");
          break;
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? sectionDark
            ? "bg-zinc-950/90 backdrop-blur-md border-b border-white/5"
            : "bg-white/90 backdrop-blur-md border-b border-black/5 dark:bg-zinc-900/90 dark:border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-display font-bold text-xl tracking-tight transition-colors duration-500",
            sectionDark
              ? "text-white"
              : "text-zinc-900 dark:text-white"
          )}
        >
          Sean Corey
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-500 hover:opacity-60",
                  sectionDark
                    ? "text-zinc-300"
                    : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "p-2 rounded-full transition-all duration-300 hover:opacity-60",
                sectionDark
                  ? "text-zinc-300"
                  : "text-zinc-600 dark:text-zinc-400"
              )}
              aria-label="Toggle colour mode"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <Link
            href="mailto:hello@unitystud.io"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-teal hover:bg-teal-dark text-white rounded-full px-5 text-sm transition-colors duration-300 shadow-none"
            )}
          >
            Book a call
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
