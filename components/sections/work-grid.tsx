"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { WorkCursor } from "@/components/ui/work-cursor";
import { projects } from "@/lib/projects";

// ── Per-card component ────────────────────────────────────────────────────────
function WorkCard({
  project,
  idx,
  selectedId,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  project: (typeof projects)[0];
  idx: number;
  selectedId: string | null;
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
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={onSelect}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className="group cursor-none"
        style={{
          opacity: selectedId === project.id ? 0 : 1,
          pointerEvents: selectedId === project.id ? "none" : "auto",
          transition: "opacity 0.15s ease",
        }}
      >
        {/*
          Image expands ~7% beyond its container as it enters view.
          scale() keeps the rounded corners intact and avoids any layout shift —
          the transform happens outside the normal flow.
        */}
        <motion.div
          layoutId={`card-image-${project.id}`}
          className="relative aspect-square sm:aspect-[2/1] rounded-xl overflow-hidden mb-8 sm:mb-12"
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.07 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: project.gradient }} />
          )}
          <div className="absolute bottom-4 right-4">
            <span className="text-xs text-white/70 font-sans">{project.year}</span>
          </div>
        </motion.div>

        <motion.div layoutId={`card-meta-${project.id}`}>
          <p className="font-sans text-[1.1rem] leading-relaxed">
            <span className="font-bold text-white">{project.title}</span>
            <span className="text-white/50 font-normal"> — {project.description}</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Main grid ────────────────────────────────────────────────────────────────
export function WorkGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgIdx, setImgIdx]         = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const selected    = projects.find((p) => p.id === selectedId) ?? null;
  const images      = selected?.images ?? [];
  const hasMultiple = images.length > 1;

  useEffect(() => { setImgIdx(0); }, [selectedId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelectedId(null); return; }
      if (!selectedId || images.length <= 1) return;
      if (e.key === "ArrowLeft")  setImgIdx(i => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setImgIdx(i => Math.min(images.length - 1, i + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, images.length]);

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    if (selectedId) setIsHovering(false);
    return () => { document.body.style.overflow = ""; };
  }, [selectedId]);

  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-forest py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2.4rem,5vw,5rem)] text-white leading-tight mb-5"
        >
          My Work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.3rem] text-white/60 leading-relaxed font-sans max-w-xl mb-20"
        >
          A selection of projects spanning e-commerce, education, wellness, and mission-driven brands.
        </motion.p>

        {/* ── Mobile: horizontal snap carousel ───────────────────────── */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-4 flex gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((project) => {
            const thumb = project.images?.[0] ?? null;
            return (
              <div
                key={project.id}
                className="flex-shrink-0 w-[78vw] snap-start cursor-pointer"
                onClick={() => { setSelectedId(project.id); setIsHovering(false); }}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-5">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: project.gradient }} />
                  )}
                </div>
                <p className="font-sans text-[1rem] leading-snug">
                  <span className="font-bold text-white">{project.title}</span>
                  <span className="text-white/50 font-normal"> — {project.description}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Desktop: vertical stack with shared-layout animation ─────── */}
        <div className="hidden md:grid grid-cols-1 gap-y-24 lg:gap-y-32">
          {projects.map((project, idx) => (
            <WorkCard
              key={project.id}
              project={project}
              idx={idx}
              selectedId={selectedId}
              onSelect={() => setSelectedId(project.id)}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            />
          ))}
        </div>
      </div>

      <WorkCursor isHovering={isHovering && !selectedId} />

      {/* ─── Modal ──────────────────────────────────────────────────────── */}
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
              className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            <div className="fixed inset-0 z-[61] flex items-center justify-center p-3 md:p-6 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full overflow-hidden rounded-2xl flex flex-col lg:flex-row pointer-events-auto"
                style={{ maxWidth: "1320px", height: "85dvh", backgroundColor: "var(--color-modal-bg)" }}
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-forest hover:bg-white/90 flex items-center justify-center shadow-sm transition-colors duration-200 cursor-pointer"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>

                <motion.div
                  layoutId={`card-image-${selectedId}`}
                  className="relative flex-shrink-0 w-full aspect-[16/9] lg:aspect-auto lg:w-[65%] lg:self-stretch"
                >
                  <div className="relative w-full h-full overflow-hidden group">
                    {images.length > 0 ? (
                      <>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${selectedId}-${imgIdx}`}
                            src={images[imgIdx]}
                            alt={`${selected.title} — ${imgIdx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          />
                        </AnimatePresence>

                        {imgIdx > 0 && (
                          <button
                            onClick={() => setImgIdx(i => i - 1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white transition-opacity duration-200 hover:bg-black/55 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={18} />
                          </button>
                        )}

                        {imgIdx < images.length - 1 && (
                          <button
                            onClick={() => setImgIdx(i => i + 1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white transition-opacity duration-200 hover:bg-black/55 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
                            aria-label="Next image"
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}

                        {hasMultiple && (
                          <div className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-white/75 text-xs font-sans">
                              {imgIdx + 1} / {images.length}
                            </span>
                          </div>
                        )}

                        {hasMultiple && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setImgIdx(i)}
                                aria-label={`Image ${i + 1}`}
                                className={`rounded-full transition-all duration-250 cursor-pointer ${
                                  i === imgIdx
                                    ? "w-5 h-1.5 bg-white"
                                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute inset-0" style={{ background: selected.gradient }} />
                    )}
                  </div>
                </motion.div>

                <div
                  className="overflow-y-auto flex-1 p-7 lg:p-10 flex flex-col justify-start lg:justify-center"
                  style={{ backgroundColor: "var(--color-sage)" }}
                >
                  <motion.div layoutId={`card-meta-${selectedId}`} className="mb-5">
                    <h2 className="font-display font-bold text-[clamp(1.65rem,2.5vw,2.5rem)] text-forest leading-tight">
                      {selected.title}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-5 mb-5">
                      <span className="text-xs uppercase tracking-[0.18em] text-forest font-semibold font-sans">
                        {selected.category}
                      </span>
                      <span className="text-forest/65 text-sm font-sans">{selected.year}</span>
                    </div>

                    <p className="text-forest/70 leading-relaxed font-sans text-base mb-8">
                      {selected.description}
                    </p>

                    {selected.url && (
                      <div className="mb-8">
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-forest hover:bg-forest/85 text-white rounded-full px-7 h-11 text-sm font-sans transition-colors duration-300"
                        >
                          Visit website <ArrowUpRight size={15} />
                        </a>
                      </div>
                    )}

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
