"use client";

import { motion } from "motion/react";

// Row 1 scrolls left — identity / professional
const ROW_ONE = ["Sean Corey", "Web Designer", "AI Architect", "Visual Designer"];
// Row 2 scrolls right — personal / practice
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

// Repeat items enough times that the track is always wider than the viewport
function buildTrack(items: string[], repeats = 6) {
  return Array.from({ length: repeats }, () => items.join(" · ") + " · ").join("");
}

interface MarqueeRowProps {
  items: string[];
  direction: "left" | "right";
  speed?: number;
}

function MarqueeRow({ items, direction, speed = 38 }: MarqueeRowProps) {
  const track = buildTrack(items);
  return (
    <div className="overflow-hidden w-full select-none py-1">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {/* Two identical halves — animation moves exactly -50% for seamless loop */}
        <span className="font-display font-bold text-[clamp(2.5rem,6.25vw,5rem)] text-forest">
          {track}
        </span>
        <span className="font-display font-bold text-[clamp(2.5rem,6.25vw,5rem)] text-forest" aria-hidden>
          {track}
        </span>
      </div>
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
      <div className="pt-16 sm:pt-24 pb-12 sm:pb-16 space-y-1 -rotate-2 scale-110">
        <MarqueeRow items={ROW_ONE} direction="left" />
        <MarqueeRow items={ROW_TWO} direction="right" />
      </div>

      {/* ── Centered content ── */}
      <div className="max-w-[650px] mx-auto px-6 pb-20 sm:pb-28">

        {/* Headshot circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-16"
        >
          <div
            className="w-[180px] h-[180px] rounded-full overflow-hidden flex-shrink-0"
            style={{ border: "2px solid color-mix(in srgb, var(--color-forest) 15%, transparent)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/headshot.jpg"
              alt="Sean Corey"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Era blocks */}
        <div className="space-y-10 sm:space-y-14">
          {eras.map((era, idx) => (
            <motion.div
              key={era.label}
              initial={{ opacity: 0, y: 24 }}
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
    </section>
  );
}
