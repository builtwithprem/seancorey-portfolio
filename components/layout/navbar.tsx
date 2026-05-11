"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useMotionValue, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { Hamburger, MobileNav } from "@/components/layout/mobile-nav";

const NAV_HEIGHT = 72;

// Hero transition: complete at 60% of vh — matches hero-group.tsx threshold
const FADE_THRESHOLD = 0.6;

// RGB colour stops
const SAGE   = [213, 227, 222] as const; // #D5E3DE
const FOREST = [ 37,  54,  49] as const; // #253631
const WHITE  = [255, 255, 255] as const;

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function rgb(c: readonly [number, number, number]) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

// One-page site: scroll to section instead of navigating
const navLinks = [
  { id: "work",     label: "Work"     },
  { id: "services", label: "Services" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navIsDark, setNavIsDark]   = useState(false); // drives "Work with me" button style
  const { scrollY } = useScroll();

  /*
    Two MotionValues drive the nav's background + text colour directly
    on the DOM element — no React re-renders on scroll, 60fps smooth.
  */
  // In dark mode the hero starts as forest green, so the nav starts dark too
  const { resolvedTheme } = useTheme();
  const navBg    = useMotionValue(resolvedTheme === "dark" ? rgb(FOREST) : rgb(SAGE));
  const navColor = useMotionValue(resolvedTheme === "dark" ? rgb(WHITE)  : rgb(FOREST));

  useEffect(() => { setMounted(true); }, []);

  // Force white text + transparent bg when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      navColor.set(rgb(WHITE));
      navBg.set("transparent");
    }
  }, [mobileOpen, navBg, navColor]);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (mobileOpen) return; // locked while overlay is open

    const vh = window.innerHeight;

    if (y <= vh) {
      /*
        Progressive hero transition.
        t = 0 at top, t = 1 when fade is complete (at FADE_THRESHOLD × vh).
        Both bg and text colour reach their final dark/light state at t=1,
        exactly when the hero is fully transparent.
      */
      const t = Math.min(1, Math.max(0, y / (vh * FADE_THRESHOLD)));

      navBg.set(`rgb(${lerp(SAGE[0], FOREST[0], t)},${lerp(SAGE[1], FOREST[1], t)},${lerp(SAGE[2], FOREST[2], t)})`);
      navColor.set(`rgb(${lerp(FOREST[0], WHITE[0], t)},${lerp(FOREST[1], WHITE[1], t)},${lerp(FOREST[2], WHITE[2], t)})`);
      setNavIsDark(t > 0.5);
    } else {
      // Binary section detection for sections below the hero
      const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
      let isDark = true;
      for (const el of sections) {
        const top    = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y + NAV_HEIGHT >= top && y + NAV_HEIGHT < bottom) {
          isDark = el.dataset.sectionTheme === "dark";
          break;
        }
      }
      navBg.set(isDark    ? rgb(FOREST) : rgb(SAGE));
      navColor.set(isDark ? rgb(WHITE)  : rgb(FOREST));
      setNavIsDark(isDark);
    }
  });

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ backgroundColor: mobileOpen ? "transparent" : navBg }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/*
          color on motion.nav cascades to all children via CSS inheritance.
          Tailwind preflight makes <a> tags inherit colour, so nav links
          pick up the interpolated value automatically without explicit classes.
        */}
        <motion.nav
          style={{ color: navColor }}
          className="max-w-7xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between"
        >
          {/* Logo — inherits color from motion.nav */}
          <Logo />

          {/* Desktop links — smooth scroll, inherits color from motion.nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-sm tracking-wide hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:opacity-60 transition-opacity duration-300"
                aria-label="Toggle colour mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            {/*
              Light nav: solid dark button — matches "View my work" in hero.
              Dark nav: outline button — matches "Get in touch" style.
            */}
            <Link
              href="mailto:sean@seancorey.net"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full px-5 text-sm transition-all duration-300 shadow-none",
                navIsDark
                  ? "border border-white/30 bg-transparent text-white hover:bg-white/10"
                  : "bg-[#253631] hover:bg-[#253631]/85 text-white"
              )}
            >
              Work with me
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && !mobileOpen && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:opacity-60 transition-opacity duration-300"
                aria-label="Toggle colour mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <Hamburger
              open={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            />
          </div>
        </motion.nav>
      </motion.header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
