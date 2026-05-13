"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { WorkCursor } from "@/components/ui/work-cursor";
import { ProjectModal } from "@/components/ui/project-modal";
import { projects } from "@/lib/projects";

// ── Per-card component ────────────────────────────────────────────────────────
function WorkCard({
  project,
  idx,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  project: (typeof projects)[0];
  idx: number;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const thumbnail = project.images?.[0] ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onClick={onSelect}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className="group cursor-none"
      >
        <div className="rounded-xl overflow-hidden mb-6 sm:mb-10">
          {thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={project.title}
              className="w-full h-auto block"
            />
          )}
        </div>

        <div className="text-center mx-auto max-w-[40rem]">
          <p className="font-display font-bold text-white text-[1.2rem] sm:text-[1.5rem] leading-tight mb-1 sm:mb-2">
            {project.title}
          </p>
          <p className="font-sans text-[0.95rem] sm:text-[1.1rem] text-white/55 leading-relaxed mb-4">
            {project.description}
          </p>
          <button
            onClick={onSelect}
            className="inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-[0.15em] text-white/70 underline underline-offset-4 hover:text-white transition-colors duration-200 cursor-pointer font-sans"
          >
            View Project <ArrowUpRight size={13} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main grid ────────────────────────────────────────────────────────────────
export function WorkGrid() {
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [isHovering, setIsHovering]   = useState(false);

  const selected = projects.find(p => p.id === selectedId) ?? null;

  useEffect(() => {
    if (selectedId) setIsHovering(false);
  }, [selectedId]);

  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-forest py-16 sm:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.25rem,5vw,4.5rem)] text-white leading-tight mb-5 text-center"
        >
          My Work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.1rem] sm:text-[1.3rem] text-white/60 leading-relaxed font-sans max-w-xl mb-20 text-center mx-auto"
        >
          A selection of projects spanning e-commerce, education, wellness, and mission-driven brands.
        </motion.p>

        <div className="grid grid-cols-1 gap-y-20 sm:gap-y-24 lg:gap-y-32">
          {projects.map((project, idx) => (
            <WorkCard
              key={project.id}
              project={project}
              idx={idx}
              onSelect={() => setSelectedId(project.id)}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            />
          ))}
        </div>
      </div>

      <WorkCursor isHovering={isHovering && !selectedId} />

      <ProjectModal
        project={selected}
        onClose={() => setSelectedId(null)}
      />
    </section>
  );
}
