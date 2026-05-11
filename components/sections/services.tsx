"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Palette, Sparkles, Layers, MessageSquare } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design & UX",
    slug: "web-design",
    description:
      "Conversion-focused websites with clear information hierarchy and considered visual design.",
  },
  {
    icon: Sparkles,
    title: "Brand & Identity",
    slug: "brand-identity",
    description:
      "Complete visual identities — logomarks, type systems, and standards built to scale.",
  },
  {
    icon: Layers,
    title: "Design Direction",
    slug: "design-direction",
    description:
      "Strategic creative leadership for teams and agencies who need an experienced eye.",
  },
  {
    icon: MessageSquare,
    title: "Creative Consultation",
    slug: "consultation",
    description:
      "Focused critique and direction sessions for founders and in-house design teams.",
  },
];

const values = [
  "Twenty years of pattern recognition.",
  "Handoff-ready files and clear specs.",
  "Honest timelines, open communication.",
  "Design that solves — not just decorates.",
];

export function Services() {
  return (
    <section
      id="services"
      data-section-theme="light"
      className="bg-stone-50 dark:bg-zinc-900 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Value proposition */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-600 font-sans block mb-5"
            >
              What I do
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-[clamp(1.75rem,3.5vw,3rem)] text-zinc-900 dark:text-zinc-50 leading-tight mb-10"
            >
              Design that works as well as it looks.
            </motion.h2>

            <ul className="space-y-4">
              {values.map((value, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
                  className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400 font-sans"
                >
                  <span className="text-terra font-bold text-lg leading-none mt-0.5 flex-shrink-0">
                    +
                  </span>
                  <span className="text-base leading-snug">{value}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: Services list */}
          <div className="space-y-1">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/services#${service.slug}`}
                    className="group flex items-start gap-5 p-5 rounded-xl hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal/15 transition-colors duration-300">
                      <Icon className="text-teal" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-teal transition-colors duration-300">
                          {service.title}
                        </h3>
                        <ArrowUpRight
                          size={14}
                          className="text-zinc-400 group-hover:text-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 ml-2"
                        />
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
