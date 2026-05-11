"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { projects } from "@/lib/projects";

export function WorkGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while expanded
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedId]);

  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-[#253631] py-24 lg:py-32"
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
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/work"
              className="hidden md:flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors duration-300"
            >
              View all projects <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/*
          2-column grid.
          To revert to 3 columns: change "md:grid-cols-2" → "md:grid-cols-2 lg:grid-cols-3"
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            /*
              Outer motion.div: handles the scroll entrance animation.
              Inner motion.div: carries the layoutId for the expand transition.
              The inner div turns invisible (opacity 0) when selected so only
              the overlay is visible, but the grid slot is preserved.
            */
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.75,
                delay: idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                className="group cursor-pointer"
                style={{
                  opacity: selectedId === project.id ? 0 : 1,
                  pointerEvents: selectedId === project.id ? "none" : "auto",
                  transition: "opacity 0.15s ease",
                }}
              >
                {/* Image */}
                <motion.div
                  layoutId={`card-image-${project.id}`}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ background: project.gradient }}
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs text-white/40 font-sans">{project.year}</span>
                  </div>
                </motion.div>

                {/* Meta — shares layoutId so it animates into the expanded card */}
                <motion.div layoutId={`card-meta-${project.id}`} className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-teal font-sans block">
                    {project.category}
                  </span>
                  <h3 className="font-display font-semibold text-xl text-white group-hover:text-teal transition-colors duration-300">
                    {project.title}
                  </h3>
                </motion.div>

                <p className="text-sm text-white/50 leading-relaxed font-sans mt-2">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 flex items-center justify-between"
        >
          <span className="text-sm text-white/30 font-sans">
            Showing {projects.length} of {projects.length}
          </span>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors duration-300"
          >
            Let&apos;s work together <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* ─── Expanded card overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId && selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm cursor-pointer"
            />

            {/*
              Centering wrapper — not animated, just positions the card.
              The layoutId motion.div inside animates from the grid card's
              bounding box to whatever size/position it occupies here.
            */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 lg:p-14 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full overflow-hidden rounded-2xl flex flex-col pointer-events-auto"
                style={{
                  maxWidth: "860px",
                  maxHeight: "90vh",
                  backgroundColor: "#111c18",
                }}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>

                {/* Image — shared layout with grid card image */}
                <motion.div
                  layoutId={`card-image-${selectedId}`}
                  className="relative w-full flex-shrink-0"
                  style={{ aspectRatio: "16/7" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: selected.gradient }}
                  />
                </motion.div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 p-8 lg:p-10">
                  {/* Meta — shared layout with grid card meta */}
                  <motion.div layoutId={`card-meta-${selectedId}`} className="mb-6">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-teal font-sans block mb-2">
                      {selected.category}
                    </span>
                    <h2 className="font-display font-bold text-[clamp(1.75rem,3vw,2.5rem)] text-white leading-tight">
                      {selected.title}
                    </h2>
                  </motion.div>

                  {/* Extended content — fades in after layout animation settles */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.4 }}
                  >
                    <p className="text-white/65 leading-relaxed font-sans mb-8">
                      {selected.description}
                    </p>

                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-xs text-white/30 font-sans uppercase tracking-[0.12em]">
                        Year
                      </span>
                      <span className="text-sm text-white/60 font-sans">{selected.year}</span>
                    </div>

                    <div className="border-t border-white/10 pt-8">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-sans mb-4">
                        Case Study
                      </p>
                      <p className="text-white/35 font-sans text-sm leading-relaxed">
                        Full case study coming soon. Get in touch to hear about this project in detail.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
