"use client";

import { motion } from "motion/react";

const principles = [
  {
    number: "1",
    title: "Clear Communication",
    description:
      "I explain my thinking. You understand the why behind every decision. No surprises, no jargon.",
  },
  {
    number: "2",
    title: "Realistic Timelines",
    description:
      "I give honest estimates. I deliver on time. Quality doesn't have to mean slow.",
  },
  {
    number: "3",
    title: "Thoughtful Collaboration",
    description:
      "Your input matters. I listen, ask questions, and iterate together until it feels right.",
  },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      data-section-theme="light"
      className="bg-sage py-24 lg:py-32 border-t border-forest/12" /* V1: bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 */
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(1.75rem,3vw,2.75rem)] text-forest mb-16" /* V1: text-zinc-900 dark:text-zinc-50 */
        >
          How I work
        </motion.h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {principles.map((p, idx) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Numbered badge — teal, matching Services section icons */}
              {/* V1: style={{ backgroundColor: "oklch(0.49 0.13 44 / 10%)" }} (terra) */}
              <div className="w-9 h-9 rounded-full bg-forest/10 flex items-center justify-center mb-5">
                <span className="font-display font-semibold text-sm text-forest">
                  {p.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display font-semibold text-lg text-forest mb-3"> {/* V1: text-zinc-900 dark:text-zinc-50 */}
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-base text-forest leading-relaxed font-sans"> {/* V1: text-zinc-500 dark:text-zinc-400 */}
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
