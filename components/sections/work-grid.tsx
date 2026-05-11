"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function WorkGrid() {
  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-zinc-950 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight"
          >
            Selected Work
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="hidden md:flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-300"
            >
              View all projects <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.65,
                delay: idx * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link href={`/work/${project.id}`} className="group block">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ background: project.gradient }}
                  />
                  <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/10 transition-colors duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs text-white/40 font-sans">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-teal font-sans">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-white group-hover:text-teal transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex items-center justify-between"
        >
          <span className="text-sm text-zinc-700 font-sans">
            Showing {projects.length} of {projects.length}
          </span>
          <Link
            href="/work"
            className="flex md:hidden items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-300"
          >
            View all <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-300"
          >
            Let&apos;s work together <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
