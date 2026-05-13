"use client";

import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/nav";

export function Hero() {
  return (
    <section
      id="hero"
      data-section-theme="light"
      className="relative min-h-screen overflow-hidden bg-sage"
    >
      {/* 150px top padding keeps content clear of the 72px fixed navbar */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col pt-32 sm:pt-[9.375rem]">
        <div className="w-full max-w-[800px] pb-24">

          <h1 className="font-display font-bold tracking-tight mb-8">
            <motion.span
              className="block text-[clamp(2.25rem,5vw,4.5rem)] text-forest leading-[1.1] mb-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I&apos;m Sean.
            </motion.span>
            <motion.span
              className="block text-[clamp(2.25rem,5vw,4.5rem)] text-forest leading-[1.1]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              I build websites for people doing work that matters.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="text-[1.4rem] sm:text-[1.5rem] text-forest leading-relaxed font-sans">
              I bring 20 years of craft and judgment to every project, combining{" "}
              <strong className="font-semibold">human insight</strong> with an{" "}
              <strong className="font-semibold">AI-powered workflow</strong>{" "}
              to deliver something that&apos;s fast, thoughtful, and distinctly yours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            {/* Down arrow + smooth scroll — works reliably on repeat clicks */}
            <a
              href="/#work"
              onClick={(e) => scrollToSection("work", e)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex-1 sm:flex-none justify-center bg-forest hover:bg-forest/85 text-white rounded-full px-6 sm:px-8 gap-2 transition-colors duration-300 shadow-none cursor-pointer"
              )}
            >
              View my work <ArrowDown size={16} />
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex-1 sm:flex-none justify-center rounded-full px-6 sm:px-8 border-forest/30 text-forest hover:bg-forest/8 shadow-none transition-colors duration-300 cursor-pointer"
              )}
            >
              Get in touch
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
