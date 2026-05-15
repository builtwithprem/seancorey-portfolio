"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const ROW_ONE = ["Sean Corey", "Web Designer", "AI Architect", "Visual Designer"];
const ROW_TWO = ["Yoga Teacher", "Meditator", "Creative Strategist"];

const eras = [
  {
    label: "Origin",
    body: [
      "I've spent 20 years building on the internet. In my twenties and thirties, I founded TrueThemes, a WordPress theme business that became the #1 seller on ThemeForest before I sold it in 2017.",
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

const REPEATS = 8;

function TrackContent({ items }: { items: string[] }) {
  return (
    <>
      {Array.from({ length: REPEATS }, (_, r) =>
        items.map((item, i) => (
          <span key={`${r}-${i}`} className="font-display font-bold text-[clamp(2.5rem,6vw,5rem)] text-forest">
            {item}
            <span style={{ color: "color-mix(in srgb, var(--color-forest) 40%, transparent)", fontSize: "0.6em", verticalAlign: "middle", padding: "0 0.3em" }}> ✺ </span>
          </span>
        ))
      )}
    </>
  );
}

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  speed?: number;
}

function MarqueeRow({ items, direction, speed = 24 }: MarqueeRowProps) {
  const [duration, setDuration] = useState(speed);

  useEffect(() => {
    const update = () => setDuration(window.innerWidth < 640 ? speed * 0.55 : speed);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [speed]);

  return (
    <div className="relative overflow-hidden w-full select-none py-3">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee-${direction} ${duration}s linear infinite` }}
      >
        <span><TrackContent items={items} /></span>
        <span aria-hidden><TrackContent items={items} /></span>
      </div>

      {/* Gradient edges — fade into the sage background */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--color-sage), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--color-sage), transparent)" }}
      />
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      data-section-theme="light"
      className="bg-sage overflow-hidden"
    >
      {/* ── Marquee banners ── */}
      <div className="pt-16 sm:pt-24 pb-20 sm:pb-[6.25rem] space-y-1">
        <MarqueeRow items={ROW_ONE} direction="left" />
        <MarqueeRow items={ROW_TWO} direction="right" />
      </div>

      {/* ── Two-column body ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/headshot.jpg"
                alt="Sean Corey"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Right — eras */}
          <div className="space-y-10 sm:space-y-12">
            {eras.map((era, idx) => (
              <motion.div
                key={era.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display font-semibold text-[1.25rem] sm:text-[1.65rem] leading-tight text-forest mb-4">
                  {era.label}
                </h3>
                {era.body.map((para, i) => (
                  <p
                    key={i}
                    className={`text-[1rem] sm:text-[1.2rem] text-forest/65 leading-relaxed font-sans ${i > 0 ? "mt-4" : ""}`}
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
