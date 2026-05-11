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
      data-section-theme="dark"
      className="bg-[#253631] pt-40 pb-24 lg:pt-56 lg:pb-36"
    >
      {/*
        Single fade-in wraps the entire section content.
        Everything comes to full opacity together as the section enters view.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky while right column scrolls */}
          <div className="lg:sticky lg:top-[88px]">
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-8">
              My Values
            </h2>

            <p className="text-[1.3rem] text-white/60 leading-relaxed font-sans">
              I&apos;ve built my process around four things that matter most to clients:
              clear communication, realistic timelines, thoughtful collaboration, and human + AI partnership.
              Not just deliverables — the experience of working together.
            </p>
          </div>

          {/* Right — scrolls past the sticky left column */}
          <div className="space-y-12">
            {principles.map((p) => (
              <div key={p.number} className="flex gap-6">
                {/* Teal numbered badge */}
                <div className="w-12 h-12 rounded-full bg-[#D5E3DE] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display font-bold text-base text-[#253631]">
                    {p.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-[1.65rem] leading-tight text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[1.1rem] text-white/60 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
