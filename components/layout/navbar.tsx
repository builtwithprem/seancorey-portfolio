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
import { getCssColorRgb, COLOR_VARS } from "@/lib/palette";

const NAV_HEIGHT = 72;

// Hero transition: complete at 60% of vh — matches hero-group.tsx threshold
const FADE_THRESHOLD = 0.6;

// Static white stop — unchanged by theme
const WHITE = [255, 255, 255] as const;

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function rgb(c: readonly [number, number, number]) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

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
  // Initial values use SSR-safe fallbacks from getCssColorRgb
  const navBg    = useMotionValue(
    resolvedTheme === "dark"
      ? rgb(getCssColorRgb(COLOR_VARS.forest))
      : rgb(getCssColorRgb(COLOR_VARS.sage))
  );
  const navColor = useMotionValue(
    resolvedTheme === "dark"
      ? rgb(WHITE)
      : rgb(getCssColorRgb(COLOR_VARS.forest))
  );

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
    // Read current palette from CSS variables so any theme switch is
    // immediately reflected in the scroll interpolation (Phase 2 hook-in).
    const FOREST = getCssColorRgb(COLOR_VARS.forest);
    const SAGE   = getCssColorRgb(COLOR_VARS.sage);

    if (y <= vh) {
      const t = Math.min(1, Math.max(0, y / (vh * FADE_THRESHOLD)));
      navBg.set(`rgb(${lerp(SAGE[0], FOREST[0], t)},${lerp(SAGE[1], FOREST[1], t)},${lerp(SAGE[2], FOREST[2], t)})`);
      navColor.set(`rgb(${lerp(FOREST[0], WHITE[0], t)},${lerp(FOREST[1], WHITE[1], t)},${lerp(FOREST[2], WHITE[2], t)})`);
      setNavIsDark(t > 0.5);
      return;
    }

    const transitionEl = document.getElementById("values-transition");
    const valuesEl     = document.getElementById("values");
    if (transitionEl && valuesEl) {
      const groupTop  = transitionEl.getBoundingClientRect().top + y;
      const valuesTop = valuesEl.getBoundingClientRect().top + y;
      const fadeRange = vh * FADE_THRESHOLD;
      const fadeStart = groupTop - fadeRange;
      if (y >= fadeStart && y < valuesTop) {
        const t = Math.min(1, Math.max(0, (y - fadeStart) / fadeRange));
        navBg.set(`rgb(${lerp(FOREST[0], SAGE[0], t)},${lerp(FOREST[1], SAGE[1], t)},${lerp(FOREST[2], SAGE[2], t)})`);
        navColor.set(`rgb(${lerp(WHITE[0], FOREST[0], t)},${lerp(WHITE[1], FOREST[1], t)},${lerp(WHITE[2], FOREST[2], t)})`);
        setNavIsDark(t < 0.5);
        return;
      }
    }

    const aboutTransitionEl = document.getElementById("about-transition");
    const contactEl         = document.getElementById("contact");
    if (aboutTransitionEl && contactEl) {
      const aboutGroupTop  = aboutTransitionEl.getBoundingClientRect().top + y;
      const contactTop     = contactEl.getBoundingClientRect().top + y;
      const aboutFadeStart = aboutGroupTop - vh * FADE_THRESHOLD;
      if (y >= aboutFadeStart && y < contactTop) {
        const t = Math.min(1, Math.max(0, (y - aboutFadeStart) / (vh * FADE_THRESHOLD)));
        navBg.set(`rgb(${lerp(SAGE[0], FOREST[0], t)},${lerp(SAGE[1], FOREST[1], t)},${lerp(SAGE[2], FOREST[2], t)})`);
        navColor.set(`rgb(${lerp(FOREST[0], WHITE[0], t)},${lerp(FOREST[1], WHITE[1], t)},${lerp(FOREST[2], WHITE[2], t)})`);
        setNavIsDark(t > 0.5);
        return;
      }
    }

    // Binary section detection for all other sections below the hero
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
    navBg.set(isDark ? rgb(FOREST) : rgb(SAGE));
    navColor.set(isDark ? rgb(WHITE) : rgb(FOREST));
    setNavIsDark(isDark);
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
                  className="text-base tracking-wide hover:opacity-60 transition-opacity duration-300 cursor-pointer"
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
                className="p-2 rounded-full hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                aria-label="Toggle colour mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            {/*
              Light nav: solid dark button — matches "View my work" in hero.
              Dark nav: outline button — matches "Get in touch" style.
            */}
            <button
              onClick={() => scrollTo("contact")}
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full px-5 text-sm transition-all duration-300 shadow-none cursor-pointer",
                navIsDark
                  ? "border border-white/30 bg-transparent text-white hover:bg-white/10"
                  : "bg-forest hover:bg-forest/85 text-white"
              )}
            >
              Work with me
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && !mobileOpen && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:opacity-60 transition-opacity duration-300 cursor-pointer"
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
