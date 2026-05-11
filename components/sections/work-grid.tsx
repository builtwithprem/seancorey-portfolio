"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { WorkCursor } from "@/components/ui/work-cursor";
import { projects } from "@/lib/projects";

export function WorkGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgIdx, setImgIdx]         = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const images   = selected?.images ?? [];
  const hasMultiple = images.length > 1;

  // Reset image index when project changes
  useEffect(() => { setImgIdx(0); }, [selectedId]);

  // Keyboard: Escape closes, ← → navigates images
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

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    if (selectedId) setIsHovering(false); // hide cursor when modal opens
    return () => { document.body.style.overflow = ""; };
  }, [selectedId]);

  const thumbnail = (p: typeof projects[0]) => p.images?.[0] ?? null;

  return (
    <section
      id="work"
      data-section-theme="dark"
      className="bg-[#253631] py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-5"
        >
          Work I&apos;ve done
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[1.3rem] text-white/60 leading-relaxed font-sans max-w-xl mb-16"
        >
          A selection of projects spanning e-commerce, education, wellness, and mission-driven brands.
        </motion.p>

        {/* 2-col grid — change md:grid-cols-2 → lg:grid-cols-3 to revert to 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                layoutId={`card-${project.id}`}
                onClick={() => setSelectedId(project.id)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group cursor-none"
                style={{
                  opacity: selectedId === project.id ? 0 : 1,
                  pointerEvents: selectedId === project.id ? "none" : "auto",
                  transition: "opacity 0.15s ease",
                }}
              >
                {/* Thumbnail */}
                <motion.div
                  layoutId={`card-image-${project.id}`}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5"
                >
                  {thumbnail(project) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnail(project)!}
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

                {/* Title */}
                <motion.div layoutId={`card-meta-${project.id}`}>
                  <h3 className="font-display font-semibold text-[2.2rem] leading-tight text-white group-hover:text-teal transition-colors duration-300">
                    {project.title}
                  </h3>
                </motion.div>

                <p className="text-[1.15rem] text-white/50 leading-relaxed font-sans mt-3">
                  {project.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom cursor — shown on card hover, hidden while modal is open */}
      <WorkCursor isHovering={isHovering && !selectedId} />

      {/* ─── Expanded modal ──────────────────────────────────────────────── */}
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
              className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            <div className="fixed inset-0 z-[61] flex items-center justify-center p-3 md:p-6 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full overflow-hidden rounded-2xl flex flex-col lg:flex-row pointer-events-auto"
                style={{ maxWidth: "1320px", height: "90vh", backgroundColor: "#111c18" }}
              >
                {/* Close — white on both dark image and light details */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white text-[#253631] hover:bg-white/90 flex items-center justify-center shadow-sm transition-colors duration-200"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>

                {/* ── Image panel — unified carousel on all screen sizes ── */}
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

                        {/* Prev — always visible on mobile, hover on desktop */}
                        {imgIdx > 0 && (
                          <button
                            onClick={() => setImgIdx(i => i - 1)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white transition-opacity duration-200 hover:bg-black/55 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={18} />
                          </button>
                        )}

                        {/* Next */}
                        {imgIdx < images.length - 1 && (
                          <button
                            onClick={() => setImgIdx(i => i + 1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center text-white transition-opacity duration-200 hover:bg-black/55 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}

                        {/* Counter */}
                        {hasMultiple && (
                          <div className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-white/75 text-xs font-sans">
                              {imgIdx + 1} / {images.length}
                            </span>
                          </div>
                        )}

                        {/* Dot / pill indicators */}
                        {hasMultiple && (
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setImgIdx(i)}
                                aria-label={`Image ${i + 1}`}
                                className={`rounded-full transition-all duration-250 ${
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

                {/* ── Details panel — light theme matching hero bg ─────── */}
                <div
                  className="overflow-y-auto flex-1 p-7 lg:p-10 flex flex-col justify-start lg:justify-center"
                  style={{ backgroundColor: "#D5E3DE" }}
                >
                  {/* Title — shared layout animation */}
                  <motion.div layoutId={`card-meta-${selectedId}`} className="mb-5">
                    <h2 className="font-display font-bold text-[clamp(1.5rem,2.5vw,2.25rem)] text-[#253631] leading-tight">
                      {selected.title}
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-5 mb-5">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-teal font-sans">
                        {selected.category}
                      </span>
                      <span className="text-[#253631]/40 text-xs font-sans">{selected.year}</span>
                    </div>

                    <p className="text-[#253631]/70 leading-relaxed font-sans text-sm mb-8">
                      {selected.description}
                    </p>

                    {/* CTA — only shown when the project has a url */}
                    {selected.url && (
                      <div className="mb-8">
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#253631] hover:bg-[#253631]/85 text-white rounded-full px-7 h-11 text-sm font-sans transition-colors duration-300"
                        >
                          Visit website <ArrowUpRight size={15} />
                        </a>
                      </div>
                    )}

                    <div className="border-t border-[#253631]/15 pt-6">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#253631]/40 font-sans mb-3">
                        Case Study
                      </p>
                      <p className="text-[#253631]/55 font-sans text-sm leading-relaxed">
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
