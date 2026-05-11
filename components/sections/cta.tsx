"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Cta() {
  return (
    <section
      id="contact"
      data-section-theme="light"
      className="bg-[#F9F7F5] py-28 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[0.22em] text-[#253631]/40 mb-6 font-sans"
        >
          Let&apos;s work together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.75rem,6.5vw,6rem)] text-[#253631] leading-[1.04] tracking-tight mb-12 max-w-3xl mx-auto"
        >
          Ready to make something great?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="mailto:sean@seancorey.net"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#253631] hover:bg-[#253631]/85 text-white rounded-full px-10 gap-2 text-base shadow-none transition-colors duration-300"
            )}
          >
            Work with me <ArrowRight size={16} />
          </Link>
          <Link
            href="/#work"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-8 text-base border-[#253631]/30 text-[#253631] hover:bg-[#253631]/8 shadow-none transition-colors duration-300"
            )}
          >
            See my work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
