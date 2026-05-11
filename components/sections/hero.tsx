"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

function scrollToWork(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  return (
    <section
      id="hero"
      data-section-theme="light"
      className="relative min-h-screen overflow-hidden bg-[#D5E3DE] dark:bg-[#253631]"
    >
      {/* 150px top padding keeps content clear of the 72px fixed navbar */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col pt-[9.375rem]">
        <div className="w-full max-w-[800px] pb-24">

          <h1 className="font-display font-bold tracking-tight mb-8">
            <motion.span
              className="block text-[clamp(2.25rem,5vw,4.5rem)] text-[#253631] dark:text-white leading-[1.1] mb-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Hi, I&apos;m Sean,
            </motion.span>
            <motion.span
              className="block text-[clamp(2.25rem,5vw,4.5rem)] text-[#253631] dark:text-white leading-[1.1]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              I build websites for people whose work I actually believe in.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="text-[1.5rem] text-[#253631] dark:text-white leading-relaxed font-sans">
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
            className="flex flex-wrap items-center gap-4"
          >
            {/* Down arrow + smooth scroll — works reliably on repeat clicks */}
            <a
              href="/#work"
              onClick={scrollToWork}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#253631] hover:bg-[#253631]/85 text-white dark:bg-white dark:text-[#253631] dark:hover:bg-white/90 rounded-full px-8 gap-2 transition-colors duration-300 shadow-none cursor-pointer"
              )}
            >
              View my work <ArrowDown size={16} />
            </a>
            <Link
              href="mailto:sean@seancorey.net"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 border-[#253631]/30 text-[#253631] dark:text-white hover:bg-[#253631]/8 dark:border-white/30 dark:hover:bg-white/10 shadow-none transition-colors duration-300"
              )}
            >
              Get in touch
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
