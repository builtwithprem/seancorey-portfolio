"use client";

import { motion } from "motion/react";

const principles = [
  {
    number: "1",
    title: "Clear Communication",
    description:
      "I explain my thinking. You understand the why behind every decision. No surprises, no jargon. Good work starts with honest conversation, and I keep that going throughout every project.",
  },
  {
    number: "2",
    title: "Realistic Timelines",
    description:
      "I give honest estimates. I deliver on time. Quality doesn't have to mean slow — it means planning well, staying focused, and flagging issues before they become problems.",
  },
  {
    number: "3",
    title: "Thoughtful Collaboration",
    description:
      "Your input matters. I listen, ask questions, and iterate together until it feels right. The best results come from a process that respects your knowledge of your own work.",
  },
];

export function Services() {
  return (
    <section
      id="values"
      data-section-theme="dark"
      className="bg-[#253631] py-24 lg:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky while right column scrolls */}
          <div className="lg:sticky lg:top-[88px]">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-sans block mb-5"
            >
              How I work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[clamp(1.75rem,3.5vw,3rem)] text-white leading-tight mb-8"
            >
              Every Project Backed by Values
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base text-white/60 leading-relaxed font-sans"
            >
              I&apos;ve built my process around three things that matter most to clients:
              clear communication, realistic timelines, and thoughtful collaboration.
              Not just deliverables — the experience of working together.
            </motion.p>
          </div>

          {/* Right — scrolls past the sticky left column */}
          <div className="space-y-12">
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
                className="flex gap-6"
              >
                {/* Teal numbered badge */}
                <div className="w-9 h-9 rounded-full bg-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-semibold text-sm text-teal">
                    {p.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-base text-white/60 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
