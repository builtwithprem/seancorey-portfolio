"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
      {/* Subtle teal radial — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 90% 5%, oklch(0.61 0.062 198 / 5%), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-24">
        {/*
          Hard left column — this is what creates true left-alignment.
          Everything lives inside this container, not spread across max-w-7xl.
        */}
        <div className="max-w-[660px]">

          {/* Heading */}
          <h1 className="font-display font-bold tracking-tight mb-8">
            {/* "Hi, I'm Sean," — teal accent, same size as heading */}
            <motion.span
              className="block text-[clamp(2.25rem,5vw,4.5rem)] text-teal leading-[1.1] mb-1"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I&apos;m Sean,
            </motion.span>

            {/* Main statement — dark */}
            <motion.span
              className="block text-[clamp(2.25rem,5vw,4.5rem)] text-zinc-900 dark:text-zinc-50 leading-[1.1]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              I build websites for people whose work I actually believe in.
            </motion.span>
          </h1>

          {/* Body copy — two paragraphs, second reads as closing punch */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="space-y-4 mb-10"
          >
            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              As your web designer and creative director, I bring 20 years of
              craft and judgment to every project, combining human insight with
              an AI-powered workflow to deliver something that&apos;s fast,
              thoughtful, and distinctly yours.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-medium">
              Together, we build a web presence worth having.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 mb-20"
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
              href="mailto:sean@seancorey.net"
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
            transition={{ duration: 1, delay: 0.95, ease: "easeOut" }}
            className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-12"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
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
