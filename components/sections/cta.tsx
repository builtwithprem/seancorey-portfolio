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
      data-section-theme="dark"
      className="bg-[#253631] py-28 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.75rem,6.5vw,6rem)] text-white leading-[1.04] tracking-tight mb-12 max-w-3xl mx-auto"
        >
          Ready to make something great?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="mailto:hello@unitystud.io"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#D5E3DE] hover:bg-[#D5E3DE]/85 text-[#253631] rounded-full px-10 gap-2 text-base shadow-none transition-colors duration-300"
            )}
          >
            Work with me <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-8 text-base border-white/30 text-white hover:bg-white/10 shadow-none transition-colors duration-300 cursor-pointer"
            )}
          >
            See my work
          </button>
        </motion.div>
      </div>
    </section>
  );
}
