"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const headlineLines = [
  { text: "I design digital", accent: false },
  { text: "experiences that", accent: false },
  { text: "leave a mark.", accent: true },
];

const stats = [
  { number: "20+", label: "Years designing" },
  { number: "150+", label: "Projects delivered" },
  { number: "60+", label: "Satisfied clients" },
];

export function Hero() {
  return (
    <section
      id="hero"
      data-section-theme="light"
      className="relative min-h-screen bg-stone-50 dark:bg-zinc-900 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle radial teal accent — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 85% 10%, oklch(0.61 0.062 198 / 6%), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-teal" />
          <span className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 font-sans">
            Web Designer &middot; 20 Years of Practice
          </span>
        </motion.div>

        {/* Headline — line-by-line clip reveal */}
        {/* V1 (original, larger): clamp(2.75rem,6.5vw,6.5rem), max-w-5xl */}
        <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-10 max-w-2xl">
          {headlineLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className={`block text-[clamp(2rem,4.2vw,4.2rem)] ${
                  line.accent
                    ? "text-teal"
                    : "text-zinc-900 dark:text-zinc-50"
                }`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.35 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
          className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed font-sans mb-12"
        >
          Senior web designer working with ambitious brands and founders to
          craft clear, considered digital experiences built to last.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/#work"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-teal hover:bg-teal-dark text-white rounded-full px-8 gap-2 transition-colors duration-300 shadow-none"
            )}
          >
            View my work <ArrowRight size={16} />
          </Link>
          <Link
            href="mailto:hello@unitystud.io"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-8 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-none transition-colors duration-300"
            )}
          >
            Get in touch
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display font-bold text-3xl text-zinc-900 dark:text-zinc-50">
                {stat.number}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-8 lg:left-16 flex flex-col items-start gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="origin-top w-px h-10 bg-gradient-to-b from-zinc-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
