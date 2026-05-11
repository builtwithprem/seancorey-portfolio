"use client";

import { motion } from "motion/react";

export function About() {
  return (
    <section
      id="about"
      data-section-theme="dark"
      className="bg-[#253631] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-8"
        >
          About
        </motion.h2>
        <p className="text-white/30 font-sans text-sm">Content coming soon.</p>
      </div>
    </section>
  );
}
