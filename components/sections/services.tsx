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
  {
    number: "4",
    title: "Human + AI",
    description:
      "I use AI as a creative partner, not a shortcut. It helps me move faster, explore more ideas, and catch things I might miss — while every decision, every detail, every word stays guided by human judgment and craft.",
  },
];

export function Services() {
  return (
    <section
      id="values"
      data-section-theme="light"
      className="bg-forest pt-40 pb-24 lg:pt-56 lg:pb-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky while right column scrolls */}
          <div className="lg:sticky lg:top-[220px]">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-forest leading-tight mb-8"
            >
              My Values
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-[1.3rem] text-forest/65 leading-relaxed font-sans"
            >
              I&apos;ve built my process around four things that matter most to clients:
              clear communication, realistic timelines, thoughtful collaboration, and human + AI partnership.
              Not just deliverables — the experience of working together.
            </motion.p>
          </div>

          {/* Right — scrolls past the sticky left column */}
          <div className="space-y-12 lg:pt-24">
            {principles.map((p, idx) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6"
              >
                <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-bold text-base text-sage">
                    {p.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-[1.65rem] leading-tight text-forest mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[1.1rem] text-forest/65 leading-relaxed font-sans">
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
