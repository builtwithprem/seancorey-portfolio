"use client";

import { motion } from "motion/react";

const eras = [
  {
    label: "Origin",
    body: [
      "I've spent 20 years building on the internet. In my twenties and thirties, I founded TrueThemes, a WordPress theme business that reached seven figures and became the #1 seller on ThemeForest before I sold it in 2017.",
    ],
  },
  {
    label: "Shift",
    body: [
      "Then life changed. I spent five years as the full-time web designer at the Himalayan Institute, one of North America's most respected yoga and meditation centers. That period reshaped how I see technology and work.",
    ],
  },
  {
    label: "Today",
    body: [
      "Today I combine both sides: technical expertise and contemplative practice. I work with mission-driven brands who want thoughtful digital presence enhanced by AI, not dominated by it.",
      "I take on select projects each year. I teach yoga and meditation on Insight Timer and currently live in Hoi An, Vietnam, working with clients worldwide.",
    ],
  },
];

export function About() {
  return (
    <section
      id="about"
      data-section-theme="light"
      className="bg-sage py-16 sm:py-24 lg:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-forest leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] mb-12 sm:mb-20 lg:mb-28 max-w-4xl"
        >
          A little about me.
        </motion.h2>

        {/* Two-column body — photo left, eras right */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

          {/* Left — photo + stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/headshot.jpg"
                alt="Sean Corey"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>

          </motion.div>

          {/* Right — eras */}
          <div className="space-y-8 sm:space-y-12">
            {eras.map((era, idx) => (
              <motion.div
                key={era.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[0.875rem] uppercase tracking-[0.18em] text-forest font-semibold font-sans mb-4">
                  {era.label}
                </p>
                {era.body.map((para, i) => (
                  <p
                    key={i}
                    className={`font-sans text-[1rem] sm:text-[1.15rem] text-forest/75 leading-relaxed ${i > 0 ? "mt-4" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
