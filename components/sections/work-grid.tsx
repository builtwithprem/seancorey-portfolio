"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { projects } from "@/lib/projects";

function scrollToWork() {
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
}

export function WorkGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
        {/* Header — no external links, one-page site */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-16"
        >
          Selected Work
        </motion.h2>

        {/*
          2-column grid.
          Revert to 3: change "md:grid-cols-2" → "md:grid-cols-2 lg:grid-cols-3"
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20">
          {projects.map((project, idx) => (
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
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ background: project.gradient }}
                    />
                  )}
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs text-white/40 font-sans">{project.year}</span>
                  </div>
                </motion.div>

                {/* Title only in layoutId — no category label */}
                <motion.div layoutId={`card-meta-${project.id}`}>
                  <h3 className="font-display font-semibold text-[2.2rem] leading-tight text-white group-hover:text-teal transition-colors duration-300">
                    {project.title}
                  </h3>
                </motion.div>

                <p className="text-[1rem] text-white/50 leading-relaxed font-sans mt-3">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Expanded card overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId && selected && (
          <>
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
              Wider modal with side-by-side layout on desktop.
              Image takes ~60% width → more room for high-res screenshots.
              Mobile: stacked (image top, details below).
            */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full overflow-hidden rounded-2xl flex flex-col lg:flex-row pointer-events-auto"
                style={{
                  maxWidth: "1280px",
                  maxHeight: "92vh",
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

                {/* Image — full width on mobile, 60% on desktop */}
                <motion.div
                  layoutId={`card-image-${selectedId}`}
                  className="relative w-full aspect-[16/9] flex-shrink-0 lg:aspect-auto lg:w-[60%] lg:self-stretch"
                >
                  {selected.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: selected.gradient }} />
                  )}
                </motion.div>

                {/* Details — below on mobile, right panel on desktop */}
                <div className="overflow-y-auto flex-1 p-8 lg:p-10 flex flex-col justify-center">
                  <motion.div layoutId={`card-meta-${selectedId}`} className="mb-5">
                    <h2 className="font-display font-bold text-[clamp(1.5rem,2.5vw,2.25rem)] text-white leading-tight">
                      {selected.title}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-5 mb-5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-teal font-sans">
                        {selected.category}
                      </span>
                      <span className="text-white/30 text-xs font-sans">{selected.year}</span>
                    </div>

                    <p className="text-white/60 leading-relaxed font-sans text-sm mb-8">
                      {selected.description}
                    </p>

                    <div className="border-t border-white/10 pt-6">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/25 font-sans mb-3">
                        Case Study
                      </p>
                      <p className="text-white/30 font-sans text-sm leading-relaxed">
                        Full case study coming soon. Get in touch to hear about this project.
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
